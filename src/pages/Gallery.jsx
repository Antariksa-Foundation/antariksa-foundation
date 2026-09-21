import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const Gallery = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadGallery() {
      const { data } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setItems(data);
    }
    loadGallery();
  }, []);

  return (
    <div className="pt-[160px] pb-24 min-h-screen bg-sp-white selection:bg-sp-blue selection:text-white">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-16">
          <div className="border-[3px] border-sp-black px-4 py-2 w-max mb-6 bg-white">
            <span className="text-sp-black font-black tracking-[0.2em] uppercase text-sm">
              Visual Archives
            </span>
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-[7.5rem] font-black text-sp-black tracking-tighter leading-[0.85] uppercase">
            Our <span className="text-white bg-sp-blue px-3 py-1 my-2 inline-block">Gallery.</span>
          </h1>
          <p className="text-xl text-gray-700 font-medium leading-relaxed max-w-2xl mt-8 border-l-4 border-sp-blue pl-6">
            A real-time adaptable showcase of our student launches, CanSat assemblies, stargazing workshops, and aerospace designs.
          </p>
        </div>

        {/* Bento Grid (Masonry using CSS columns for automatic aspect-ratio adjustment) */}
        {items.length === 0 ? (
          <div className="border-[4px] border-dashed border-gray-400 p-12 text-center text-gray-500 font-bold uppercase tracking-wider bg-white">
            No images uploaded yet. Access the Admin Panel to seed.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance] box-border w-full">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="break-inside-avoid mb-6 bg-white border-[4px] border-sp-black p-4 shadow-[6px_6px_0_0_#0B0F19] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_0_#0B0F19] transition-all duration-300 group cursor-pointer flex flex-col"
              >
                {/* Image Wrapper */}
                <div className="overflow-hidden border-[3px] border-sp-black bg-gray-100 mb-4 relative aspect-auto">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500 filter contrast-[1.05]"
                  />
                  <div className="absolute top-2 left-2 bg-sp-black text-white font-black text-[9px] uppercase tracking-widest px-2 py-0.5 border border-white">
                    {item.aspect_ratio || 'Auto'}
                  </div>
                </div>

                {/* Typography details */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-black text-lg sm:text-xl text-sp-black uppercase tracking-tight leading-tight group-hover:text-sp-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Gallery;
