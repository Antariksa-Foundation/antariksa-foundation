import React from 'react';
import { ArrowRight } from 'lucide-react';

const SupportUs = () => {
  return (
    <div className="pt-[100px] min-h-screen bg-sp-white selection:bg-sp-blue selection:text-white pb-24">
       <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Typography */}
          <div className="mb-16">
             <div className="border-[3px] border-sp-black px-4 py-2 w-max mb-6">
                <span className="text-sp-black font-black tracking-[0.2em] uppercase text-sm">
                  Partner With Us
                </span>
             </div>
             <h1 className="text-6xl sm:text-7xl lg:text-[7rem] font-black tracking-tighter text-sp-black leading-[0.9] uppercase">
                Fund The <br/><span className="inline-block bg-sp-blue text-white px-3 py-1 my-2">Future.</span>
             </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
             
             {/* Left Text Box */}
             <div className="flex flex-col gap-12">
                <p className="text-2xl sm:text-3xl text-sp-black font-bold leading-tight">
                   Your resources directly map to rocketry kits and telescope setups for students who need it most.
                </p>

                {/* Categories */}
                <div className="flex flex-col gap-8 border-l-[6px] border-sp-blue pl-6 sm:pl-8">
                   
                   <div>
                      <h3 className="text-3xl font-black text-sp-black uppercase mb-3">Direct Donations</h3>
                      <p className="text-xl text-gray-700 leading-relaxed font-medium">
                         $50 buys a solid propulsion kit. $500 secures a deep-space telescope. 100% of your capital goes directly to educational hardware.
                      </p>
                   </div>

                   <div>
                      <h3 className="text-3xl font-black text-sp-black uppercase mb-3">Corporate CSR</h3>
                      <p className="text-xl text-gray-700 leading-relaxed font-medium">
                         Align your company's philanthropic goals with STEM. We manage full regional workshop tours branded with your sponsorship, building an engineering pipeline.
                      </p>
                   </div>

                   <div>
                      <h3 className="text-3xl font-black text-sp-black uppercase mb-3">Educational Grants</h3>
                      <p className="text-xl text-gray-700 leading-relaxed font-medium">
                         If you represent a school board or foundation, you can apply for subsidized aerospace demonstrations for your district.
                      </p>
                   </div>

                </div>
             </div>

             {/* Right Form Container */}
             <div className="bg-white border-[6px] border-sp-black p-8 sm:p-12 relative shadow-[12px_12px_0_0_#4F46E5] mt-12 lg:mt-0">
                <div className="absolute -top-6 -right-6 bg-sp-blue text-white font-black uppercase tracking-widest text-xl px-6 py-4 border-[4px] border-sp-black hidden sm:block">
                   Contribution
                </div>

                <h2 className="text-3xl font-black text-sp-black mb-8 uppercase tracking-tighter">Submit Details</h2>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-sp-black uppercase tracking-widest">First Name</label>
                         <input type="text" className="w-full bg-gray-50 border-[3px] border-sp-black px-4 py-3 focus:outline-none focus:ring-none rounded-none text-lg" placeholder="Jane" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-sp-black uppercase tracking-widest">Last Name</label>
                         <input type="text" className="w-full bg-gray-50 border-[3px] border-sp-black px-4 py-3 focus:outline-none focus:ring-none rounded-none text-lg" placeholder="Doe" />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold text-sp-black uppercase tracking-widest">Email</label>
                      <input type="email" className="w-full bg-gray-50 border-[3px] border-sp-black px-4 py-3 focus:outline-none focus:ring-none rounded-none text-lg" placeholder="jane@company.com" />
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold text-sp-black uppercase tracking-widest mb-2 block">Amount Type</label>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                         <button type="button" className="py-3 border-[3px] border-sp-black bg-white text-sp-black font-black hover:bg-sp-blue hover:text-white transition-colors text-lg">CSR</button>
                         <button type="button" className="py-3 border-[3px] border-sp-black bg-white text-sp-black font-black hover:bg-sp-blue hover:text-white transition-colors text-lg">Grant</button>
                         <button type="button" className="py-3 border-[3px] border-sp-black bg-white text-sp-black font-black hover:bg-sp-blue hover:text-white transition-colors text-lg">Direct</button>
                      </div>
                      <input type="text" className="w-full bg-gray-50 border-[3px] border-sp-black px-4 py-3 focus:outline-none focus:ring-none rounded-none text-lg" placeholder="Organization / Custom Details" />
                   </div>

                   <button className="w-full flex items-center justify-center gap-4 bg-sp-black text-white py-4 font-black uppercase text-lg group hover:bg-sp-blue transition-colors border-[3px] border-sp-black outline-offset-4 mt-8">
                      Proceed to Review <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                   </button>
                </form>
             </div>
          </div>

       </div>
    </div>
  );
};
export default SupportUs;
