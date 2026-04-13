import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200&auto=format&fit=crop",
    title: ["Bring The", "Cosmos", "Into The Classroom."],
    highlightIndex: 1, // which line to make blue block
    desc: "We deliver tangible space education through immersive demonstrations, giving the next generation a launchpad into aerospace and engineering."
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=1200&auto=format&fit=crop",
    title: ["Master", "Orbital", "Mechanics Today."],
    highlightIndex: 1,
    desc: "Take hands-on courses focusing on gravitational assists, orbital trajectories, and the fundamental math that powers satellites."
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1200&auto=format&fit=crop",
    title: ["Gaze Into", "Deep Space", "Astronomy."],
    highlightIndex: 1,
    desc: "Observe celestial bodies firsthand with our professional optics program, bringing the stars down to the schoolyard."
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    title: ["Overcome", "Engineering", "Challenges."],
    highlightIndex: 1,
    desc: "Collaborative building, problem-solving workshops and rover construction competitions."
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-[100dvh] lg:h-[100dvh] w-full flex items-center bg-gray-900 lg:bg-white text-sp-black overflow-hidden relative pt-[80px] border-b-[8px] border-sp-black box-border">
      
      {/* MOBILE FULL-BLEED BACKGROUND IMAGE */}
      <div className="absolute inset-0 block lg:hidden z-0 border-b-[6px] border-sp-black overflow-hidden">
        <AnimatePresence initial={false}>
            <motion.div
                key={`img-mobile-${current}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
            >
                <img 
                src={slides[current].img} 
                className="w-full h-full object-cover filter contrast-[1.15] saturate-[1.1] opacity-90"
                alt="Mobile background"
                />
            </motion.div>
        </AnimatePresence>
        
        {/* Subtle gradient so the image isn't too overpowering */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
        
        {/* Mobile Carousel Indicators */}
        <div className="absolute top-6 right-6 z-30 flex gap-1.5 p-1.5 bg-sp-black/40 backdrop-blur-md border border-white/20">
            {slides.map((_, idx) => (
                <button 
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 transition-all duration-300 ease-out ${idx === current ? 'w-6 bg-sp-blue border border-sp-blue' : 'w-3 bg-white/60 hover:bg-white'}`}
                aria-label={`Go to slide ${idx + 1}`}
                />
            ))}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 h-[calc(100vh-80px)] lg:h-full lg:max-w-[85rem] lg:mx-auto flex flex-col justify-end lg:justify-center py-6 lg:py-6">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-0 lg:gap-12 xl:gap-16 w-full h-full lg:h-[90%] lg:max-h-[700px]">
          
          {/* Text Side (Docked Bottom Sheet on Mobile, Standard Flex on Desktop) */}
          <div className="w-full flex-1 lg:pr-8 flex flex-col justify-end lg:justify-center mt-auto lg:mt-0 z-20 h-full">
             
             {/* Brutalist Container for Mobile Panel */}
             <div className="bg-white border-t-[4px] lg:border-none border-sp-black px-6 py-8 sm:p-8 lg:p-0 lg:bg-transparent -mx-4 sm:-mx-6 lg:mx-0 w-auto lg:w-full self-stretch">
                 
                 {/* Brutalist Badge */}
                 <div className="inline-block px-3 lg:px-4 py-1 border-[2px] border-sp-black bg-white text-sp-black font-bold text-[10px] lg:text-xs tracking-[0.2em] uppercase mb-4 lg:mb-6 self-start shadow-[2px_2px_0_0_#000] lg:shadow-none">
                    Pioneering Space
                 </div>
                 
                 {/* Text container */}
                 <div className="w-full flex flex-col justify-start relative lg:min-h-[220px] xl:min-h-[300px] mb-4 lg:mb-0">
                   <AnimatePresence mode="wait">
                      <motion.div
                        key={`text-${current}`}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 15 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex flex-col"
                      >
                         <h1 className="flex flex-col items-start text-[2.5rem] sm:text-5xl lg:text-[3.25rem] xl:text-[4rem] font-black tracking-tighter leading-[1.1] lg:leading-[1.05] mb-4 lg:mb-6 font-sans text-sp-black uppercase">
                           {slides[current].title.map((line, idx) => (
                              <span key={idx} className={`max-w-full break-words ${idx === slides[current].highlightIndex ? 'bg-sp-blue text-white px-2 lg:px-3 py-1 my-[2px] lg:my-2 border-[3px] lg:border-[4px] border-sp-black' : ''}`}>
                                 {line}
                              </span>
                           ))}
                         </h1>
                         
                         <div className="border-l-[4px] lg:border-l-[6px] border-sp-blue pl-4 lg:pl-6">
                           <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-800 leading-tight mb-1 lg:mb-2">
                              Interactive Learning
                           </p>
                           <p className="text-[0.95rem] sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-lg leading-relaxed font-medium">
                             {slides[current].desc}
                           </p>
                         </div>
                      </motion.div>
                   </AnimatePresence>
                 </div>

                 {/* Brutalist CTA Button */}
                 <div className="flex gap-4 mt-2 lg:mt-6">
                    <a href="/what-we-do" className="bg-sp-black text-white px-6 sm:px-8 py-3.5 lg:py-4 font-black uppercase tracking-widest text-sm hover:bg-sp-blue transition-colors border-[3px] border-sp-black lg:border-transparent hover:border-sp-black w-full sm:w-auto text-center shadow-[4px_4px_0_0_#4F46E5] lg:shadow-none">
                      Explore Programs
                    </a>
                 </div>
                 
             </div>
          </div>

          {/* Right Image Side Carousel - Brutalist Redesign (Desktop Only) */}
          <div className="hidden lg:flex w-full lg:flex-1 h-[450px] xl:h-[550px] min-h-[400px] shrink-0 relative z-20 items-center justify-center">
             
             {/* Stark Outer Frame */}
             <div className="relative w-full h-full border-[6px] border-sp-black bg-gray-100 p-4 xl:p-5">
                
                {/* Inner Image Frame */}
                <div className="relative w-full h-full bg-gray-200 overflow-hidden border-[4px] border-sp-black/10 group">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={`img-desktop-${current}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.4 } }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0 z-10"
                    >
                      <img 
                        src={slides[current].img} 
                        alt="Slide showcase"
                        className="w-full h-full object-cover filter contrast-[1.15]"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Clear Carousel Navigation Inside Image */}
                  <div className="absolute bottom-6 right-6 z-30 flex gap-1.5 p-2 bg-sp-black/40 backdrop-blur-md border border-white/10">
                    {slides.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-1.5 transition-all duration-300 ease-out ${idx === current ? 'w-8 bg-sp-blue border border-sp-blue' : 'w-4 bg-white/60 hover:bg-white'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
                
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
