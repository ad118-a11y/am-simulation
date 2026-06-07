import React from 'react';

// Simple SVG icons as components
const WaveIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M2 12 Q4 6 6 12 Q8 18 10 12 Q12 6 14 12 Q16 18 18 12 Q20 6 22 12" />
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
  </svg>
);

export default function Header({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0a0f1e]/90 backdrop-blur-md">
      <div className="flex h-14 items-center gap-4 px-4">

        {/* Hamburger (mobile) */}
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {sidebarOpen
              ? <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>
              : <><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></>
            }
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2.5 select-none">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 pulse-glow">
            <WaveIcon />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-white leading-tight">AM Simulation</div>
            <div className="text-[10px] text-slate-500 leading-tight font-mono">MAKAUT · EC401</div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 ml-6">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'simulator', label: 'Simulator' },
            { id: 'formulas', label: 'Formulas' },
            { id: 'about', label: 'About' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`tab-btn ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          {/* Live indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live
          </div>

          {/* MAKAUT badge */}
          <span className="hidden md:inline-flex badge badge-cyan">EC401</span>

          {/* GitHub link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
            title="View on GitHub"
          >
            <GithubIcon />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
