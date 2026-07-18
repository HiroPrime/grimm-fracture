"use client";
import { useState, useEffect } from 'react';
import { Menu, ChevronRight, Target, ArrowDown, X, Map, Skull, Users, Feather, Flame } from "lucide-react";

export default function GrimmFracture() {
  const [showLeap1, setShowLeap1] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  
  // Newsletter State
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Lock background scrolling when modals are open
  useEffect(() => {
    if (showLeap1 || zoomedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [showLeap1, zoomedImage]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Could not reach the ledger.');
        return;
      }

      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMessage('Could not reach the ledger. Check your connection.');
    }
  };

  const renderSubscribeForm = () => (
    <>
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-xl mx-auto">
        <input 
          type="email" 
          placeholder="ENTER YOUR EMAIL..." 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading' || status === 'success'}
          className="w-full bg-[#0a0a0a] border-2 border-[#333] focus:border-[#8b0000] text-white px-6 py-4 rounded-sm font-black tracking-widest uppercase text-xs md:text-sm outline-none transition-colors disabled:opacity-50"
        />
        <button 
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-3 bg-[#8b0000] text-white border-2 border-[#8b0000] px-8 py-4 rounded-sm font-black uppercase tracking-widest text-xs md:text-sm hover:bg-red-700 transition-all skew-x-[-10deg] disabled:opacity-50 disabled:hover:bg-[#8b0000] disabled:cursor-not-allowed"
        >
          <div className="skew-x-[10deg] flex items-center gap-2">
            {status === 'loading' ? 'SCRIBING...' : status === 'success' ? 'OATH SEALED' : <><Feather size={16}/> SIGN LEDGER</>}
          </div>
        </button>
      </form>

      <p className="text-gray-600 font-bold tracking-[0.2em] uppercase text-[9px] md:text-[10px] mt-6">
        From <a href="mailto:basichiro@corenode.com" className="text-[#8b0000] hover:text-[#ff4444] transition-colors">basichiro@corenode.com</a>
      </p>

      {status === 'success' && (
        <p className="text-[#ff4444] font-black tracking-widest uppercase mt-4 text-sm">
          The ink is dry. Welcome to the Travelers.
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-500 font-bold mt-4 text-xs uppercase">
          The ink spilled: {errorMessage}
        </p>
      )}
    </>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#8b0000] selection:text-white">
      
      {/* ========================================== */}
      {/* STICKY NAVIGATION */}
      {/* ========================================== */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/90 via-black/50 to-transparent pt-6 pb-12 px-6 md:px-8 flex justify-between items-center pointer-events-none">
        
        <div className="flex items-center gap-4 pointer-events-auto">
          <span className="font-black tracking-[0.4em] uppercase text-xs text-[#8b0000] border-l-2 border-[#8b0000] pl-3">
            GF // 1888
          </span>
        </div>
        
        <div className="flex gap-4 md:gap-8 font-black tracking-widest text-[10px] md:text-xs uppercase pointer-events-auto">
          <a href="#story" className="hover:text-[#8b0000] transition-colors">The Story</a>
          <a href="#heroes" className="hover:text-[#8b0000] transition-colors">The Fractured</a>
          <a href="#syndicate" className="hover:text-[#8b0000] transition-colors">Syndicate</a>
          <a href="/read" className="hover:text-[#8b0000] transition-colors">Read</a>
          <a href="#forge" className="hover:text-[#8b0000] transition-colors hidden sm:inline">The Forge</a>
        </div>
      </header>

      {/* ========================================== */}
      {/* HERO SECTION */}
      {/* ========================================== */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
        <div className="absolute inset-0 vignette-overlay z-10" />
        <div className="absolute inset-0 bg-black/60 z-10" /> 

        <div className="relative z-20 flex flex-col items-center text-center px-4 mt-16 max-w-full">
          <h2 className="text-[#ff4444] font-black tracking-[0.5em] text-[10px] md:text-sm mb-6 uppercase drop-shadow-xl">
            A Web Comic Series by BasicHiro
          </h2>
          
          <div className="flex flex-col items-center justify-center transform -rotate-2 mb-10 pointer-events-none">
            <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter uppercase comic-text leading-[0.85] text-[#8b0000]">
              GRIMM
            </h1>
            <h1 className="text-4xl sm:text-6xl md:text-[6.5rem] font-black tracking-widest uppercase comic-text leading-[0.85] text-white mt-1">
              FRACTURE
            </h1>
          </div>

          <div className="flex flex-col items-center gap-4 mt-4">
            <div role="button" onClick={() => setShowLeap1(true)} className="inline-flex items-center justify-center gap-3 cursor-pointer bg-[#8b0000] text-white border-2 border-[#8b0000] px-10 py-4 md:px-12 md:py-5 rounded-sm font-black uppercase tracking-widest text-xs md:text-base hover:bg-red-700 hover:scale-105 transition-all skew-x-[-10deg]">
              <div className="skew-x-[10deg] flex items-center gap-3">
                <Flame size={20} /> Explore Leap 1
              </div>
            </div>
            <a
              href="/read"
              className="text-[#ff4444] font-black tracking-[0.35em] uppercase text-[10px] md:text-xs drop-shadow-xl hover:text-white transition-colors"
            >
              Read Webtoon
            </a>
          </div>
          
          <div className="absolute -bottom-24 animate-bounce text-[#444] hidden md:block">
            <ArrowDown size={32} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-16 bg-[#050505] z-30" style={{ clipPath: "polygon(0% 100%, 5% 20%, 10% 80%, 15% 10%, 20% 90%, 25% 30%, 30% 100%, 35% 10%, 40% 80%, 45% 20%, 50% 100%, 55% 10%, 60% 90%, 65% 20%, 70% 100%, 75% 30%, 80% 80%, 85% 10%, 90% 90%, 95% 20%, 100% 100%)" }}></div>
      </section>

      {/* ========================================== */}
      {/* SUBSCRIBE — under hero */}
      {/* ========================================== */}
      <section id="subscribe" className="relative w-full py-16 md:py-20 px-6 md:px-12 bg-[#050505] z-20 border-b border-[#1a1a1a] flex flex-col items-center text-center">
        <div className="max-w-3xl mx-auto w-full">
          <h3 className="text-[#ff4444] font-black tracking-[0.4em] text-[10px] md:text-xs mb-4 uppercase">
            Subscribe
          </h3>
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase comic-text text-white mb-4">
            Join the <span className="text-[#8b0000]">Travelers.</span>
          </h2>
          <p className="text-gray-400 font-medium mb-8 text-sm md:text-base max-w-xl mx-auto">
            Get new page drops, early concept art, and story snips. No spam — just lore from the ledger.
          </p>
          {renderSubscribeForm()}
        </div>
      </section>

      {/* ========================================== */}
      {/* NARRATIVE SCROLL 1: THE INCITING INCIDENT */}
      {/* ========================================== */}
      <section id="story" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-[#050505] z-20 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase comic-text text-white mb-8">
            The Sacred Book has been <span className="text-[#8b0000]">Obliterated.</span>
          </h2>
          <p className="text-lg md:text-3xl text-gray-400 font-bold leading-relaxed mb-12">
            An original lore. A shattered reality. The Book of Fables was not just torn—it was destroyed into thousands of volatile pages. Now, the enemy has weaponized the fragments. 
          </p>
          <div className="h-1 w-24 bg-[#8b0000] mx-auto mb-12" />
          <p className="text-base md:text-2xl text-gray-500 font-medium leading-relaxed">
            To save their universe, they must recover the massive, glowing stacks of parchment representing the weight of their reality. But the chronal stream destroys physical matter. They drop into eras empty-handed.
          </p>
        </div>
      </section>

      {/* ========================================== */}
      {/* NARRATIVE SCROLL 2: THE HEROES */}
      {/* ========================================== */}
      <section id="heroes" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-black z-20 border-t border-[#1a1a1a]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase comic-text text-white mb-6">
              Can Red and Alice survive the <span className="text-[#ff4444]">trials ahead?</span>
            </h2>
            <p className="text-base md:text-xl text-gray-400 font-medium max-w-2xl mx-auto">
              Sixty seconds to scavenge a weapon. Chronal fatigue poisoning their blood. Stripped of magic and forced to adapt to gritty, era-appropriate echoes of themselves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Red */}
            <div className="relative group border border-[#1a1a1a] rounded-sm overflow-hidden bg-[#0a0a0a] flex flex-col">
              <div className="h-[300px] md:h-[400px] overflow-hidden relative z-10 cursor-pointer" onClick={() => setZoomedImage('/red-front.png')}>
                <img src="/red-front.png" alt="Red" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105" />
              </div>
              <div className="p-6 md:p-8 relative z-10 bg-gradient-to-t from-[#050505] to-[#0a0a0a]">
                <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white comic-text mb-2">Red</h4>
                <p className="text-[#8b0000] font-bold tracking-widest text-xs md:text-sm uppercase mb-4">1888 Street Enforcer // Echo</p>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  Broad-shouldered, thick-waisted, and entirely exhausted. Armed with a scavenged, rusted steam-train fire axe wrapped in dirty friction tape. 
                </p>
              </div>
            </div>

            {/* Alice */}
            <div className="relative group border border-[#1a1a1a] rounded-sm overflow-hidden bg-[#0a0a0a] flex flex-col">
              <div className="h-[300px] md:h-[400px] overflow-hidden relative z-10 cursor-pointer" onClick={() => setZoomedImage('/alice-front.png')}>
                <img src="/alice-front.png" alt="Alice" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105" />
              </div>
              <div className="p-6 md:p-8 relative z-10 bg-gradient-to-t from-[#050505] to-[#0a0a0a]">
                <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white comic-text mb-2">Alice</h4>
                <p className="text-[#2e4a22] font-bold tracking-widest text-xs md:text-sm uppercase mb-4">Manic Botanist // Echo</p>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  A hyper-focused intellect teetering on the edge. Forced to rely on raw chemistry and chaotic botanical concoctions scavenged from the local era to stay alive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* NARRATIVE SCROLL 3: THE SYNDICATE */}
      {/* ========================================== */}
      <section id="syndicate" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-[#050505] z-20 border-t border-[#1a1a1a]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 30%, #2e4a22 0%, transparent 60%)" }} />
        
        <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col items-center text-center">
          <Target className="text-[#2e4a22] mb-6" size={40} />
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase comic-text text-white mb-6">
            They must get past a horde of <span className="text-[#2e4a22]">enemies.</span>
          </h2>
          <p className="text-base md:text-2xl text-gray-400 font-bold max-w-3xl mx-auto mb-16">
            Constructs and Echoes weaponized by the Dual Proxies. These are not allies; they are the Phalanx Fodder standing between our heroes and the truth of their situation.
          </p>

          {/* Enemy Card */}
          <div className="bg-black border-2 border-[#2e4a22]/30 p-6 md:p-10 rounded-sm flex flex-col md:flex-row gap-8 items-center shadow-[0_0_60px_rgba(46,74,34,0.15)] text-left w-full max-w-4xl">
            <img 
              src="/ironclad.png" 
              alt="Ironclad Spades" 
              onClick={() => setZoomedImage('/ironclad.png')}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-[#2e4a22] object-cover object-top shrink-0 grayscale hover:grayscale-0 cursor-pointer transition-all hover:scale-105" 
            />
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white comic-text">Ironclad Spades</h4>
                <span className="text-[10px] font-black uppercase px-3 py-1 border border-[#2e4a22] text-[#2e4a22] tracking-widest rounded-full">Model-323</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Victorian Riot Police grunts. Heavy, steam-powered armor utilizing solid white-iron rectangular chest slabs. They deploy in shield wall formations and utilize steam-powered stun-batons for close-quarters containment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* NARRATIVE SCROLL 4: THE TWIST */}
      {/* ========================================== */}
      <section className="relative w-full py-32 md:py-40 px-6 md:px-12 bg-black z-20 flex flex-col items-center text-center border-t border-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, #8b0000 0%, transparent 70%)" }} />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h3 className="text-[#ff4444] font-black tracking-[0.4em] text-xs md:text-sm mb-6 uppercase">The Ultimate Catch</h3>
          <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase comic-text text-white mb-8 leading-[0.9]">
            And did we mention they keep <span className="text-[#8b0000]">Leaping?</span>
          </h2>
          <p className="text-lg md:text-3xl text-gray-300 font-bold leading-relaxed mb-12">
            From world to world. Era to era. Forced to adapt to new rules, fight new enemies, and uncover the mysteries of their fractured timeline before it collapses entirely.
          </p>
          
          <div role="button" onClick={() => setShowLeap1(true)} className="inline-flex items-center justify-center gap-3 cursor-pointer bg-transparent border-2 border-white text-white px-10 py-5 md:px-16 md:py-6 rounded-sm font-black uppercase tracking-widest text-sm md:text-lg hover:bg-white hover:text-black transition-all skew-x-[-10deg]">
              <div className="skew-x-[10deg] flex items-center gap-3">
                 <Flame size={24} /> Explore Leap 1 
              </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* THE FORGE: AI-ASSISTED PRODUCTION */}
      {/* ========================================== */}
      <section id="forge" className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-[#050505] z-20 border-t border-[#1a1a1a] flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle at 30% 40%, #2e4a22 0%, transparent 55%), radial-gradient(circle at 80% 70%, #8b0000 0%, transparent 50%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h3 className="text-[#ff4444] font-black tracking-[0.4em] text-xs md:text-sm mb-6 uppercase">
            The Forge // AI Assisted
          </h3>
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase comic-text text-white mb-8 leading-[0.95]">
            Generative power from <span className="text-[#8b0000]">Gemini.</span><br className="hidden md:block" />
            Heavy design by <span className="text-white">BasicHiro.</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400 font-medium leading-relaxed mb-8 max-w-3xl mx-auto">
            Grimm Fracture is produced with Gemini for generative art and story assistance — outlining, idea sprints, and immediate iteration with feedback. A locked series bible keeps character descriptions in memory so Gemini can render accurate, consistent Fractured and Syndicate designs at speed.
          </p>
          <p className="text-base md:text-xl text-gray-500 font-medium leading-relaxed mb-12 max-w-3xl mx-auto">
            Direction, design, and final production stay with BasicHiro. AI enhances craft and publishing time — it does not replace the hand on the page.
          </p>

          <div className="h-1 w-24 bg-[#8b0000] mx-auto mb-10" />

          <p className="text-[10px] md:text-xs font-black tracking-[0.35em] uppercase text-gray-500">
            Ideas <span className="text-[#8b0000] mx-2">→</span>
            Outline <span className="text-[#8b0000] mx-2">→</span>
            Iterate <span className="text-[#8b0000] mx-2">→</span>
            Lock characters <span className="text-[#8b0000] mx-2">→</span>
            Generate <span className="text-[#8b0000] mx-2">→</span>
            Ship pages
          </p>
        </div>
      </section>

      {/* ========================================== */}
      {/* NEWSLETTER SIGNUP */}
      {/* ========================================== */}
      <section className="relative w-full py-24 px-6 md:px-12 bg-black z-20 border-t border-[#1a1a1a] flex flex-col items-center text-center">
        <div className="max-w-3xl mx-auto w-full">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase comic-text text-white mb-6">
            Still outside the <span className="text-[#8b0000]">ledger?</span>
          </h2>
          <p className="text-gray-400 font-medium mb-10 text-sm md:text-base">
            Learn when new pages drop. See early concept art and story snips before anyone else. No spam, just pure lore.
          </p>
          {renderSubscribeForm()}
        </div>
      </section>

      {/* ========================================== */}
      {/* BASICHIRO FOOTER */}
      {/* ========================================== */}
      <footer className="w-full bg-[#030303] py-16 md:py-20 px-8 text-center relative border-t border-[#1a1a1a]">
          <div className="flex flex-col items-center justify-center pointer-events-none mb-6">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase comic-text leading-[0.85] text-[#222]">GRIMM FRACTURE</h1>
          </div>
          <p className="text-[#8b0000] font-black tracking-[0.4em] uppercase text-[10px] md:text-sm mt-4">A Core Node Original</p>
          <p className="text-gray-600 font-bold tracking-[0.2em] uppercase text-[8px] md:text-[10px] mt-4">
            Heavy design & production by BasicHiro
          </p>
          <p className="text-gray-700 font-bold tracking-[0.15em] uppercase text-[8px] md:text-[10px] mt-3">
            Generative art & story assisted by Gemini
          </p>
      </footer>


      {/* ========================================== */}
      {/* MODAL: EXPLORE LEAP 1 DOSSIER */}
      {/* ========================================== */}
      {showLeap1 && (
        <div className="fixed inset-0 bg-[#050505] z-[1000] overflow-y-auto w-full h-full">
          <div className="fixed top-4 right-4 md:top-10 md:right-10 z-[1050]">
            <button onClick={() => setShowLeap1(false)} className="bg-black/50 border border-[#333] hover:bg-[#8b0000] hover:border-[#8b0000] text-white p-2 md:p-3 rounded-full transition-all backdrop-blur-md">
              <X size={24} className="md:w-8 md:h-8" />
            </button>
          </div>

          <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-32">
            
            <div className="text-center mb-16 md:mb-24">
              <h4 className="text-[#ff4444] font-black tracking-[0.5em] text-[10px] md:text-sm mb-4 uppercase">Recovered Fragments</h4>
              <h2 className="text-5xl md:text-[8rem] font-black uppercase comic-text text-white leading-none tracking-tighter">LEAP <span className="text-[#8b0000]">1</span></h2>
              <p className="text-sm md:text-2xl text-gray-400 font-bold tracking-widest uppercase mt-4">1888 // Overgrown Wonderland</p>
            </div>

            {/* Concept Art / Setting */}
            <div className="mb-24 md:mb-32">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 border-b border-[#1a1a1a] pb-4">
                <Map size={24} className="text-[#8b0000] md:w-8 md:h-8" />
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">The Setting</h3>
              </div>
              <p className="text-gray-400 text-base md:text-xl font-medium mb-8 md:mb-10 max-w-4xl">
                A chaotic fusion of Victorian London architecture and aggressive, mutated flora. The streets run slick with smog and spilled tonics as the Syndicate attempts to harvest the overgrown ruins.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="overflow-hidden rounded-sm border border-[#1a1a1a] bg-[#0a0a0a] cursor-pointer" onClick={() => setZoomedImage(`/concept-${num}.png`)}>
                    <img src={`/concept-${num}.png`} alt={`Concept ${num}`} className="w-full h-48 md:h-80 object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105" />
                  </div>
                ))}
              </div>
            </div>

            {/* The Fractured Turnarounds */}
            <div className="mb-24 md:mb-32">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 border-b border-[#1a1a1a] pb-4">
                <Users size={24} className="text-[#ff4444] md:w-8 md:h-8" />
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">The Fractured</h3>
              </div>
              <p className="text-gray-400 text-base md:text-xl font-medium mb-8 md:mb-10 max-w-4xl">
                The Echoes deployed to the 1888 grid. Armed with scavenged gear and battling chronal sickness, they must push through the Overgrown Wonderland to retrieve the Keystone Page.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-4 rounded-sm">
                  <h4 className="text-lg md:text-xl font-black uppercase tracking-widest text-[#ff4444] mb-4 pl-2">Red // Model Sheet</h4>
                  <img src="/red-turnaround.png" alt="Red Turnaround" className="w-full h-auto object-contain rounded-sm cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setZoomedImage('/red-turnaround.png')} />
                </div>
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-4 rounded-sm">
                  <h4 className="text-lg md:text-xl font-black uppercase tracking-widest text-[#2e4a22] mb-4 pl-2">Alice // Model Sheet</h4>
                  <img src="/alice-turnaround.png" alt="Alice Turnaround" className="w-full h-auto object-contain rounded-sm cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setZoomedImage('/alice-turnaround.png')} />
                </div>
              </div>
            </div>

            {/* The Syndicate Files */}
            <div>
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 border-b border-[#1a1a1a] pb-4">
                <Skull size={24} className="text-[#2e4a22] md:w-8 md:h-8" />
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">Syndicate Records</h3>
              </div>
              <p className="text-gray-400 text-base md:text-xl font-medium mb-8 md:mb-10 max-w-4xl">
                The local Proxy has mobilized two primary threat units against the Travelers. Expect heavy resistance in the narrow alleyways.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                <div className="bg-black border-2 border-[#2e4a22]/30 p-6 md:p-8 rounded-sm shadow-[0_0_40px_rgba(46,74,34,0.1)]">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                    <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white comic-text">Diamond-Scale Stalkers</h4>
                    <span className="text-[10px] font-black uppercase px-3 py-1 border border-[#2e4a22] text-[#2e4a22] tracking-widest rounded-full">Agile Assassin</span>
                  </div>
                  <img src="/stalker.png" alt="Diamond Scale Stalker" className="w-full h-48 md:h-64 object-cover object-top border border-[#1a1a1a] mb-6 grayscale hover:grayscale-0 cursor-pointer transition-all" onClick={() => setZoomedImage('/stalker.png')} />
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
                    Featureless white porcelain masks with a blood-red diamond over one eye. They utilize steel card scale-mail that grinds when moving. Highly lethal from the rooftops, utilizing throwing razor-cards and climbing claws.
                  </p>
                </div>

                <div className="bg-black border-2 border-[#2e4a22]/30 p-6 md:p-8 rounded-sm shadow-[0_0_40px_rgba(46,74,34,0.1)]">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                    <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white comic-text">Ironclad Spades</h4>
                    <span className="text-[10px] font-black uppercase px-3 py-1 border border-[#2e4a22] text-[#2e4a22] tracking-widest rounded-full">Phalanx Fodder</span>
                  </div>
                  <img src="/ironclad.png" alt="Ironclad Spades" className="w-full h-48 md:h-64 object-cover object-top border border-[#1a1a1a] mb-6 grayscale hover:grayscale-0 cursor-pointer transition-all" onClick={() => setZoomedImage('/ironclad.png')} />
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
                    Heavy riot police grunts deployed in shield walls to block alleyways. Protected by solid white-iron rectangular chest slabs bearing a black spade insignia. Armed with steam-powered stun-batons.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* GLOBAL LIGHTBOX OVERLAY */}
      {/* ========================================== */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-md cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 md:top-10 md:right-10 bg-black/50 text-white hover:text-[#ff4444] p-2 md:p-3 rounded-full transition-colors z-[2010]"
            onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }}
          >
            <X size={32} />
          </button>
          <img 
            src={zoomedImage} 
            alt="Enlarged view" 
            className="max-w-full max-h-[90vh] object-contain rounded-sm border border-[#333] shadow-2xl cursor-default" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

    </main>
  );
}