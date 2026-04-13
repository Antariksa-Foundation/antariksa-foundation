import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-sp-black text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
         <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src="/spectra-logo.png" alt="Spectra Logo" className="h-[4.5rem] w-auto brightness-0 invert" />
            </Link>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Empowering the next generation through hands-on space education. By engineering students, for students.
            </p>
         </div>
         <div>
            <h5 className="font-bold mb-4 uppercase tracking-[0.2em] text-sm text-gray-300">Organization</h5>
            <ul className="space-y-3 text-gray-500 font-medium">
               <li><Link to="/who-we-are" className="hover:text-white transition-colors">Who we are</Link></li>
               <li><Link to="/what-we-do" className="hover:text-white transition-colors">What we do</Link></li>
            </ul>
         </div>
         <div>
            <h5 className="font-bold mb-4 uppercase tracking-[0.2em] text-sm text-gray-300">Get Involved</h5>
            <ul className="space-y-3 text-gray-500 font-medium">
               <li><Link to="/join-us" className="hover:text-white transition-colors">Join Us</Link></li>
               <li><Link to="/support-us" className="hover:text-white transition-colors">Support Us</Link></li>
            </ul>
         </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
         <span>© {new Date().getFullYear()} Spectra Education. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
