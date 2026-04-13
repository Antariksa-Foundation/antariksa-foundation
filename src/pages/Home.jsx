import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white overflow-hidden selection:bg-sp-blue selection:text-white">
      <Hero />
      
      {/* Editorial Neobrutalist Section 1 */}
      <section className="py-24 bg-white border-y-[4px] border-sp-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
               
               <div className="flex flex-col gap-6">
                  <div className="border-2 border-sp-black px-4 py-1.5 w-max">
                     <span className="text-sp-black font-bold tracking-wider uppercase text-sm">
                       Phase 01
                     </span>
                  </div>
                  
                  <h2 className="text-5xl lg:text-7xl font-black text-sp-black tracking-tight leading-[1.05] uppercase">
                     Bring Space <br/>
                     <span className="inline-block bg-sp-blue text-white px-3 py-1 mt-2">To The</span> Classroom.
                  </h2>
                  
                  <p className="text-xl sm:text-2xl text-gray-800 font-medium leading-relaxed max-w-xl mt-4 border-l-4 border-sp-blue pl-6">
                     Our hands-on demonstrations break down the complexities of astrophysics into tangible experiences.
                  </p>
               </div>
               
               <div className="w-full relative">
                  <div className="w-full aspect-[4/3] border-[6px] border-sp-black bg-gray-100 p-3 sm:p-5">
                     <img src="https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1200&auto=format&fit=crop" alt="Earth from space" className="w-full h-full object-cover filter contrast-[1.2] saturate-150" />
                     {/* Overlay Graphic Element */}
                     <div className="absolute -bottom-6 -left-6 bg-sp-blue text-white p-5 border-[4px] border-sp-black hidden sm:block">
                        <span className="font-black text-3xl block">100%</span>
                        <span className="font-bold tracking-widest uppercase text-xs">Practical</span>
                     </div>
                  </div>
               </div>

            </div>
        </div>
      </section>

      {/* Editorial Neobrutalist Section 2 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
               
               <div className="w-full relative order-2 lg:order-1">
                  <div className="w-full aspect-[4/3] border-[6px] border-sp-black bg-sp-black p-3 sm:p-5">
                     <img src="https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1200&auto=format&fit=crop" alt="Students learning" className="w-full h-full object-cover grayscale contrast-[1.15]" />
                  </div>
               </div>

               <div className="flex flex-col gap-6 order-1 lg:order-2 lg:pl-8">
                  <div className="border-2 border-sp-black px-4 py-1.5 w-max">
                     <span className="text-sp-black font-bold tracking-wider uppercase text-sm">
                       Mission
                     </span>
                  </div>
                  
                  <h2 className="text-5xl lg:text-7xl font-black text-sp-black tracking-tight leading-[1.05] uppercase">
                     By <span className="inline-block bg-sp-black text-white px-3 py-1 mt-2">Students.</span><br/> On a Mission.
                  </h2>
                  
                  <p className="text-lg sm:text-xl text-gray-700 font-medium leading-relaxed max-w-xl mt-4 border-l-4 border-sp-blue pl-6">
                     We aren't just educators; we are active engineering students. Our goal is to leverage our ongoing technical momentum to inspire peers and younger students, building a grassroots movement for space awareness.
                  </p>

                  <Link to="/who-we-are" className="mt-6 flex items-center justify-between w-max gap-6 px-8 py-4 bg-sp-blue text-white font-bold uppercase tracking-wider text-base hover:bg-sp-black transition-colors group">
                     Read Our Story
                     <MoveRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </Link>
               </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
