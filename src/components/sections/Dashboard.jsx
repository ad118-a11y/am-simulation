import React from 'react';

const features = [
  {
    icon: '📡',
    title: 'Live AM Signal',
    desc: 's(t) = Ac·[1 + m·cos(2πfm·t)]·cos(2πfc·t) — computed in real-time',
    color: '#06b6d4',
  },
  {
    icon: '📶',
    title: '6-Stage Waveforms',
    desc: 'Message → Carrier → AM → Noisy AM → Envelope → Recovered',
    color: '#a78bfa',
  },
  {
    icon: '🔊',
    title: 'AWGN Channel',
    desc: 'Box-Muller Gaussian noise simulates real-world channel degradation',
    color: '#ef4444',
  },
  {
    icon: '🔬',
    title: 'RC Envelope Detector',
    desc: 'IIR simulation with optimal RC = 1/(2π√(fc·fm))',
    color: '#10b981',
  },
  {
    icon: '📊',
    title: 'Parameter Analysis',
    desc: 'm, BW, Pc, Pt, η, USB/LSB, RC — all calculated live',
    color: '#f59e0b',
  },
  {
    icon: '📘',
    title: 'Formula Reference',
    desc: 'Tabbed theory panel covering all MAKAUT EC401 topics',
    color: '#60a5fa',
  },
];

const syllabus = [
  ['Need for Modulation', 'Dashboard overview'],
  ['AM DSB-TC Signal Equation', 'Simulator → AM waveform'],
  ['Modulation Index m = Am/Ac', 'Control panel + Result cards'],
  ['Under / Critical / Over Modulation', 'Modulation badge + warning'],
  ['AM Bandwidth BW = 2·fm', 'Result cards'],
  ['Carrier Power Pc = Ac²/2R', 'Result cards → Power'],
  ['Total Transmitted Power Pt', 'Result cards → Power'],
  ['Transmission Efficiency η', 'Result cards → Efficiency'],
  ['USB and LSB frequencies', 'Result cards → Frequency'],
  ['Channel Noise (AWGN)', 'Noisy AM waveform'],
  ['Envelope Detector (RC circuit)', 'Envelope + Recovered'],
  ['RC Time Constant Condition', 'signalMath.js + Formulas'],
  ['SNR and Figure of Merit', 'Formulas → Noise & SNR tab'],
];

export default function Dashboard({ setActiveSection }) {
  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in-up">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/5 p-8">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <path d="M0 100 Q25 40 50 100 Q75 160 100 100 Q125 40 150 100 Q175 160 200 100"
              stroke="#06b6d4" strokeWidth="3" fill="none"/>
            <path d="M0 100 Q25 40 50 100 Q75 160 100 100 Q125 40 150 100 Q175 160 200 100"
              stroke="#06b6d4" strokeWidth="3" fill="none" transform="translate(0, 30)" opacity="0.5"/>
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                MAKAUT EC401 — Analog Communication
              </div>
              <h1 className="text-3xl font-black text-white leading-tight mb-3">
                AM Transmitter & <br />
                <span className="gradient-text">Envelope Detector</span> Simulation
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                A fully client-side, interactive simulation of the complete AM DSB-TC communication
                chain — from the message signal through an AM modulator, an AWGN noisy channel,
                an RC envelope detector, and signal recovery. All computations are derived from
                first principles and aligned with the MAKAUT EC401 syllabus.
              </p>
              <div className="flex gap-3 mt-6 flex-wrap">
                <button
                  id="btn-goto-simulator"
                  onClick={() => setActiveSection('simulator')}
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-900 font-bold px-5 py-2.5 text-sm transition-all duration-200 shadow-lg shadow-cyan-500/30"
                  style={{ color: '#0a0f1e' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  Launch Simulator
                </button>
                <button
                  id="btn-goto-formulas"
                  onClick={() => setActiveSection('formulas')}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-600 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 font-medium px-5 py-2.5 text-sm transition-all duration-200"
                >
                  📘 Formula Reference
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div>
        <h2 className="section-title mb-1">Features</h2>
        <p className="section-subtitle mb-4">Everything you need to understand AM communication systems</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="card hover:scale-[1.01] transition-transform duration-200">
              <div className="flex items-start gap-3">
                <div
                  className="text-2xl w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${f.color}15` }}
                >
                  {f.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-1">{f.title}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Signal chain */}
      <div>
        <h2 className="section-title mb-1">Signal Chain</h2>
        <p className="section-subtitle mb-4">The complete AM communication pipeline simulated in this tool</p>
        <div className="card">
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { label: 'm(t)', name: 'Message', color: '#22d3ee' },
              { label: '×', name: '', color: '#475569' },
              { label: 'Ac·c(t)', name: 'Carrier', color: '#a78bfa' },
              { label: '→', name: '', color: '#475569' },
              { label: 's(t)', name: 'AM Signal', color: '#10b981' },
              { label: '+', name: '', color: '#475569' },
              { label: 'n(t)', name: 'AWGN', color: '#ef4444' },
              { label: '→', name: '', color: '#475569' },
              { label: 'RC', name: 'Detector', color: '#f59e0b' },
              { label: '→', name: '', color: '#475569' },
              { label: 'r(t)', name: 'Recovered', color: '#f1f5f9' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-mono text-sm font-bold" style={{ color: step.color }}>
                  {step.label}
                </span>
                {step.name && (
                  <span className="text-[9px] text-slate-600 whitespace-nowrap">{step.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Syllabus table */}
      <div>
        <h2 className="section-title mb-1">MAKAUT EC401 Syllabus Coverage</h2>
        <p className="section-subtitle mb-4">Every topic mapped to a specific simulation component</p>
        <div className="card overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  EC401 Topic
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Covered In
                </th>
              </tr>
            </thead>
            <tbody>
              {syllabus.map(([topic, location], i) => (
                <tr
                  key={i}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-4 py-2.5 text-slate-300 text-xs">{topic}</td>
                  <td className="px-4 py-2.5 text-cyan-400 text-xs font-mono">{location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
