import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-sp-black shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/antariksa_logo_png.png" alt="Antariksa Foundation Logo" className="w-64 sm:w-72 md:w-80 h-[7rem] object-contain" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-sp-black hover:text-sp-blue px-2 py-2 text-sm font-bold uppercase tracking-wider transition-colors">Home</Link>
            <Link to="/who-we-are" className="text-sp-black hover:text-sp-blue px-2 py-2 text-sm font-bold uppercase tracking-wider transition-colors">Who we are</Link>
            <Link to="/what-we-do" className="text-sp-black hover:text-sp-blue px-2 py-2 text-sm font-bold uppercase tracking-wider transition-colors">What we do</Link>
            <Link to="/gallery" className="text-sp-black hover:text-sp-blue px-2 py-2 text-sm font-bold uppercase tracking-wider transition-colors">Gallery</Link>
          </nav>

          <div className="hidden md:flex flex-row gap-2 items-center">
            <Link to="/join-us" className="text-sp-black hover:text-sp-blue font-black px-2 py-2 text-xs transition-colors uppercase tracking-widest border-2 border-transparent hover:border-sp-black">Join Us</Link>
            <Link to="/support-us" className="bg-sp-blue text-white px-5 py-2 text-xs font-black uppercase tracking-widest hover:bg-sp-black transition-all border-[3px] border-sp-blue hover:border-sp-black">Support Us</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex">
            <button onClick={() => setIsOpen(!isOpen)} className="text-sp-black focus:outline-none p-2 hover:bg-gray-100">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b-[4px] border-sp-black px-4 py-6 space-y-6 shadow-xl absolute w-full max-h-[calc(100vh-80px)] overflow-y-auto">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-sp-black font-black uppercase tracking-widest text-xl">Home</Link>
          <Link to="/who-we-are" onClick={() => setIsOpen(false)} className="block text-sp-black font-black uppercase tracking-widest text-xl">Who we are</Link>
          <Link to="/what-we-do" onClick={() => setIsOpen(false)} className="block text-sp-black font-black uppercase tracking-widest text-xl">What we do</Link>
          <Link to="/gallery" onClick={() => setIsOpen(false)} className="block text-sp-black font-black uppercase tracking-widest text-xl">Gallery</Link>
          <hr className="border-t-2 border-gray-200 my-4" />
          <Link to="/join-us" onClick={() => setIsOpen(false)} className="block text-sp-black font-black uppercase tracking-widest text-xl">Join Us</Link>
          <Link to="/support-us" onClick={() => setIsOpen(false)} className="block text-center bg-sp-blue text-white border-[3px] border-sp-black px-5 py-4 font-black uppercase tracking-widest text-lg w-full mt-4">Support Us</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
