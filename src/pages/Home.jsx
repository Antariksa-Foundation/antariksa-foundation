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
                     Building <span className="inline-block bg-sp-black text-white px-3 py-1 mt-2">The Future.</span><br/> Together.
                  </h2>
                  
                  <p className="text-lg sm:text-xl text-gray-700 font-medium leading-relaxed max-w-xl mt-4 border-l-4 border-sp-blue pl-6">
                     We are a student-led Non-Profit Organization building the space workforce of the future through experiential learning, community-building, and joint R&D in collaboration with academia, government, and industry.
                  </p>

                  <Link to="/who-we-are" className="mt-6 flex items-center justify-between w-max gap-6 px-8 py-4 bg-sp-blue text-white font-bold uppercase tracking-wider text-base hover:bg-sp-black transition-colors group">
                     Read Our Story
                     <MoveRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </Link>
               </div>
            </div>
        </div>
      </section>

      {/* Program Highlights Section */}
      <section className="py-24 bg-white border-t-[4px] border-sp-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
             <div className="border-[3px] border-sp-black px-4 py-2 w-max mx-auto mb-6">
                <span className="text-sp-black font-black tracking-[0.2em] uppercase text-sm">
                  Highlights
                </span>
             </div>
             <h2 className="text-5xl lg:text-7xl font-black text-sp-black tracking-tight leading-[1.05] uppercase">
                Program <span className="text-white bg-sp-blue px-3 py-1 mt-2 inline-block">Highlights.</span>
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             
             {/* Highlight 1 */}
             <div className="border-[6px] border-sp-black bg-white p-8 shadow-[8px_8px_0_0_#0B0F19] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_0_#0B0F19] transition-all flex flex-col gap-4">
                <div className="w-12 h-12 bg-sp-blue text-white font-black border-[3px] border-sp-black flex items-center justify-center text-xl shadow-[2px_2px_0_0_#000]">
                   01
                </div>
                <h3 className="text-2xl font-black text-sp-black uppercase tracking-tight">Learn, Build, Launch</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                   Gain a strong understanding of space exploration concepts, followed by active hands-on building and a live model rocket launch.
                </p>
             </div>

             {/* Highlight 2 */}
             <div className="border-[6px] border-sp-black bg-gray-50 p-8 shadow-[8px_8px_0_0_#4F46E5] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_0_#4F46E5] transition-all flex flex-col gap-4">
                <div className="w-12 h-12 bg-sp-black text-white font-black border-[3px] border-sp-black flex items-center justify-center text-xl shadow-[2px_2px_0_0_#4F46E5]">
                   02
                </div>
                <h3 className="text-2xl font-black text-sp-black uppercase tracking-tight">Physics In Action</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                   Experience core physics principles dynamically and practically while having absolute fun. Science isn't dry here—it's alive.
                </p>
             </div>

             {/* Highlight 3 */}
             <div className="border-[6px] border-sp-black bg-white p-8 shadow-[8px_8px_0_0_#0B0F19] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_0_#0B0F19] transition-all flex flex-col gap-4">
                <div className="w-12 h-12 bg-sp-blue text-white font-black border-[3px] border-sp-black flex items-center justify-center text-xl shadow-[2px_2px_0_0_#000]">
                   03
                </div>
                <h3 className="text-2xl font-black text-sp-black uppercase tracking-tight">Space Community</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                   Become a crucial part of an active space exploration network, building connections for your future aerospace journey.
                </p>
             </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
