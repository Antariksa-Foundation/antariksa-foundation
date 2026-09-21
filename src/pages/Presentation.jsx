import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Play, RotateCcw, Activity } from 'lucide-react';
import { db } from '../services/db';

import { COURSES_DATA } from '../data/coursesData';

const Presentation = () => {
  const [courseIndex, setCourseIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const currentCourse = COURSES_DATA[courseIndex];
  const currentSlide = currentCourse.slides[slideIndex];

  // Presentation clicker controls
  const nextSlide = () => {
    if (slideIndex < currentCourse.slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else if (courseIndex < COURSES_DATA.length - 1) {
      setCourseIndex(courseIndex + 1);
      setSlideIndex(0);
    }
  };

  const prevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    } else if (courseIndex > 0) {
      setCourseIndex(courseIndex - 1);
      setSlideIndex(COURSES_DATA[courseIndex - 1].slides.length - 1);
    }
  };

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [courseIndex, slideIndex]);

  // Load custom presenter upload media if any match
  const presenterMedia = db.getPresenterMedia();
  const matchedAsset = presenterMedia.find(m => m.id === currentSlide.associatedAsset);

  return (
    <div className="pt-[100px] min-h-screen bg-sp-black text-white selection:bg-sp-blue selection:text-white flex flex-col justify-between">
      
      {/* Course Selector Strip */}
      <div className="bg-sp-blue border-b-[4px] border-sp-black p-4 flex flex-wrap gap-4 items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <span className="font-sans font-black text-xs uppercase bg-white text-sp-black px-3 py-1 border-2 border-sp-black shadow-[2px_2px_0_0_#000]">
            PRESENTER VIEW
          </span>
          <span className="text-xl font-bold uppercase tracking-tight">{currentCourse.title}</span>
        </div>
        <div className="flex gap-2">
          {COURSES_DATA.map((course, idx) => (
            <button 
              key={idx}
              onClick={() => { setCourseIndex(idx); setSlideIndex(0); }}
              className={`px-3 py-1.5 font-bold uppercase tracking-wider text-xs border-[2px] transition-colors ${idx === courseIndex ? 'bg-white text-sp-black border-white' : 'bg-transparent text-white border-white/20 hover:border-white'}`}
            >
              Course {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Slide Deck Space */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch overflow-hidden">
        
        {/* Left Side: Course Text Content & Deck Index */}
        <div className="w-full lg:w-2/5 p-8 flex flex-col justify-between border-b-4 lg:border-b-0 lg:border-r-4 border-sp-black bg-white text-sp-black overflow-y-auto">
          <div className="space-y-8">
            {/* Slide Count Indicator */}
            <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-widest">
              <span>{currentCourse.title}</span>
              <span>Slide {slideIndex + 1} of {currentCourse.slides.length}</span>
            </div>

            {/* Slide Title */}
            <h2 className="text-4xl sm:text-5xl font-black text-sp-black tracking-tight leading-none uppercase">
              {currentSlide.title}
            </h2>

            {/* Slide Main Paragraph */}
            <p className="text-lg text-gray-700 leading-relaxed font-medium whitespace-pre-line border-l-4 border-sp-blue pl-6 py-1 bg-gray-50">
              {currentSlide.content}
            </p>
          </div>

          {/* Quick Deck Directory */}
          <div className="mt-12 pt-6 border-t-2 border-gray-100 space-y-3">
            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">Deck Directory</h5>
            <div className="flex flex-col gap-1.5">
              {currentCourse.slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIndex(i)}
                  className={`text-left text-xs font-bold uppercase py-2 px-3 border-2 transition-all ${i === slideIndex ? 'bg-sp-blue text-white border-sp-black shadow-[3px_3px_0_0_#000]' : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'}`}
                >
                  {i + 1}. {s.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Simulators / Visual Media Displays */}
        <div className="w-full lg:w-3/5 bg-gray-900 p-6 sm:p-10 flex flex-col items-center justify-center min-h-[400px]">
          
          {/* SIMULATOR TYPE */}
          {currentSlide.visualType === 'simulator' && (
            <div className="w-full h-full max-w-2xl bg-sp-black border-[6px] border-sp-black p-4 shadow-[12px_12px_0_0_#4F46E5] flex flex-col">
              {currentSlide.simId === 'rocket-staging' && <RocketStagingSimulator />}
              {currentSlide.simId === 'cansat-telemetry' && <CanSatTelemetrySimulator />}
              {currentSlide.simId === 'kepler-slingshot' && <KeplerSlingshotSimulator />}
            </div>
          )}

          {/* DIAGRAM TYPE */}
          {currentSlide.visualType === 'diagram' && (
            <div className="w-full max-w-xl aspect-[4/3] bg-sp-black border-[6px] border-sp-black p-6 shadow-[12px_12px_0_0_#0B0F19] flex flex-col justify-center items-center relative overflow-hidden">
              {currentSlide.diagramStyle === 'stability' && <StabilityDiagram />}
              {currentSlide.diagramStyle === 'telemetry' && <TelemetryDiagram />}
              {currentSlide.diagramStyle === 'kepler' && <KeplerDiagram />}
            </div>
          )}

          {/* MEDIA TYPE */}
          {currentSlide.visualType === 'media' && (
            <div className="w-full max-w-2xl bg-sp-black border-[6px] border-sp-black overflow-hidden shadow-[12px_12px_0_0_#4F46E5] flex flex-col">
              <div className="bg-sp-blue px-4 py-2 border-b-2 border-sp-black flex justify-between items-center text-[10px] uppercase font-black tracking-widest text-white">
                <span>Presenter Visual Resource</span>
                <span>{matchedAsset ? matchedAsset.title : 'Overview'}</span>
              </div>
              <div className="aspect-[16/9] bg-gray-800 flex items-center justify-center overflow-hidden">
                {matchedAsset ? (
                  matchedAsset.type === 'video' ? (
                    <video src={matchedAsset.url} className="w-full h-full object-contain" controls autoPlay loop muted />
                  ) : (
                    <img src={matchedAsset.url} alt={matchedAsset.title} className="w-full h-full object-cover" />
                  )
                ) : (
                  <img 
                    src={currentCourse.title.includes("Rocketry") 
                      ? "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200" 
                      : "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1200"} 
                    alt="Overview" 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Slide Navigation Foot Controller */}
      <div className="bg-white border-t-[4px] border-sp-black p-6 flex items-center justify-between z-20 text-sp-black">
        <div className="flex items-center gap-6">
          <button 
            onClick={prevSlide}
            className="flex items-center justify-center w-12 h-12 border-[3px] border-sp-black bg-white hover:bg-gray-100 active:translate-x-0.5 active:translate-y-0.5 transition-all shadow-[3px_3px_0_0_#000]"
            aria-label="Previous Slide"
          >
            <ArrowLeft className="w-6 h-6 stroke-[3]" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="flex items-center gap-2 bg-sp-blue text-white px-6 h-12 border-[3px] border-sp-black hover:bg-sp-black hover:text-white transition-all shadow-[4px_4px_0_0_#000] font-black uppercase tracking-widest text-sm"
          >
            Next Slide <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        <div className="hidden sm:flex text-right flex-col gap-0.5 font-bold uppercase text-[10px] text-gray-500 tracking-wider">
          <span>Control Keys</span>
          <span className="text-sp-black">← Prev  |  Next →  |  Space</span>
        </div>
      </div>

    </div>
  );
};

// ==========================================
// 🚀 INTERACTIVE ROCKET STAGING SIMULATOR
// ==========================================
const RocketStagingSimulator = () => {
  const canvasRef = useRef(null);
  const [fuelWeight, setFuelWeight] = useState(40); // Booster fuel in grams
  const [altitude, setAltitude] = useState(0);
  const [status, setStatus] = useState('Ready'); // Ready, Ignited, Separated, Apogee, Deployed, Landed
  const [maxAltitude, setMaxAltitude] = useState(0);
  const animRef = useRef(null);

  // Simulation physics parameters
  const yRef = useRef(350);       // Y canvas coordinate
  const velRef = useRef(0);       // Vertical speed
  const timeRef = useRef(0);      // Time count
  const stageRef = useRef(1);     // 1=Booster, 2=Sustainer
  const apogeeRef = useRef(0);    // Max altitude reached

  const drawSimulator = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sky Background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    const skyBlue = Math.max(20, 135 - altitude * 0.1);
    const skyDark = Math.max(10, 206 - altitude * 0.15);
    gradient.addColorStop(0, `rgb(${Math.max(5, skyBlue - 40)}, ${Math.max(10, skyBlue - 30)}, ${Math.max(20, skyBlue)})`);
    gradient.addColorStop(1, '#0B0F19');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Launch Pad Ground (only visible at low altitude)
    if (altitude < 200) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 370 - altitude, canvas.width, 30);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(100, 300 - altitude, 10, 80); // Launch rod
    }

    // DRAW ROCKET (Simplified Staging Art)
    const ry = yRef.current;
    const rx = 100;

    ctx.save();
    // Flame and exhaust smoke
    if (status === 'Ignited') {
      // Booster fire
      const fireGrad = ctx.createRadialGradient(rx, ry + 40, 2, rx, ry + 50, 15);
      fireGrad.addColorStop(0, '#facc15');
      fireGrad.addColorStop(0.5, '#f97316');
      fireGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = fireGrad;
      ctx.beginPath();
      ctx.arc(rx, ry + 40, 15 + Math.random() * 5, 0, Math.PI * 2);
      ctx.fill();
    } else if (status === 'Separated') {
      // Sustainer upper stage fire
      const fireGrad = ctx.createRadialGradient(rx, ry + 15, 1, rx, ry + 25, 8);
      fireGrad.addColorStop(0, '#38bdf8');
      fireGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = fireGrad;
      ctx.beginPath();
      ctx.arc(rx, ry + 15, 8 + Math.random() * 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (status === 'Deployed' || status === 'Apogee') {
      // Parachute
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx - 15, ry - 30);
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + 15, ry - 30);
      ctx.stroke();

      ctx.fillStyle = '#f87171';
      ctx.beginPath();
      ctx.arc(rx, ry - 30, 20, Math.PI, 0, false);
      ctx.fill();
    }

    // Rocket Sustainer (Upper Stage) - Red Nosecone + White Body
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(rx - 4, ry - 15, 8, 30); // Body
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(rx - 4, ry - 15);
    ctx.lineTo(rx + 4, ry - 15);
    ctx.lineTo(rx, ry - 28); // Nose cone
    ctx.fill();

    // Booster (Lower Stage) - White + Blue Fins (only draw if not separated)
    if (stageRef.current === 1) {
      ctx.fillStyle = '#4f46e5';
      ctx.fillRect(rx - 5, ry + 15, 10, 25); // Booster body
      // Fins
      ctx.beginPath();
      ctx.moveTo(rx - 5, ry + 30);
      ctx.lineTo(rx - 12, ry + 40);
      ctx.lineTo(rx - 5, ry + 40);
      ctx.moveTo(rx + 5, ry + 30);
      ctx.lineTo(rx + 12, ry + 40);
      ctx.lineTo(rx + 5, ry + 40);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
    } else if (status === 'Separated' || status === 'Apogee' || status === 'Deployed') {
      // Draw falling booster stage drifting away
      const bY = ry + (timeRef.current - 120) * 1.5;
      ctx.fillStyle = 'rgba(79, 70, 229, 0.4)';
      ctx.fillRect(rx + 40, bY, 8, 20);
    }
    ctx.restore();
  };

  const updatePhysics = () => {
    timeRef.current += 1;
    const t = timeRef.current;

    if (stageRef.current === 1) {
      // Booster burn phase (0 - 120 frames, approx 2 seconds)
      if (t < 120) {
        const thrust = 0.45 + (fuelWeight / 100) * 0.3;
        velRef.current += thrust - 0.15; // Accelerating upwards
      } else {
        // Separating stage
        stageRef.current = 2;
        setStatus('Separated');
      }
    }

    if (stageRef.current === 2) {
      // Sustainer burn phase (120 - 180 frames)
      if (t >= 120 && t < 190) {
        velRef.current += 0.22 - 0.12; // Lower thrust upper stage
      } else {
        // Coasting & Gravity deceleration
        velRef.current -= 0.08;
      }
    }

    // Parachute deployment at apogee (when velocity turns negative)
    if (velRef.current <= 0 && status !== 'Apogee' && status !== 'Deployed') {
      setStatus('Apogee');
      apogeeRef.current = Math.round(altitude);
      setMaxAltitude(Math.round(altitude));
      setTimeout(() => setStatus('Deployed'), 800);
    }

    if (status === 'Deployed') {
      // Slow terminal velocity descent
      velRef.current = -1.2;
    }

    // Update coordinates
    yRef.current -= velRef.current * 0.3; // scale movement
    const newAlt = altitude + velRef.current * 1.5;
    
    if (newAlt <= 0) {
      setAltitude(0);
      setStatus('Landed');
      cancelAnimationFrame(animRef.current);
      return;
    }

    setAltitude(Math.round(newAlt));
    drawSimulator();
    animRef.current = requestAnimationFrame(updatePhysics);
  };

  const handleLaunch = () => {
    if (status !== 'Ready' && status !== 'Landed') return;
    
    // Reset simulation parameters
    yRef.current = 340;
    velRef.current = 0;
    timeRef.current = 0;
    stageRef.current = 1;
    setAltitude(0);
    setStatus('Ignited');
    
    setTimeout(() => {
      animRef.current = requestAnimationFrame(updatePhysics);
    }, 200);
  };

  const handleReset = () => {
    cancelAnimationFrame(animRef.current);
    yRef.current = 350;
    velRef.current = 0;
    timeRef.current = 0;
    stageRef.current = 1;
    setAltitude(0);
    setStatus('Ready');
    setTimeout(drawSimulator, 50);
  };

  useEffect(() => {
    drawSimulator();
    return () => cancelAnimationFrame(animRef.current);
  }, [fuelWeight]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 bg-black overflow-hidden relative flex items-center justify-center min-h-[300px] border-2 border-sp-black">
        <canvas ref={canvasRef} width={200} height={400} className="w-[200px] h-full object-cover block bg-indigo-950" />
        
        {/* Real-time stats panel overlay */}
        <div className="absolute top-4 right-4 bg-sp-black/90 p-4 border-2 border-white text-xs space-y-2 text-white font-mono min-w-[140px] shadow-[4px_4px_0_0_#4F46E5]">
          <div className="font-black text-center text-sp-blue border-b border-white/20 pb-1.5 uppercase">Telemetry</div>
          <div>Altitude: <span className="text-yellow-400 font-bold">{altitude} m</span></div>
          <div>Speed: <span className="text-cyan-400 font-bold">{(velRef.current * 10).toFixed(1)} m/s</span></div>
          <div>Stage: <span className="text-green-400 font-bold">{stageRef.current === 1 ? '01 (Booster)' : '02 (Sustainer)'}</span></div>
          <div>Status: <span className="text-orange-400 font-bold uppercase">{status}</span></div>
        </div>

        {status === 'Landed' && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center">
            <span className="bg-green-500 text-white font-black text-[10px] uppercase px-3 py-1 border border-white mb-2">APOGEE REACHED</span>
            <span className="text-3xl font-black text-white">{maxAltitude} m</span>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mt-1">Maximum Altitude achieved</span>
          </div>
        )}
      </div>

      {/* Control panel */}
      <div className="mt-4 p-4 bg-gray-900 border-2 border-sp-black flex flex-col md:flex-row gap-4 items-center justify-between text-xs">
        <div className="w-full md:w-auto flex-1 space-y-1">
          <div className="flex justify-between font-bold">
            <span className="uppercase text-gray-400 tracking-wider">Booster Propellant Weight</span>
            <span className="text-sp-blue font-black">{fuelWeight} g</span>
          </div>
          <input 
            type="range" 
            min="20" 
            max="100" 
            value={fuelWeight} 
            onChange={(e) => setFuelWeight(parseInt(e.target.value))}
            disabled={status !== 'Ready' && status !== 'Landed'}
            className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-sp-blue"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto justify-end">
          <button 
            onClick={handleLaunch}
            disabled={status !== 'Ready' && status !== 'Landed'}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-sp-blue text-white px-5 py-3 border-2 border-sp-black hover:bg-white hover:text-black font-black uppercase tracking-wider shadow-[2px_2px_0_0_#000] disabled:bg-gray-800 disabled:text-gray-600 disabled:shadow-none"
          >
            Launch Rocket
          </button>
          <button 
            onClick={handleReset}
            className="flex items-center justify-center bg-white text-sp-black p-3 border-2 border-sp-black hover:bg-red-50 hover:text-red-700 transition-colors shadow-[2px_2px_0_0_#000]"
            aria-label="Reset simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 📊 INTERACTIVE CANSAT TELEMETRY PLOTTER
// ==========================================
const CanSatTelemetrySimulator = () => {
  const [isLive, setIsLive] = useState(false);
  const [dataPoints, setDataPoints] = useState([]);
  const [activeTab, setActiveTab] = useState('altitude'); // altitude, temp, press
  const timerRef = useRef(null);

  // Parameters for mock generator
  const timeRef = useRef(0);
  const altRef = useRef(100);
  const tempRef = useRef(25.5);
  const pressRef = useRef(1013);

  const generateData = () => {
    timeRef.current += 1;
    
    // Simulate drop descent physics
    if (timeRef.current < 5) {
      altRef.current = 100 + Math.random() * 2; // Hanging in payload
    } else if (altRef.current > 5) {
      altRef.current -= 4.2 + Math.random() * 0.8; // descending by parachute
      tempRef.current += 0.08 + Math.random() * 0.04; // warming up closer to ground
      pressRef.current += 1.8 + Math.random() * 0.5; // air pressure rising
    } else {
      altRef.current = 0; // landed
    }

    const newPt = {
      time: timeRef.current,
      altitude: Math.max(0, altRef.current),
      temperature: tempRef.current,
      pressure: pressRef.current
    };

    setDataPoints(prev => {
      const next = [...prev, newPt];
      if (next.length > 15) next.shift(); // keep sliding window of 15 seconds
      return next;
    });
  };

  const handleToggle = () => {
    if (isLive) {
      clearInterval(timerRef.current);
      setIsLive(false);
    } else {
      // Clear old points
      setDataPoints([]);
      timeRef.current = 0;
      altRef.current = 100;
      tempRef.current = 22.0;
      pressRef.current = 980;
      setIsLive(true);
      timerRef.current = setInterval(generateData, 1000);
    }
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, [isLive]);

  // SVG dimensions for chart drawing
  const width = 500;
  const height = 220;
  const padding = 35;

  const getPointsStr = () => {
    if (dataPoints.length === 0) return '';
    
    const minVal = activeTab === 'altitude' ? 0 : activeTab === 'temperature' ? 20 : 970;
    const maxVal = activeTab === 'altitude' ? 110 : activeTab === 'temperature' ? 30 : 1025;

    return dataPoints.map((pt, i) => {
      const x = padding + (i / 14) * (width - padding * 2);
      const val = pt[activeTab];
      const y = height - padding - ((val - minVal) / (maxVal - minVal)) * (height - padding * 2);
      return `${x},${y}`;
    }).join(' ');
  };

  const currentVal = dataPoints[dataPoints.length - 1];

  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* Live Chart Canvas */}
      <div className="flex-1 bg-black p-4 border-2 border-sp-black relative min-h-[250px] flex flex-col justify-between">
        
        {/* Status header */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`} />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-400">
              {isLive ? 'STREAMING TELEMETRY (1HZ)' : 'DISCONNECTED'}
            </span>
          </div>
          <div className="flex gap-1.5">
            {['altitude', 'temperature', 'pressure'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider border transition-all ${activeTab === tab ? 'bg-sp-blue text-white border-sp-black' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/45'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Live plot */}
        <div className="flex-1 relative flex items-center justify-center">
          {dataPoints.length === 0 ? (
            <div className="text-center font-mono text-xs text-gray-500 uppercase tracking-widest p-12">
              No Incoming packets. Toggle Receiver Switch.
            </div>
          ) : (
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full block">
              {/* Grid Lines */}
              <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(255,255,255,0.05)" />
              <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="rgba(255,255,255,0.05)" />
              <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.2)" />
              <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="rgba(255,255,255,0.2)" />

              {/* Data Polyline */}
              <polyline
                fill="none"
                stroke={activeTab === 'altitude' ? '#facc15' : activeTab === 'temperature' ? '#f87171' : '#38bdf8'}
                strokeWidth="3.5"
                points={getPointsStr()}
              />

              {/* Data points */}
              {dataPoints.map((pt, i) => {
                const x = padding + (i / 14) * (width - padding * 2);
                const val = pt[activeTab];
                const minVal = activeTab === 'altitude' ? 0 : activeTab === 'temperature' ? 20 : 970;
                const maxVal = activeTab === 'altitude' ? 110 : activeTab === 'temperature' ? 30 : 1025;
                const y = height - padding - ((val - minVal) / (maxVal - minVal)) * (height - padding * 2);
                return (
                  <circle 
                    key={i} 
                    cx={x} 
                    cy={y} 
                    r="4" 
                    fill="#ffffff" 
                    stroke={activeTab === 'altitude' ? '#eab308' : activeTab === 'temperature' ? '#ef4444' : '#0ea5e9'}
                    strokeWidth="2" 
                  />
                );
              })}
            </svg>
          )}
        </div>

        {/* Live numerical boxes */}
        {currentVal && (
          <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-3 text-[10px] font-mono text-center mt-2">
            <div className="p-2 border border-yellow-500/20 bg-yellow-500/5">
              <span className="text-gray-400 block uppercase mb-0.5">Alt (GPS)</span>
              <strong className="text-yellow-400 text-sm">{currentVal.altitude.toFixed(1)} m</strong>
            </div>
            <div className="p-2 border border-red-500/20 bg-red-500/5">
              <span className="text-gray-400 block uppercase mb-0.5">Temp (BMP)</span>
              <strong className="text-red-400 text-sm">{currentVal.temperature.toFixed(1)} °C</strong>
            </div>
            <div className="p-2 border border-sky-500/20 bg-sky-500/5">
              <span className="text-gray-400 block uppercase mb-0.5">Pressure</span>
              <strong className="text-sky-400 text-sm">{currentVal.pressure.toFixed(0)} hPa</strong>
            </div>
          </div>
        )}
      </div>

      {/* Control Switch */}
      <div className="mt-4 p-4 bg-gray-900 border-2 border-sp-black flex justify-between items-center text-xs">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-sp-blue animate-pulse" />
          <div>
            <div className="font-bold text-white uppercase">APC220 Receiver Ground Terminal</div>
            <div className="text-[10px] text-gray-500">Frequency Lock: 433.5MHz | Subsystems OK</div>
          </div>
        </div>
        <button
          onClick={handleToggle}
          className={`px-5 py-3 border-2 border-sp-black font-black uppercase tracking-wider shadow-[2px_2px_0_0_#000] transition-colors ${isLive ? 'bg-red-600 text-white hover:bg-red-700 shadow-none translate-x-[2px] translate-y-[2px]' : 'bg-white text-sp-black hover:bg-sp-blue hover:text-white'}`}
        >
          {isLive ? 'Disconnect' : 'Connect Receiver'}
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 🌌 INTERACTIVE KEPLER SLINGSHOT SIMULATOR
// ==========================================
const KeplerSlingshotSimulator = () => {
  const canvasRef = useRef(null);
  const [speed, setSpeed] = useState(0);
  const [simState, setSimState] = useState('Ready'); // Ready, Launching, Swing, Hyperbolic, Reset
  const animRef = useRef(null);

  const cxRef = useRef(50);     // Craft X
  const cyRef = useRef(150);    // Craft Y
  const vxRef = useRef(3.5);    // Craft vel X
  const vyRef = useRef(0);      // Craft vel Y
  const px = 200;               // Planet X
  const py = 200;               // Planet Y
  const GM = 600;               // Planet gravity multiplier

  const drawSlingshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Deep Space Background
    ctx.fillStyle = '#060814';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Orbit Guides (Slightly transparent hyperbola trajectory template)
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(px, py, 90, 0, Math.PI * 2);
    ctx.stroke();

    // DRAW HEAVY PLANET (Earth)
    ctx.save();
    const grad = ctx.createRadialGradient(px, py, 10, px, py, 45);
    grad.addColorStop(0, '#38bdf8');
    grad.addColorStop(0.6, '#1d4ed8');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px, py, 45, 0, Math.PI * 2);
    ctx.fill();

    // Planet core border
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(px, py, 25, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // DRAW SPACECRAFT (Orange Triangle)
    const cx = cxRef.current;
    const cy = cyRef.current;

    ctx.save();
    ctx.translate(cx, cy);
    const angle = Math.atan2(vyRef.current, vxRef.current);
    ctx.rotate(angle);

    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(-6, -5);
    ctx.lineTo(-6, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Draw velocity vector arrow
    if (simState === 'Swing' || simState === 'Launching') {
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + vxRef.current * 8, cy + vyRef.current * 8);
      ctx.stroke();
    }
  };

  const updateOrbits = () => {
    // Gravity physics calculation
    const dx = px - cxRef.current;
    const dy = py - cyRef.current;
    const distSq = dx * dx + dy * dy;
    const dist = Math.sqrt(distSq);

    if (dist < 30) {
      setSimState('Crash');
      cancelAnimationFrame(animRef.current);
      return;
    }

    if (dist < 180) {
      // Apply gravity force pull
      const force = GM / distSq;
      const ax = (force * dx) / dist;
      const ay = (force * dy) / dist;
      vxRef.current += ax;
      vyRef.current += ay;
      
      if (dist < 80 && simState !== 'Swing') {
        setSimState('Swing');
      }
    }

    // Update coordinates
    cxRef.current += vxRef.current;
    cyRef.current += vyRef.current;

    const currentSpeed = Math.sqrt(vxRef.current * vxRef.current + vyRef.current * vyRef.current);
    setSpeed(currentSpeed * 11.2); // scale factor to display mock km/s

    drawSlingshot();

    // Check boundary
    if (cxRef.current > 420 || cyRef.current > 420 || cxRef.current < -20 || cyRef.current < -20) {
      setSimState('Hyperbolic');
      cancelAnimationFrame(animRef.current);
      return;
    }

    animRef.current = requestAnimationFrame(updateOrbits);
  };

  const handleLaunch = () => {
    if (simState !== 'Ready' && simState !== 'Hyperbolic' && simState !== 'Crash') return;
    
    // Reset parameters
    cxRef.current = 40;
    cyRef.current = 130;
    vxRef.current = 3.6;
    vyRef.current = 0.5;
    setSpeed(0);
    setSimState('Launching');
    
    setTimeout(() => {
      animRef.current = requestAnimationFrame(updateOrbits);
    }, 200);
  };

  const handleReset = () => {
    cancelAnimationFrame(animRef.current);
    cxRef.current = 50;
    cyRef.current = 130;
    vxRef.current = 3.5;
    vyRef.current = 0;
    setSpeed(0);
    setSimState('Ready');
    setTimeout(drawSlingshot, 50);
  };

  useEffect(() => {
    drawSlingshot();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 bg-black overflow-hidden relative flex items-center justify-center min-h-[300px] border-2 border-sp-black">
        <canvas ref={canvasRef} width={400} height={400} className="w-full h-full max-w-[400px] aspect-square block bg-slate-950" />

        {/* Orbital HUD Stats */}
        <div className="absolute top-4 right-4 bg-sp-black/90 p-4 border-2 border-white text-xs space-y-2 text-white font-mono min-w-[140px] shadow-[4px_4px_0_0_#4F46E5]">
          <div className="font-black text-center text-sp-blue border-b border-white/20 pb-1.5 uppercase">HUD Orbits</div>
          <div>Speed: <span className="text-yellow-400 font-bold">{speed.toFixed(1)} km/s</span></div>
          <div>Trajectory: <span className="text-cyan-400 font-bold">{simState === 'Swing' ? 'HYPERBOLIC GAIN' : 'INBOUND'}</span></div>
          <div>State: <span className="text-orange-400 font-bold uppercase">{simState}</span></div>
        </div>

        {simState === 'Hyperbolic' && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center">
            <span className="bg-sp-blue text-white font-black text-[10px] uppercase px-3 py-1 border border-white mb-2">GRAVITY SLINGSHOT SUCCESS</span>
            <span className="text-3xl font-black text-white">Velocity Gained</span>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mt-1">Satellite accelerated out of Keplerian orbit</span>
          </div>
        )}
      </div>

      {/* Controller Buttons */}
      <div className="mt-4 p-4 bg-gray-900 border-2 border-sp-black flex justify-between items-center text-xs">
        <div>
          <div className="font-bold text-white uppercase">Kepler slingshot tool</div>
          <div className="text-[10px] text-gray-500">Planet Mass (M): 6.0E24 kg</div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleLaunch}
            disabled={simState === 'Launching' || simState === 'Swing'}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-sp-blue text-white px-5 py-3 border-2 border-sp-black hover:bg-white hover:text-black font-black uppercase tracking-wider shadow-[2px_2px_0_0_#000] disabled:bg-gray-800 disabled:text-gray-600 disabled:shadow-none"
          >
            Launch Spacecraft
          </button>
          <button 
            onClick={handleReset}
            className="flex items-center justify-center bg-white text-sp-black p-3 border-2 border-sp-black hover:bg-red-50 hover:text-red-700 transition-colors shadow-[2px_2px_0_0_#000]"
            aria-label="Reset simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 🎨 STATIC COURSE DIAGRAM PLACEHOLDERS
// ==========================================
const StabilityDiagram = () => (
  <div className="flex flex-col items-center gap-4 text-center">
    <div className="flex items-center justify-center gap-12 bg-white/5 p-6 border-2 border-dashed border-white/20">
      <div className="flex flex-col items-center gap-1">
        <div className="w-6 h-6 rounded-full bg-red-500 border border-white font-mono text-[10px] flex items-center justify-center text-white">CG</div>
        <span className="text-[10px] text-gray-400 font-bold uppercase">Center of Gravity</span>
      </div>
      <div className="h-0.5 w-16 bg-white/20 border-t border-dashed" />
      <div className="flex flex-col items-center gap-1">
        <div className="w-6 h-6 rounded-full bg-sp-blue border border-white font-mono text-[10px] flex items-center justify-center text-white">CP</div>
        <span className="text-[10px] text-gray-400 font-bold uppercase">Center of Pressure</span>
      </div>
    </div>
    <span className="text-yellow-400 text-xs font-black uppercase mt-4">RULE: CG MUST BE IN FRONT OF CP</span>
    <span className="text-[10px] text-gray-400 max-w-sm mt-1">This separation guarantees aerodynamic restoring torque to keep the nosecone pointed forward in flight.</span>
  </div>
);

const TelemetryDiagram = () => (
  <div className="flex flex-col items-center gap-3 text-center">
    <div className="flex gap-4">
      <div className="p-4 bg-sp-blue border border-white font-bold text-xs uppercase shadow-[3px_3px_0_0_#fff]">
        Sensors
        <span className="block text-[8px] text-gray-300 font-medium lowercase">temp, baro, gps</span>
      </div>
      <span className="flex items-center text-yellow-400 text-xl font-bold">➔</span>
      <div className="p-4 bg-sp-black border border-white font-bold text-xs uppercase shadow-[3px_3px_0_0_#fff]">
        RF Transmit
        <span className="block text-[8px] text-gray-300 font-medium">APC220 433MHz</span>
      </div>
      <span className="flex items-center text-yellow-400 text-xl font-bold">➔</span>
      <div className="p-4 bg-white text-sp-black border border-sp-black font-bold text-xs uppercase shadow-[3px_3px_0_0_#4F46E5]">
        Ground Station
        <span className="block text-[8px] text-gray-600 font-medium">Telemetry Hub</span>
      </div>
    </div>
    <span className="text-[10px] text-gray-400 max-w-sm mt-6">Packet format example:<br/><code className="bg-black/50 p-1 font-mono text-yellow-400 text-[9px] border border-white/10 block mt-1">$$ANTR,PKT_102,T+12.4s,A:84.2m,T:24.2C,P:1003hPa*FF</code></span>
  </div>
);

const KeplerDiagram = () => (
  <div className="flex flex-col items-center gap-4 text-center">
    <div className="w-48 h-32 rounded-full border-2 border-white/20 relative flex items-center justify-center">
      {/* Sun Focus */}
      <div className="w-6 h-6 rounded-full bg-yellow-400 absolute left-[30px]" />
      {/* Planet */}
      <div className="w-3 h-3 rounded-full bg-sky-400 absolute right-2 animate-pulse" />
      <span className="text-[8px] font-bold absolute left-[20px] top-6 text-gray-400">FOCUS 1 (Sun)</span>
      <span className="text-[8px] font-bold absolute right-[10px] top-20 text-gray-400">FOCUS 2 (Empty)</span>
    </div>
    <span className="text-yellow-400 text-xs font-black uppercase mt-4">KEPLER'S FIRST LAW: ELLIPTICAL ORBITS</span>
    <span className="text-[10px] text-gray-400 max-w-sm mt-1">All planets move in elliptical orbits around the Sun, which sits at one focus of the ellipse.</span>
  </div>
);

export default Presentation;
