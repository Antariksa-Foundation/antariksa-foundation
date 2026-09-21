import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WhoWeArePage from './pages/WhoWeArePage';
import WhatWeDoPage from './pages/WhatWeDoPage';
import JoinUs from './pages/JoinUs';
import SupportUs from './pages/SupportUs';
import Gallery from './pages/Gallery';

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-sp-white font-sans text-sp-black selection:bg-sp-blue selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/who-we-are" element={<WhoWeArePage />} />
          <Route path="/what-we-do" element={<WhatWeDoPage />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/support-us" element={<SupportUs />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
