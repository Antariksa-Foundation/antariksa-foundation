import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, Orbit, Telescope } from 'lucide-react';

const services = [
  { icon: Rocket, title: "Hands-on Demos", desc: "Building and launching model rockets to understand propulsion." },
  { icon: Telescope, title: "Astronomy Nights", desc: "Observing deep space objects and learning constellations." },
  { icon: Orbit, title: "Workshops", desc: "Interactive sessions on orbital mechanics and spacecraft design." }
];

const WhatWeDo = () => {
  return (
    <section id="what" className="py-24 bg-gray-50">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
         >
           <h2 className="text-4xl font-bold text-sp-black uppercase tracking-widest relative inline-block">
              What We Do?
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-sp-blue rounded"></div>
           </h2>
         </motion.div>

         <div className="flex flex-col lg:flex-row gap-8">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="lg:w-1/3 bg-sp-black rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl flex flex-col justify-end min-h-[400px]"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-transparent"></div>
               <Sparkles className="text-sp-blue w-16 h-16 absolute top-8 right-8 opacity-20" />
               <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-4">Core Programs</h3>
                  <p className="text-gray-300">We deliver end-to-end demonstrations—from basic physics to complex space systems.</p>
                  <button className="mt-8 px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors font-medium">Explore Programs</button>
               </div>
            </motion.div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
               {services.map((svc, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
                  >
                     <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-sp-blue mb-6 group-hover:scale-110 transition-transform">
                        <svc.icon className="w-6 h-6" />
                     </div>
                     <h4 className="text-xl font-bold text-gray-900 mb-2">{svc.title}</h4>
                     <p className="text-gray-600">{svc.desc}</p>
                  </motion.div>
               ))}
               
               <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     className="bg-gradient-to-br from-sp-blue to-indigo-600 rounded-2xl p-6 shadow-xl flex items-center justify-center text-center group overflow-hidden relative cursor-pointer"
                  >
                     <div className="absolute inset-0 bg-white opacity-5 group-hover:opacity-10 transition-opacity"></div>
                     <div className="relative z-10 flex items-center gap-4">
                        <span className="text-white font-bold text-2xl">Book a session</span>
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sp-blue group-hover:translate-x-2 transition-transform shadow-lg">
                           →
                        </div>
                     </div>
               </motion.div>
            </div>
         </div>
       </div>
    </section>
  );
};

export default WhatWeDo;
