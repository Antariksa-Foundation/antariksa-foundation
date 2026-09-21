import React from 'react';
import Presentation from './Presentation';

// Presenters subdomain now serves only the presentation interface.
// No admin or management functionality is exposed here.
const Presenters = () => {
  return (
    <div className="min-h-screen bg-sp-white text-sp-black">
      <h1 className="text-4xl font-black text-sp-black uppercase tracking-tight text-center pt-8 pb-4">
        Presenter Portal
      </h1>
      {/* Directly embed the Presentation component which provides course selection and slide navigation */}
      <Presentation />
    </div>
  );
};

export default Presenters;
