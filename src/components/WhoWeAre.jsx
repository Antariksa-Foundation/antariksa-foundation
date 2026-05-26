import React from 'react';

const WhoWeAre = () => {
  return (
    <section className="min-h-[100dvh] lg:h-[100dvh] w-full pt-[100px] pb-12 lg:pt-[80px] lg:pb-0 bg-white flex flex-col justify-center lg:overflow-hidden box-border">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-24 items-center">
        
        {/* Left Typography Block */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6">
            <div className="self-start border-[3px] border-sp-black px-4 py-2 mb-6">
               <span className="text-sp-black font-black tracking-[0.2em] uppercase text-sm sm:text-base">
                 Antariksa Foundation
               </span>
            </div>

            <h1 className="text-6xl sm:text-[5.5rem] lg:text-[7.5rem] font-black text-sp-black tracking-tighter leading-[0.85] uppercase">
                <span className="block">Building</span>
                <span className="block text-white bg-sp-blue px-3 py-1 lg:py-2 w-max lg:-ml-3 my-2 lg:my-4">The Future</span>
                <span className="block">Of Space.</span>
            </h1>
        </div>

        {/* Right Content Block */}
        <div className="w-full lg:w-2/5 flex flex-col gap-10 lg:pl-10">
            <div>
               <p className="text-2xl sm:text-3xl lg:text-4xl text-sp-black font-bold leading-tight tracking-tight">
                 We are a student-led Non-Profit Organization building the space workforce of the future through experiential learning, community-building, and joint R&D in collaboration with academia, government, and industry.
               </p>
            </div>
            
            <div className="w-20 h-3 bg-sp-blue"></div>

            <div>
               <p className="text-xl sm:text-2xl text-gray-500 font-medium leading-relaxed">
                 By bridging the gap between theoretical knowledge and aerospace practice, we provide students with world-class hands-on exploration tools.
               </p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default WhoWeAre;
