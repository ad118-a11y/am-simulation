import React from 'react';

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    desc: 'Overview & Features',
  },
  {
    id: 'simulator',
    label: 'Simulator',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    desc: 'Live AM Simulation',
  },
  {
    id: 'formulas',
    label: 'Formulas',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
    desc: 'Theory & Equations',
  },
  {
    id: 'about',
    label: 'About',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    desc: 'Syllabus Mapping',
  },
];

export default function Sidebar({ activeSection, setActiveSection, isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-64 border-r border-slate-800/80
          bg-[#0a0f1e]/95 backdrop-blur-md flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto lg:h-full lg:flex-shrink-0
        `}
      >
        {/* System info */}
        <div className="px-4 py-4 border-b border-slate-800/60">
          <div className="text-[10px] uppercase tracking-widest text-slate-600 mb-2 font-medium">System</div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Mode</span>
              <span className="font-mono text-cyan-400">AM DSB-TC</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Status</span>
              <span className="text-emerald-400 font-medium">● Active</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Course</span>
              <span className="text-slate-300">MAKAUT EC401</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="text-[10px] uppercase tracking-widest text-slate-600 mb-3 px-1 font-medium">Navigation</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); onClose(); }}
              className={`nav-item w-full text-left ${activeSection === item.id ? 'active' : ''}`}
            >
              <span className={activeSection === item.id ? 'text-cyan-400' : 'text-slate-500'}>
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm leading-tight">{item.label}</div>
                <div className="text-[10px] text-slate-600 leading-tight truncate">{item.desc}</div>
              </div>
              {activeSection === item.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom info */}
        <div className="px-4 py-4 border-t border-slate-800/60">
          <div className="rounded-lg bg-cyan-500/5 border border-cyan-500/20 p-3">
            <div className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wide mb-1">Signal Chain</div>
            <div className="space-y-0.5">
              {['m(t) → Modulator', 'AWGN Channel', 'Envelope Detect', 'Recovery'].map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500">
                  <span className="w-1 h-1 rounded-full bg-cyan-500/50" />
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
