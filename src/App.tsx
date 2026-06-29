import React, { useState, useMemo } from "react";
import Starfield from "./components/Starfield";
import { 
  Mail, 
  ArrowUpRight, 
  Monitor, 
  Smartphone, 
  Cpu, 
  Sun, 
  Moon, 
  Check, 
  Copy,
  Sparkles,
  Layers,
  HelpCircle
} from "lucide-react";

export default function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const emailAddress = "cleverlyproduction@gmail.com";

  // Official logo resources from user's GitHub repository
  const logoUrl = "https://naijasmartshop.github.io/CP-LOGO/CP%20LOGO.png";
  const darkThemeVisualUrl = "https://naijasmartshop.github.io/CP-LOGO/CLEV%20PRODUCTIONS%20NIGHT%20TIME.png";

  // Direct link to Gmail Web Client compose layout as explicitly requested
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=Project%20Request%20-%20CLEV%20PRODUCTIONS&body=Hello%20CLEV%20PRODUCTIONS%20Team%2C%0A%0AI%20am%20interested%20in%20discussing%20a%20project%20with%20you.%0A%0APlease%20let%20me%20know%20how%20we%20can%20get%20started.%0A%0ABest%20regards%2C`;

  const handleContactClick = () => {
    // Open Google Mail Web Client straight through Gmail in a new tab
    window.open(gmailComposeUrl, "_blank");
  };

  const copyEmailToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  // Generate 200 independent particles to satisfy "add as many animations as you can like 200 animations"
  // These will render as floating celestial particles/stars with randomized timing and speeds
  const backgroundParticles = useMemo(() => {
    return Array.from({ length: 200 }, (_, i) => {
      const size = Math.random() * 2.2 + 0.6; // random sizing
      const left = Math.random() * 100; // X axis percentage
      const top = Math.random() * 100; // Y axis percentage
      const duration = Math.random() * 25 + 10; // floating speed
      const delay = Math.random() * -20; // negative delay to prevent sudden pop-ins
      const opacity = Math.random() * 0.45 + 0.15; // randomized alpha
      const pulseSpeed = Math.random() * 4 + 2; // twinkle rate
      return { id: i, size, left, top, duration, delay, opacity, pulseSpeed };
    });
  }, []);

  return (
    <div className={`min-h-screen font-sans flex flex-col antialiased relative overflow-hidden transition-colors duration-700 ${
      isLightTheme 
        ? "bg-white text-black selection:bg-black selection:text-white" 
        : "bg-black text-white selection:bg-white selection:text-black"
    }`}>
      
      {/* Canvas Starfield Cosmos Backdrop (Twinkling starry background) */}
      <Starfield isLightTheme={isLightTheme} />

      {/* 200 Animations Star / Particle System for true spatial density */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {backgroundParticles.map((pt) => (
          <div
            key={pt.id}
            className={`absolute rounded-full pointer-events-none ${
              isLightTheme ? "bg-zinc-800" : "bg-white"
            }`}
            style={{
              width: `${pt.size}px`,
              height: `${pt.size}px`,
              left: `${pt.left}%`,
              top: `${pt.top}%`,
              opacity: pt.opacity,
              animation: `driftUp ${pt.duration}s linear infinite, starPulse ${pt.pulseSpeed}s ease-in-out infinite`,
              animationDelay: `${pt.delay}s`,
            }}
          />
        ))}
      </div>

      {/* HEADER - No font weight discrepancies, clean logo representation */}
      <header className={`w-full sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-500 ${
        isLightTheme ? "border-zinc-200 bg-white/90" : "border-zinc-900 bg-black/90"
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          
          {/* Logo Brand with Identical Font Weights for CLEV and PRODUCTIONS */}
          <div className="flex items-center gap-3">
            <div className={`p-1 border rounded transition-all duration-500 shrink-0 ${
              isLightTheme ? "border-zinc-200 bg-zinc-50" : "border-zinc-800 bg-zinc-950"
            }`}>
              <img 
                src={logoUrl} 
                alt="CLEV LOGO" 
                className="h-8 w-8 object-contain"
                onError={(e) => {
                  // Fallback visual in case of any loading delay
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className={`font-sans font-black tracking-widest text-lg sm:text-xl uppercase italic transition-colors duration-500 ${
                isLightTheme ? "text-black" : "text-white"
              }`}>
                CLEV PRODUCTIONS<span className="text-[10px] not-italic align-super ml-0.5">™</span>
              </span>
            </div>
          </div>

          {/* Controls: Theme Swapper & Direct Gmail Action */}
          <div className="flex items-center gap-3">
            
            {/* Theme Toggle Switcher Button */}
            <button
              onClick={() => setIsLightTheme(!isLightTheme)}
              className={`p-2 rounded border transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer ${
                isLightTheme 
                  ? "border-zinc-300 bg-zinc-100 text-black hover:bg-zinc-200" 
                  : "border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800"
              }`}
              title={isLightTheme ? "Switch to Night Mode" : "Switch to Light Mode"}
              aria-label="Toggle Theme"
              id="theme-toggle-btn"
            >
              {isLightTheme ? (
                <Moon className="w-4 h-4 text-zinc-900 animate-pulse" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
              )}
            </button>

            {/* Direct Gmail Action Button */}
            <button
              onClick={handleContactClick}
              className={`px-4 py-2 font-black text-xs tracking-widest uppercase rounded border transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-lg hover:scale-105 active:scale-95 ${
                isLightTheme
                  ? "bg-black text-white border-black hover:bg-zinc-800"
                  : "bg-white text-black border-white hover:bg-black hover:text-white"
              }`}
              id="header-contact-btn"
            >
              CONTACT US <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

          </div>

        </div>
      </header>

      {/* CORE DISPLAY CONTAINER */}
      <main className="flex-1 flex flex-col">
        
        {/* HERO BLOCK - Incorporating original cpnight.html theme and company logos directly */}
        <section className={`w-full py-16 md:py-24 border-b flex flex-col items-center justify-center text-center px-4 transition-all duration-500 ${
          isLightTheme 
            ? "border-zinc-200 bg-zinc-50/40" 
            : "border-zinc-950 bg-gradient-to-b from-black via-zinc-950 to-black"
        }`}>
          <div className="max-w-4xl w-full flex flex-col items-center animate-fade-in">
            
            {/* Display user's night-time brand artwork or logo depending on the theme */}
            <div className="mb-8 relative max-w-full">
              {!isLightTheme ? (
                // In dark mode: Show the beautiful raw "CLEV PRODUCTIONS NIGHT TIME.png" layout directly as requested
                <div className="relative group transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity pointer-events-none" />
                  <img 
                    src={darkThemeVisualUrl} 
                    alt="CLEV PRODUCTIONS Night Theme" 
                    className="max-w-[320px] sm:max-w-[480px] h-auto object-contain rounded-xl border border-zinc-900 shadow-2xl"
                  />
                </div>
              ) : (
                // In light mode: Show the core pristine "CP LOGO.png" centered elegantly
                <div className="p-6 border border-zinc-200 bg-white shadow-xl shadow-zinc-100 rounded-2xl group transition-all duration-500 hover:scale-105 inline-block">
                  <img 
                    src={logoUrl} 
                    alt="CP LOGO" 
                    className="h-28 w-auto object-contain"
                  />
                </div>
              )}
            </div>

            {/* Typography brand matching the reference with NO bold discrepancies */}
            <h1 className={`font-sans font-black tracking-widest text-4xl sm:text-6xl md:text-7xl italic uppercase leading-none transition-colors duration-500 ${
              isLightTheme ? "text-black" : "text-white"
            }`}>
              CLEV PRODUCTIONS
            </h1>

            {/* Custom double-line breaks modeled directly after cpnight.html specs */}
            <div className="flex flex-col items-center mt-6 w-full">
              {/* Line 1: Width 200px, 1.5px thick */}
              <div 
                className={`h-[1.5px] w-[200px] transition-colors duration-500 ${isLightTheme ? "bg-black" : "bg-white"}`} 
                style={{ marginTop: "15px" }}
              />
              {/* Line 2: Width 100px, 1.5px thick */}
              <div 
                className={`h-[1.5px] w-[100px] transition-colors duration-500 ${isLightTheme ? "bg-black" : "bg-white"}`} 
                style={{ marginTop: "5px" }}
              />
            </div>

            {/* Simple Descriptive Slogan */}
            <p className={`mt-8 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase transition-colors duration-500 ${
              isLightTheme ? "text-zinc-600" : "text-zinc-400"
            }`}>
              AI Chatbots • Responsive Websites • Custom Interactive Games
            </p>

            {/* Action panel triggers */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md px-4">
              
              <button
                onClick={handleContactClick}
                className={`w-full sm:w-auto px-8 py-4 font-black text-xs tracking-widest uppercase rounded transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95 cursor-pointer ${
                  isLightTheme
                    ? "bg-black text-white hover:bg-zinc-800"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
                id="hero-primary-contact"
              >
                CONTACT US <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={copyEmailToClipboard}
                className={`w-full sm:w-auto px-6 py-4 font-mono text-xs tracking-wider uppercase rounded border transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 cursor-pointer ${
                  isLightTheme
                    ? "border-zinc-300 bg-white text-zinc-800 hover:border-black hover:text-black"
                    : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-500 hover:text-white"
                }`}
                id="hero-copy-email"
              >
                {showCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" /> COPIED!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 opacity-60" /> {emailAddress}
                  </>
                )}
              </button>

            </div>

            <p className="text-[9px] font-mono opacity-50 mt-4 uppercase tracking-widest">
              *Taps straight to Gmail Web Compose. Opens automatically.
            </p>

          </div>
        </section>

        {/* CONTINUOUS ROLLING SERVICES TICKER */}
        <div className={`w-full py-3 overflow-hidden border-b transition-colors duration-500 font-mono text-[10px] sm:text-xs uppercase tracking-widest ${
          isLightTheme ? "bg-zinc-200/40 border-zinc-300 text-zinc-800" : "bg-zinc-950/40 border-zinc-900 text-zinc-400"
        }`}>
          <div className="flex whitespace-nowrap animate-marquee">
            {Array.from({ length: 4 }).map((_, idx) => (
              <span key={idx} className="inline-block px-4">
                • CLEV PRODUCTIONS • AUTONOMOUS AI CHATBOTS • HIGH-END PREMIUM WEBSITES • CUSTOM Arcade GAMES • ZERO LATENCY DEPLOYMENT •
              </span>
            ))}
          </div>
        </div>

        {/* "WHAT WE DO" DIVISION SECTION */}
        <section className="w-full py-16 md:py-24 px-4" id="what-we-do-section">
          <div className="max-w-5xl mx-auto">
            
            {/* Minimalist Section Header */}
            <div className={`flex flex-col md:flex-row md:items-baseline justify-between border-b pb-6 mb-12 transition-colors duration-500 ${
              isLightTheme ? "border-zinc-200" : "border-zinc-800"
            }`}>
              <div>
                <span className="font-mono text-xs tracking-[0.3em] text-zinc-500 uppercase">OUR DIVISION</span>
                <h3 className="font-sans font-black text-3xl uppercase tracking-tight mt-1">
                  WHAT WE DO
                </h3>
              </div>
              <p className={`text-xs font-mono mt-2 md:mt-0 uppercase transition-colors duration-500 ${
                isLightTheme ? "text-zinc-600" : "text-zinc-400"
              }`}>
                Tailored solutions engineered on custom parameters
              </p>
            </div>

            {/* Division Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* SPECIALTY 01: AI Chat Bots */}
              <div className={`border p-8 rounded-2xl flex flex-col justify-between transition-all duration-500 group hover:-translate-y-2 ${
                isLightTheme 
                  ? "border-zinc-200 bg-white shadow-lg hover:border-black" 
                  : "border-zinc-900 bg-zinc-950/40 hover:border-zinc-600 shadow-2xl"
              }`}>
                <div className="space-y-4">
                  <div className={`w-11 h-11 border flex items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-115 ${
                    isLightTheme ? "border-zinc-200 bg-zinc-50" : "border-zinc-800 bg-black"
                  }`}>
                    <Cpu className={`w-5 h-5 ${isLightTheme ? "text-black" : "text-white"}`} />
                  </div>
                  
                  <h4 className="font-sans font-extrabold text-xl uppercase tracking-wider">
                    AI Chat Bot Making
                  </h4>
                  
                  <p className={`text-xs leading-relaxed font-sans transition-colors duration-500 ${
                    isLightTheme ? "text-zinc-600" : "text-zinc-400"
                  }`}>
                    We specialize in programming elite autonomous conversation agents. Custom-tailored with advanced capabilities built straight into the UI layout:
                  </p>
                  
                  <ul className="space-y-2.5 pt-2">
                    <li className="flex items-center gap-2.5 text-xs font-mono">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isLightTheme ? "bg-black" : "bg-white"}`} />
                      FILE UPLOAD HANDLING
                    </li>
                    <li className="flex items-center gap-2.5 text-xs font-mono">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isLightTheme ? "bg-black" : "bg-white"}`} />
                      VOICE NOTES CAPABILITY
                    </li>
                    <li className="flex items-center gap-2.5 text-xs font-mono">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isLightTheme ? "bg-black" : "bg-white"}`} />
                      TEXT-TO-IMAGE GENERATION
                    </li>
                  </ul>
                </div>
              </div>

              {/* SPECIALTY 02: Website Making */}
              <div className={`border p-8 rounded-2xl flex flex-col justify-between transition-all duration-500 group hover:-translate-y-2 ${
                isLightTheme 
                  ? "border-zinc-200 bg-white shadow-lg hover:border-black" 
                  : "border-zinc-900 bg-zinc-950/40 hover:border-zinc-600 shadow-2xl"
              }`}>
                <div className="space-y-4">
                  <div className={`w-11 h-11 border flex items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-115 ${
                    isLightTheme ? "border-zinc-200 bg-zinc-50" : "border-zinc-800 bg-black"
                  }`}>
                    <Monitor className={`w-5 h-5 ${isLightTheme ? "text-black" : "text-white"}`} />
                  </div>
                  
                  <h4 className="font-sans font-extrabold text-xl uppercase tracking-wider">
                    Website Making
                  </h4>
                  
                  <p className={`text-xs leading-relaxed font-sans transition-colors duration-500 ${
                    isLightTheme ? "text-zinc-600" : "text-zinc-400"
                  }`}>
                    Stunning digital profiles custom engineered for extreme loading speeds and aesthetic precision. Our codebases are designed mobile-first so they render seamlessly on all phones and screens:
                  </p>
                  
                  <ul className="space-y-2.5 pt-2">
                    <li className="flex items-center gap-2.5 text-xs font-mono">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isLightTheme ? "bg-black" : "bg-white"}`} />
                      FULLY RESPONSIVE VIEWPORTS
                    </li>
                    <li className="flex items-center gap-2.5 text-xs font-mono">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isLightTheme ? "bg-black" : "bg-white"}`} />
                      BLACK & WHITE DESIGN ACCENTS
                    </li>
                    <li className="flex items-center gap-2.5 text-xs font-mono">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isLightTheme ? "bg-black" : "bg-white"}`} />
                      HIGH RANKING SEO FOUNDATIONS
                    </li>
                  </ul>
                </div>
              </div>

              {/* SPECIALTY 03: Custom Game Making */}
              <div className={`border p-8 rounded-2xl flex flex-col justify-between transition-all duration-500 group hover:-translate-y-2 ${
                isLightTheme 
                  ? "border-zinc-200 bg-white shadow-lg hover:border-black" 
                  : "border-zinc-900 bg-zinc-950/40 hover:border-zinc-600 shadow-2xl"
              }`}>
                <div className="space-y-4">
                  <div className={`w-11 h-11 border flex items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-115 ${
                    isLightTheme ? "border-zinc-200 bg-zinc-50" : "border-zinc-800 bg-black"
                  }`}>
                    <Smartphone className={`w-5 h-5 ${isLightTheme ? "text-black" : "text-white"}`} />
                  </div>
                  
                  <h4 className="font-sans font-extrabold text-xl uppercase tracking-wider">
                    Game Making
                  </h4>
                  
                  <p className={`text-xs leading-relaxed font-sans transition-colors duration-500 ${
                    isLightTheme ? "text-zinc-600" : "text-zinc-400"
                  }`}>
                    "Depending on your choice, because we can't make all games." Tell us your concept, and we will translate it into a bespoke browser game designed with lightweight scripts:
                  </p>
                  
                  <ul className="space-y-2.5 pt-2">
                    <li className="flex items-center gap-2.5 text-xs font-mono">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isLightTheme ? "bg-black" : "bg-white"}`} />
                      RETRO 2D GRID PROTOCOLS
                    </li>
                    <li className="flex items-center gap-2.5 text-xs font-mono">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isLightTheme ? "bg-black" : "bg-white"}`} />
                      MOBILE ACCELERATOR DPADS
                    </li>
                    <li className="flex items-center gap-2.5 text-xs font-mono">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isLightTheme ? "bg-black" : "bg-white"}`} />
                      STABLE HIGH SCORE SAVES
                    </li>
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* BOTTOM CALL-TO-ACTION - TAKING YOU STRAIGHT TO GMAIL */}
        <section className={`w-full py-20 border-t transition-all duration-500 text-center px-4 relative ${
          isLightTheme ? "border-zinc-200 bg-zinc-100/60" : "border-zinc-900 bg-zinc-950"
        }`}>
          {/* Subtle spinning decorative ring */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none opacity-5">
            <div className="w-[400px] h-[400px] rounded-full border border-current animate-spin" style={{ animationDuration: '40s' }} />
          </div>

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="font-mono text-xs tracking-[0.3em] text-zinc-500 uppercase">DIRECT DISPATCH</span>
            <h3 className="font-sans font-black text-3xl uppercase tracking-widest">
              KICKSTART YOUR DEVELOPMENT
            </h3>
            <p className={`text-xs md:text-sm leading-relaxed max-w-lg mx-auto transition-colors duration-500 ${
              isLightTheme ? "text-zinc-600" : "text-zinc-400"
            }`}>
              Ready to construct custom bots, responsive websites, or interactive games? Tap below to send us a direct email on Gmail. We respond instantly.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center max-w-sm mx-auto">
              
              <button
                onClick={handleContactClick}
                className={`w-full sm:w-auto px-8 py-4 font-black text-xs tracking-widest uppercase rounded transition-all duration-500 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer border ${
                  isLightTheme
                    ? "bg-black text-white border-black hover:bg-zinc-800"
                    : "bg-white text-black border-white hover:bg-zinc-200"
                }`}
                id="footer-primary-contact"
              >
                CONTACT US NOW
              </button>

            </div>

            <p className="text-[10px] font-mono text-zinc-500 mt-2 uppercase tracking-wide">
              DIRECT INBOX: {emailAddress}
            </p>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className={`w-full border-t py-8 px-4 md:px-8 transition-colors duration-500 ${
        isLightTheme ? "border-zinc-200 bg-white" : "border-zinc-900 bg-black"
      }`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-[10px] text-zinc-500 font-mono tracking-wider">
            &copy; {new Date().getFullYear()} CLEV PRODUCTIONS™. ALL RIGHTS RESERVED.
          </div>
          <div className="text-[10px] text-zinc-500 font-mono tracking-wider">
            PREMIUM DESIGN • 200+ ACTIVE ANIMATIONS
          </div>
        </div>
      </footer>

    </div>
  );
}
