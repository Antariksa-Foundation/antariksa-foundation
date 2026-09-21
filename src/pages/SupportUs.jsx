import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const DONATION_CAP = 20000;
const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000];

const SupportUs = () => {
  const [step, setStep] = useState('form'); // form | paying | success | large
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Direct');
  const [orgDetails, setOrgDetails] = useState('');
  const [error, setError] = useState('');

  const numAmount = parseFloat(amount) || 0;
  const isLarge = numAmount >= DONATION_CAP;

  function loadRazorpay() {
    return new Promise(resolve => {
      if (window.Razorpay) { resolve(true); return; }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!firstName || !email || !amount || numAmount <= 0) return;

    // Large donation → show email instructions instead
    if (isLarge) {
      // Still record the lead in DB
      await supabase.from('donations').insert({
        donor_name: `${firstName} ${lastName}`.trim(),
        email: email,
        amount: numAmount,
        donation_type: type.toLowerCase(),
        message: orgDetails || null,
        status: 'pending',
        is_large_donation: true,
      });
      setStep('large');
      return;
    }

    // Small donation → open Razorpay checkout
    setStep('paying');
    const loaded = await loadRazorpay();
    if (!loaded) { setError('Could not load payment gateway. Please try again.'); setStep('form'); return; }

    // Create order via Supabase Edge Function
    const { data: orderData, error: orderError } = await supabase.functions.invoke('create-razorpay-order', {
      body: { amount: Math.round(numAmount * 100), currency: 'INR', receipt: `donation-${Date.now()}` }
    });

    if (orderError || !orderData?.id) {
      // Fallback: open Razorpay without order (works for testing)
      setError('Could not create order. Please try again or contact us.');
      setStep('form');
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: Math.round(numAmount * 100),
      currency: 'INR',
      name: 'Antariksa Foundation',
      description: `${type} Donation`,
      order_id: orderData.id,
      image: '/antariksa_logo_png.png',
      prefill: { name: `${firstName} ${lastName}`.trim(), email },
      theme: { color: '#4F46E5' },
      config: {
        display: {
          hide: type !== 'Direct' ? [{ method: 'upi' }] : []
        }
      },
      modal: { ondismiss: () => setStep('form') },
      handler: async (response) => {
        // Record successful payment
        const insertData = {
          donor_name: `${firstName} ${lastName}`.trim(),
          email: email,
          amount: numAmount,
          donation_type: type.toLowerCase(),
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          status: 'completed',
          is_large_donation: false,
        };
        console.log('Inserting donation:', insertData);
        const { error: insertError } = await supabase.from('donations').insert(insertData);
        if (insertError) console.error('Insert error:', insertError);
        setStep('success');
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', () => { setError('Payment failed. Please try again.'); setStep('form'); });
    rzp.open();
  }

  const inputClass = "w-full bg-gray-50 border-[3px] border-sp-black px-4 py-3 focus:outline-none focus:bg-white rounded-none text-lg font-medium transition-colors";

  if (step === 'success') return (
    <div className="pt-[132px] min-h-screen bg-sp-white pb-24 flex items-center justify-center px-4">
      <div className="bg-white border-[6px] border-sp-black p-10 shadow-[12px_12px_0_0_#4F46E5] text-sp-black space-y-6 flex flex-col items-center text-center max-w-lg w-full">
        <CheckCircle2 className="w-20 h-20 text-green-500 stroke-[2]" />
        <h2 className="text-4xl font-black uppercase tracking-tight">Thank You!</h2>
        <p className="text-lg text-gray-700 font-medium leading-relaxed">
          Your donation of <strong>₹{numAmount.toLocaleString()}</strong> has been received successfully.
        </p>
        <div className="bg-gray-50 border-[2px] border-sp-black p-4 text-xs font-bold text-gray-600 uppercase leading-relaxed w-full text-left">
          A confirmation receipt will be sent to <span className="text-sp-blue">{email}</span>
        </div>
        <button onClick={() => { setStep('form'); setAmount(''); setFirstName(''); setLastName(''); setEmail(''); }}
          className="bg-sp-blue text-white px-6 py-3 font-black uppercase text-sm border-[2px] border-sp-black hover:bg-sp-black transition-colors">
          Make Another Donation
        </button>
      </div>
    </div>
  );

  if (step === 'large') return (
    <div className="pt-[132px] min-h-screen bg-sp-white pb-24 flex items-center justify-center px-4">
      <div className="bg-white border-[6px] border-sp-black p-10 shadow-[12px_12px_0_0_#4F46E5] text-sp-black space-y-6 flex flex-col items-center text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-sp-blue border-[4px] border-sp-black flex items-center justify-center">
          <Mail className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-black uppercase tracking-tight">We'll Be In Touch</h2>
        <p className="text-lg text-gray-700 font-medium leading-relaxed">
          For contributions above <strong>₹{DONATION_CAP.toLocaleString()}</strong>, we handle the process personally to ensure compliance and provide proper documentation.
        </p>
        <div className="bg-sp-blue/5 border-[2px] border-sp-black p-5 w-full text-left space-y-2">
            <p className="text-xs font-black uppercase tracking-widest text-sp-black">Next Steps</p>
            <p className="text-sm font-bold text-gray-700">Send an email to:</p>
            <a href="mailto:antariksafoundation@gmail.com"
              className="text-sp-blue font-black text-lg hover:underline block mb-2">
              antariksafoundation@gmail.com
            </a>
            
            <p className="text-sm font-medium text-gray-600 mt-2">
              Subject: <span className="font-bold">{type} Donation Request – ₹{numAmount.toLocaleString()}</span>
            </p>
            
            <div className="flex flex-wrap gap-2 mt-4 pt-2">
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=antariksafoundation@gmail.com&su=${encodeURIComponent(`${type} Donation Request – ₹${numAmount}`)}&body=${encodeURIComponent(`Hi Antariksa Foundation Team,\n\nI would like to initiate a ${type} donation of ₹${numAmount}.\n\nName: ${firstName} ${lastName}\nOrganization: ${orgDetails || 'N/A'}\nEmail: ${email}\n\nPlease let me know the next steps.`)}`} 
                target="_blank" rel="noreferrer"
                className="bg-[#EA4335] text-white px-4 py-2 font-black text-[10px] uppercase border-[2px] border-sp-black hover:opacity-90 transition-opacity">
                Open in Gmail
              </a>
              <a href={`https://outlook.live.com/mail/0/deeplink/compose?to=antariksafoundation@gmail.com&subject=${encodeURIComponent(`${type} Donation Request – ₹${numAmount}`)}&body=${encodeURIComponent(`Hi Antariksa Foundation Team,\n\nI would like to initiate a ${type} donation of ₹${numAmount}.\n\nName: ${firstName} ${lastName}\nOrganization: ${orgDetails || 'N/A'}\nEmail: ${email}\n\nPlease let me know the next steps.`)}`} 
                target="_blank" rel="noreferrer"
                className="bg-[#0078D4] text-white px-4 py-2 font-black text-[10px] uppercase border-[2px] border-sp-black hover:opacity-90 transition-opacity">
                Open in Outlook
              </a>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`To: antariksafoundation@gmail.com\nSubject: ${type} Donation Request – ₹${numAmount}\n\nHi Antariksa Foundation Team,\n\nI would like to initiate a ${type} donation of ₹${numAmount}.\n\nName: ${firstName} ${lastName}\nOrganization: ${orgDetails || 'N/A'}\nEmail: ${email}\n\nPlease let me know the next steps.`);
                  alert("Email details copied to clipboard!");
                }}
                className="bg-white text-sp-black px-4 py-2 font-black text-[10px] uppercase border-[2px] border-sp-black hover:bg-gray-100 transition-colors">
                Copy Details
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">Our team will respond within 2 business days with formal documentation and payment instructions.</p>
          </div>
        <button onClick={() => setStep('form')}
          className="bg-sp-black text-white px-6 py-3 font-black uppercase text-sm border-[2px] border-sp-black hover:bg-sp-blue transition-colors">
          ← Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="pt-[132px] min-h-screen bg-sp-white selection:bg-sp-blue selection:text-white pb-24">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16">
          <div className="border-[3px] border-sp-black px-4 py-2 w-max mb-6 bg-white">
            <span className="text-sp-black font-black tracking-[0.2em] uppercase text-sm">Partner With Us</span>
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-[7rem] font-black tracking-tighter text-sp-black leading-[0.9] uppercase font-sans">
            Fund The <br /><span className="inline-block bg-sp-blue text-white px-3 py-1 my-2">Future.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — Info */}
          <div className="flex flex-col gap-12">
            <p className="text-2xl sm:text-3xl text-sp-black font-bold leading-tight">
              Your resources directly map to rocketry kits and telescope setups for students who need it most.
            </p>
            <div className="flex flex-col gap-8 border-l-[6px] border-sp-blue pl-6 sm:pl-8">
              <div>
                <h3 className="text-3xl font-black text-sp-black uppercase mb-3">Direct Donations</h3>
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  ₹500 buys a model rocket kit. ₹5,000 secures workshop materials for 20 students. 100% goes to education.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-black text-sp-black uppercase mb-3">Corporate CSR</h3>
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  For contributions above ₹{DONATION_CAP.toLocaleString()}, we provide full compliance documentation, 80G receipts, and branded workshop partnerships.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-black text-sp-black uppercase mb-3">Educational Grants</h3>
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  School boards and foundations can apply for subsidized aerospace demonstrations for their district.
                </p>
              </div>
            </div>

            {/* Cap notice */}
            <div className="bg-sp-blue/5 border-[2px] border-sp-black p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-sp-blue flex-shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-sp-black">
                Online payments are capped at <strong>₹{DONATION_CAP.toLocaleString()}</strong>. For larger contributions or CSR requests, please email{' '}
                <a href="mailto:antariksafoundation@gmail.com" className="text-sp-blue underline">antariksafoundation@gmail.com</a>
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div className="w-full relative">
            {step === 'paying' ? (
              <div className="bg-white border-[6px] border-sp-black p-12 flex flex-col items-center justify-center gap-4 min-h-64">
                <div className="w-12 h-12 border-4 border-sp-blue border-t-transparent rounded-full animate-spin" />
                <p className="font-black uppercase text-sp-black tracking-wide">Opening Payment Gateway…</p>
              </div>
            ) : (
              <div className="bg-white border-[6px] border-sp-black p-8 sm:p-12 relative shadow-[12px_12px_0_0_#4F46E5] mt-12 lg:mt-0">
                <div className="absolute -top-6 -right-6 bg-sp-blue text-white font-black uppercase tracking-widest text-xl px-6 py-4 border-[4px] border-sp-black hidden sm:block">
                  Donate
                </div>

                <h2 className="text-3xl font-black text-sp-black mb-8 uppercase tracking-tighter">Make a Contribution</h2>

                {error && (
                  <div className="mb-4 border-[2px] border-red-500 bg-red-50 px-4 py-3 text-red-700 font-bold text-sm">
                    {error}
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-sp-black uppercase tracking-widest">First Name *</label>
                      <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required
                        className={inputClass} placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-sp-black uppercase tracking-widest">Last Name</label>
                      <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                        className={inputClass} placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-sp-black uppercase tracking-widest">Email Address *</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                      className={inputClass} placeholder="jane@example.com" />
                  </div>

                  {/* Amount with presets */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-sp-black uppercase tracking-widest">Amount (₹) *</label>
                    <div className="grid grid-cols-5 gap-2 mb-2">
                      {PRESET_AMOUNTS.map(p => (
                        <button key={p} type="button" onClick={() => setAmount(String(p))}
                          className={`py-2 border-[2px] border-sp-black font-black text-sm transition-colors ${amount === String(p) ? 'bg-sp-blue text-white border-sp-blue' : 'bg-white text-sp-black hover:bg-gray-50'}`}>
                          ₹{p >= 1000 ? `${p / 1000}K` : p}
                        </button>
                      ))}
                    </div>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required min="1"
                      placeholder="Or enter custom amount" className={inputClass} />
                    {isLarge && numAmount > 0 && (
                      <div className="flex items-center gap-2 text-sm font-bold text-amber-700 bg-amber-50 border-[2px] border-amber-400 px-3 py-2 mt-1">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        ₹{numAmount.toLocaleString()} exceeds the online limit. Clicking below will send a CSR/donation request by email instead.
                      </div>
                    )}
                  </div>

                  {/* Contribution type */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-sp-black uppercase tracking-widest mb-2 block">Contribution Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Direct', 'CSR', 'Grant'].map(t => (
                        <button key={t} type="button" onClick={() => setType(t)}
                          className={`py-3 border-[3px] border-sp-black font-black text-lg transition-colors ${type === t ? 'bg-sp-blue text-white' : 'bg-white text-sp-black hover:bg-gray-50'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                    <input type="text" value={orgDetails} onChange={e => setOrgDetails(e.target.value)}
                      className={inputClass} placeholder="Organisation / Company Name (if applicable)" />
                  </div>

                  <button type="submit"
                    className="w-full flex items-center justify-center gap-4 bg-sp-black text-white py-4 font-black uppercase text-lg group hover:bg-sp-blue transition-colors border-[3px] border-sp-black mt-6">
                    {isLarge ? (
                      <><Mail className="w-5 h-5" /> Send Donation Request</>
                    ) : (
                      <>Pay ₹{numAmount > 0 ? numAmount.toLocaleString() : '—'} Securely <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></>
                    )}
                  </button>

                  {!isLarge && (
                    <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Secured by Razorpay · UPI · Cards · Net Banking
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportUs;
