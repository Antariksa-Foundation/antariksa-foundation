import React from 'react';
import { ArrowRight } from 'lucide-react';

const JoinUs = () => {
  return (
    <div className="pt-[100px] pb-24 min-h-screen bg-white selection:bg-sp-blue selection:text-white">
       <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-stretch">
             
             {/* Left Text Box */}
             <div className="col-span-1 lg:col-span-6 flex flex-col justify-center gap-8">
                <div className="border-[3px] border-sp-black px-4 py-2 w-max">
                   <span className="text-sp-black font-black tracking-[0.2em] uppercase text-sm">
                     Join the Squad
                   </span>
                </div>
                <h1 className="text-6xl sm:text-[5.5rem] lg:text-[6.5rem] font-black tracking-tighter text-sp-black leading-[0.9] uppercase">
                   Teach. <br />
                   <span className="inline-block bg-sp-blue text-white px-3 py-1 my-2">Inspire.</span> <br />
                   Build.
                </h1>
                
                <div className="border-l-[6px] border-sp-black pl-6 sm:pl-8 mt-4 space-y-6">
                   <p className="text-2xl text-sp-black font-bold leading-tight">
                      We are looking for passionate engineering and science students to join our ground team.
                   </p>
                   <p className="text-xl text-gray-700 leading-relaxed font-medium">
                      If you're ready to translate tough physics into exciting demonstrations for younger students across the country, step up. No teaching experience required, just pure enthusiasm.
                   </p>
                </div>
             </div>

             {/* Right Form Container */}
             <div className="col-span-1 lg:col-span-6 flex flex-col justify-center mt-12 lg:mt-0">
                <div className="bg-gray-100 border-[6px] border-sp-black p-6 sm:p-10 relative w-full shadow-[12px_12px_0_0_#0B0F19]">
                   
                   <h2 className="text-3xl font-black text-sp-black mb-8 uppercase tracking-tighter">Submit Application</h2>
                   
                   <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-sp-black uppercase tracking-widest">First Name</label>
                            <input type="text" className="w-full bg-white border-[3px] border-sp-black px-4 py-3 focus:outline-none rounded-none text-lg" placeholder="John" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-bold text-sp-black uppercase tracking-widest">Last Name</label>
                            <input type="text" className="w-full bg-white border-[3px] border-sp-black px-4 py-3 focus:outline-none rounded-none text-lg" placeholder="Doe" />
                         </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-xs font-bold text-sp-black uppercase tracking-widest">University Email</label>
                         <input type="email" className="w-full bg-white border-[3px] border-sp-black px-4 py-3 focus:outline-none rounded-none text-lg" placeholder="john@university.edu" />
                      </div>

                      <div className="space-y-2">
                         <label className="text-xs font-bold text-sp-black uppercase tracking-widest">Major / Field of Study</label>
                         <input type="text" className="w-full bg-white border-[3px] border-sp-black px-4 py-3 focus:outline-none rounded-none text-lg" placeholder="Aerospace Engineering" />
                      </div>

                      <div className="space-y-2">
                         <label className="text-xs font-bold text-sp-black uppercase tracking-widest">Why Spectra?</label>
                         <textarea rows={4} className="w-full bg-white border-[3px] border-sp-black px-4 py-3 focus:outline-none rounded-none resize-none text-lg" placeholder="Tell us why you want to teach space science..."></textarea>
                      </div>

                      <button className="w-full flex items-center justify-center gap-4 bg-sp-blue text-white py-4 font-black uppercase text-lg group hover:bg-sp-black transition-colors border-[3px] border-sp-black shadow-none mt-4">
                         Submit Profile <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </button>
                   </form>
                </div>
             </div>
          </div>

       </div>
    </div>
  );
};
export default JoinUs;
