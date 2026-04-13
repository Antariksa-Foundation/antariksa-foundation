import React from 'react';
import { Rocket, Satellite, Telescope, BrainCircuit } from 'lucide-react';

const WhatWeDo = () => {
  return (
    <div className="pt-[100px] min-h-screen bg-sp-white pb-24 selection:bg-sp-blue selection:text-white">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
         
         <div className="mb-16 lg:mb-24">
            <div className="border-[3px] border-sp-black px-4 py-2 w-max mb-6">
               <span className="text-sp-black font-black tracking-[0.2em] uppercase text-sm">
                 Methodology
               </span>
            </div>
            <h1 className="text-6xl sm:text-[5.5rem] lg:text-[7.5rem] font-black text-sp-black tracking-tighter leading-[0.85] uppercase">
               What <span className="text-white bg-sp-blue px-3 py-1 my-2 inline-block">We Do.</span>
            </h1>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Service 1 */}
            <div className="border-[6px] border-sp-black bg-white p-8 sm:p-12 shadow-[12px_12px_0_0_#0B0F19] relative">
               <div className="absolute -top-8 -right-8 bg-sp-blue border-[4px] border-sp-black p-4 text-white hidden sm:block hover:-translate-y-2 transition-transform">
                  <Rocket className="w-12 h-12" />
               </div>
               <h2 className="text-4xl font-black text-sp-black uppercase mb-6 tracking-tighter">Model Rocketry</h2>
               <p className="text-xl text-gray-800 font-medium leading-relaxed border-l-[4px] border-sp-blue pl-6">
                  We conduct full-scale model rocket building workshops. Students assemble, prepare solid propulsion engines, and launch them to understand aerodynamics, fluid mechanics, and center of pressure constraints.
               </p>
            </div>

            {/* Service 2 */}
            <div className="border-[6px] border-sp-black bg-gray-100 p-8 sm:p-12 shadow-[12px_12px_0_0_#4F46E5] relative mt-8 lg:mt-16">
               <div className="absolute -top-8 -right-8 bg-sp-black border-[4px] border-sp-black p-4 text-white hidden sm:block hover:-translate-y-2 transition-transform">
                  <Satellite className="w-12 h-12" />
               </div>
               <h2 className="text-4xl font-black text-sp-black uppercase mb-6 tracking-tighter">Orbital Mechanics</h2>
               <p className="text-xl text-gray-800 font-medium leading-relaxed border-l-[4px] border-sp-black pl-6">
                  Breaking down Kepler's laws into interactive gaming simulations. Students calculate orbital velocity, launch windows, and slingshot trajectories using real physics engines simplified for the classroom.
               </p>
            </div>

            {/* Service 3 */}
            <div className="border-[6px] border-sp-black bg-white p-8 sm:p-12 shadow-[12px_12px_0_0_#0B0F19] relative lg:-mt-16">
               <div className="absolute -top-8 -left-8 bg-sp-blue border-[4px] border-sp-black p-4 text-white hidden sm:block hover:-translate-y-2 transition-transform">
                  <Telescope className="w-12 h-12" />
               </div>
               <h2 className="text-4xl font-black text-sp-black uppercase mb-6 tracking-tighter sm:pl-10 lg:pl-0">Night Astronomy</h2>
               <p className="text-xl text-gray-800 font-medium leading-relaxed border-l-[4px] border-sp-blue pl-6">
                  We bring heavy-duty Dobsonian telescopes directly to school campuses. Students observe lunar craters, Saturnian rings, and deep-space nebulas firsthand, anchoring astronomical scale into reality.
               </p>
            </div>

            {/* Service 4 */}
            <div className="border-[6px] border-sp-black bg-gray-100 p-8 sm:p-12 shadow-[12px_12px_0_0_#4F46E5] relative mt-8 lg:mt-0">
               <div className="absolute -top-8 -left-8 bg-sp-black border-[4px] border-sp-black p-4 text-white hidden sm:block hover:-translate-y-2 transition-transform">
                  <BrainCircuit className="w-12 h-12" />
               </div>
               <h2 className="text-4xl font-black text-sp-black uppercase mb-6 tracking-tighter sm:pl-10 lg:pl-0">Rover Robotics</h2>
               <p className="text-xl text-gray-800 font-medium leading-relaxed border-l-[4px] border-sp-black pl-6">
                  Teams are tasked with constructing and programming basic rovers to navigate simulated Mars terrain, teaching core mechatronics, sensor inputs, and closed-loop control systems.
               </p>
            </div>

         </div>

      </div>
    </div>
  );
};

export default WhatWeDo;
