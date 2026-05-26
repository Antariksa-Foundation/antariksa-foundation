import React from 'react';
import WhoWeAre from '../components/WhoWeAre';

const WhoWeArePage = () => {
  return (
     <div className="pt-10">
        <WhoWeAre />

        {/* Our Team Section */}
        <section className="py-24 bg-gray-50 border-t-[4px] border-sp-black">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
               <div className="border-[3px] border-sp-black px-4 py-2 w-max mb-6">
                  <span className="text-sp-black font-black tracking-[0.2em] uppercase text-sm">
                    Our Engine
                  </span>
               </div>
               <h2 className="text-5xl lg:text-7xl font-black text-sp-black tracking-tight leading-[1.05] uppercase">
                  Our <span className="text-white bg-sp-blue px-3 py-1 mt-2 inline-block">Team.</span>
               </h2>
            </div>

            <div className="border-[6px] border-sp-black bg-white p-8 sm:p-12 shadow-[12px_12px_0_0_#0B0F19] flex flex-col md:flex-row gap-8 items-center justify-between">
               <div className="flex-1 space-y-6">
                  <h3 className="text-3xl font-black text-sp-black uppercase tracking-tight">Aerospace Engineering Students mentored by Industry Experts</h3>
                  <p className="text-xl text-gray-700 leading-relaxed font-medium">
                     Antariksa Foundation is powered by active aerospace engineering students who possess ongoing technical momentum and cutting-edge academic insights. They are mentored directly by senior industry experts who have successfully designed, built, and launched real-world space hardware.
                  </p>
               </div>
               <div className="w-full md:w-auto shrink-0 flex items-center justify-center p-4 bg-gray-50 border-[4px] border-sp-black shadow-[4px_4px_0_0_#4F46E5]">
                  <span className="text-sp-black font-black text-center text-lg tracking-widest uppercase p-4 leading-normal">
                     100% Student-Led <br/>
                     <span className="text-sp-blue text-sm">Mentored by veterans</span>
                  </span>
               </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-white border-t-[4px] border-sp-black">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
               <div className="border-[3px] border-sp-black px-4 py-2 w-max mb-6">
                  <span className="text-sp-black font-black tracking-[0.2em] uppercase text-sm">
                    Value Proposition
                  </span>
               </div>
               <h2 className="text-5xl lg:text-7xl font-black text-sp-black tracking-tight leading-[1.05] uppercase">
                  Benefits of <span className="text-white bg-sp-black px-3 py-1 mt-2 inline-block text-[3.5rem] lg:text-[5rem] xl:text-[6rem]">Antariksa Foundation.</span>
               </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               
               {/* Institutional Benefits */}
               <div className="border-[6px] border-sp-black bg-gray-50 p-8 sm:p-12 shadow-[12px_12px_0_0_#4F46E5] flex flex-col gap-6">
                  <h3 className="text-3xl font-black text-sp-black uppercase tracking-tight pb-4 border-b-4 border-sp-black">
                     Institutional Benefits
                  </h3>
                  <ul className="space-y-6">
                     <li className="flex gap-4 items-start">
                        <div className="w-8 h-8 shrink-0 bg-sp-blue border-[2px] border-sp-black flex items-center justify-center text-white font-black">✓</div>
                        <div>
                           <h4 className="text-xl font-bold text-sp-black">Highly Sought-Out Expertise</h4>
                           <p className="text-gray-700 font-medium">Establish a unique, high-value domain of space systems knowledge and rocketry inside your academic institution.</p>
                        </div>
                     </li>
                     <li className="flex gap-4 items-start">
                        <div className="w-8 h-8 shrink-0 bg-sp-blue border-[2px] border-sp-black flex items-center justify-center text-white font-black">✓</div>
                        <div>
                           <h4 className="text-xl font-bold text-sp-black">Unfair Competitive Advantage</h4>
                           <p className="text-gray-700 font-medium">Equip your learners with trainers who have actually designed, built, and launched space systems successfully.</p>
                        </div>
                     </li>
                  </ul>
               </div>

               {/* Student Benefits */}
               <div className="border-[6px] border-sp-black bg-white p-8 sm:p-12 shadow-[12px_12px_0_0_#0B0F19] flex flex-col gap-6">
                  <h3 className="text-3xl font-black text-sp-black uppercase tracking-tight pb-4 border-b-4 border-sp-black">
                     Student Benefits
                  </h3>
                  <ul className="space-y-6">
                     <li className="flex gap-4 items-start">
                        <div className="w-8 h-8 shrink-0 bg-sp-black border-[2px] border-sp-black flex items-center justify-center text-white font-black">✓</div>
                        <div>
                           <h4 className="text-xl font-bold text-sp-black">Deep Space Concept Comprehension</h4>
                           <p className="text-gray-700 font-medium">Gain a solid, intuitive understanding of orbital parameters, rocket science, and celestial bodies.</p>
                        </div>
                     </li>
                     <li className="flex gap-4 items-start">
                        <div className="w-8 h-8 shrink-0 bg-sp-black border-[2px] border-sp-black flex items-center justify-center text-white font-black">✓</div>
                        <div>
                           <h4 className="text-xl font-bold text-sp-black">Hands-on Rocket Launch</h4>
                           <p className="text-gray-700 font-medium">Put theory into practical action by assembling model rocket kits, culminating in a live solid-propulsion launch.</p>
                        </div>
                     </li>
                     <li className="flex gap-4 items-start">
                        <div className="w-8 h-8 shrink-0 bg-sp-black border-[2px] border-sp-black flex items-center justify-center text-white font-black">✓</div>
                        <div>
                           <h4 className="text-xl font-bold text-sp-black">Informed Career Decision Making</h4>
                           <p className="text-gray-700 font-medium">Assess your alignment with different fields in space, aerospace, and robotics before choosing your college track.</p>
                        </div>
                     </li>
                  </ul>
               </div>

            </div>
          </div>
        </section>
     </div>
  );
};

export default WhoWeArePage;
