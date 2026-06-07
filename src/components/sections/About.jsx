import React from 'react';

const syllabus = [
  { topic: 'Need for Modulation', section: 'Dashboard, Formulas → AM Basics', covered: true },
  { topic: 'AM DSB-TC Signal Equation', section: 'Simulator → AM waveform', covered: true },
  { topic: 'Modulation Index m = Am/Ac', section: 'Control panel + Result cards', covered: true },
  { topic: 'Under / Critical / Over Modulation', section: 'Modulation badge + Over-mod warning', covered: true },
  { topic: 'AM Bandwidth BW = 2·fm', section: 'Result cards + Formulas → Bandwidth', covered: true },
  { topic: 'Carrier Power Pc = Ac²/2R', section: 'Result cards + Formulas → Power', covered: true },
  { topic: 'Total Transmitted Power Pt', section: 'Result cards + Formulas → Power', covered: true },
  { topic: 'Transmission Efficiency η', section: 'Result cards + Formulas → Power', covered: true },
  { topic: 'USB and LSB frequencies', section: 'Result cards + Formulas → Bandwidth', covered: true },
  { topic: 'Channel Noise (AWGN)', section: 'Noisy AM waveform + AWGN slider', covered: true },
  { topic: 'Envelope Detector (RC circuit)', section: 'Envelope + Recovered waveforms', covered: true },
  { topic: 'RC Time Constant Condition', section: 'signalMath.js + Formulas → Noise tab', covered: true },
  { topic: 'SNR and Figure of Merit', section: 'Formulas → Noise & SNR tab', covered: true },
];

const techStack = [
  { tech: 'React', version: '18.2', purpose: 'UI components and state management' },
  { tech: 'Vite', version: '5.1', purpose: 'Build tool and hot-reload dev server' },
  { tech: 'Tailwind CSS', version: '3.4', purpose: 'Utility-first styling' },
  { tech: 'Recharts', version: '2.10', purpose: 'SVG-based waveform chart rendering' },
  { tech: 'JavaScript ES6+', version: '—', purpose: 'Signal math and DSP logic' },
];

const methodology = [
  {
    title: 'Signal Generation',
    desc: 'All waveforms generated in JavaScript using first-principle trigonometric formulas. No pre-stored data — every sample point computed fresh on each slider change.',
  },
  {
    title: 'AWGN Simulation',
    desc: 'Box-Muller transform converts two uniform random variables into a Gaussian-distributed sample. Noise amplitude scales with the signal peak and the user-controlled σ slider.',
  },
  {
    title: 'Envelope Detection',
    desc: 'IIR (Infinite Impulse Response) RC filter simulation. Each sample either charges to |x[n]| if it exceeds the previous output (rectifier + diode), or decays exponentially by e^(−dt/RC) (capacitor discharge through R).',
  },
  {
    title: 'Signal Recovery',
    desc: 'DC component removed by subtracting the mean of the envelope signal. The result approximates the original message signal m(t), scaled by Ac.',
  },
  {
    title: 'Chart Rendering',
    desc: '500 sample points are generated per simulation run (3 message cycles). Charts are downsampled to ≤250 points for rendering performance. Recharts SVG LineChart with animated=false for real-time updates.',
  },
  {
    title: 'Visual Carrier Representation',
    desc: 'For chart readability, the carrier frequency is capped at 20× the message frequency on-screen (while true fc/fm ratio drives all mathematical calculations). This prevents aliasing on the SVG chart.',
  },
];

export default function About() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in-up">

      {/* Header */}
      <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent p-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400 mb-4">
          MAKAUT B.Tech EC401 — Analog Communication
        </div>
        <h1 className="text-2xl font-black text-white mb-2">
          About This Simulation
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          This tool simulates the complete AM DSB-TC communication chain for educational purposes,
          aligned with the MAKAUT (Maulana Abul Kalam Azad University of Technology) EC401
          Analog Communication syllabus. It is fully client-side — no backend, no data sent anywhere.
        </p>
      </div>

      {/* Syllabus coverage */}
      <div>
        <h2 className="section-title mb-1">EC401 Syllabus Coverage</h2>
        <p className="section-subtitle mb-4">All major AM topics from the MAKAUT EC401 curriculum</p>
        <div className="card overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide w-8">✓</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">EC401 Topic</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Covered In</th>
              </tr>
            </thead>
            <tbody>
              {syllabus.map((row, i) => (
                <tr key={i} className="border-b border-slate-800/40 hover:bg-slate-800/20 transition-colors">
                  <td className="px-4 py-2.5 text-center">
                    <span className="text-emerald-400">✓</span>
                  </td>
                  <td className="px-4 py-2.5 text-slate-300 text-xs">{row.topic}</td>
                  <td className="px-4 py-2.5 text-cyan-400 text-xs font-mono">{row.section}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Methodology */}
      <div>
        <h2 className="section-title mb-1">Simulation Methodology</h2>
        <p className="section-subtitle mb-4">How the simulation works under the hood</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {methodology.map((m, i) => (
            <div key={i} className="card">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-1">{m.title}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{m.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div>
        <h2 className="section-title mb-1">Technology Stack</h2>
        <p className="section-subtitle mb-4">Built with modern web technologies — fully static and deployable</p>
        <div className="card overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Technology</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Version</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {techStack.map((row, i) => (
                <tr key={i} className="border-b border-slate-800/40 hover:bg-slate-800/20 transition-colors">
                  <td className="px-4 py-2.5 font-semibold text-cyan-400 text-xs">{row.tech}</td>
                  <td className="px-4 py-2.5 font-mono text-slate-400 text-xs">{row.version}</td>
                  <td className="px-4 py-2.5 text-slate-400 text-xs">{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GitHub / Deploy info */}
      <div>
        <h2 className="section-title mb-1">Deploy to GitHub Pages</h2>
        <p className="section-subtitle mb-4">Upload this project to GitHub and deploy for free</p>
        <div className="card font-mono text-xs space-y-2 text-slate-400">
          <div className="text-slate-600 text-[10px] uppercase tracking-wide mb-3">Quick deploy steps</div>
          {[
            '# 1. Clone / initialize your repo',
            'git init && git add . && git commit -m "Initial commit"',
            '',
            '# 2. Push to GitHub',
            'git remote add origin https://github.com/YOUR_USERNAME/am-simulation.git',
            'git push -u origin main',
            '',
            '# 3. Install dependencies',
            'npm install',
            '',
            '# 4. Deploy to GitHub Pages',
            'npm install --save-dev gh-pages',
            'npm run deploy',
          ].map((line, i) => (
            <div key={i} className={line.startsWith('#') ? 'text-emerald-600' : line === '' ? 'h-2' : 'text-cyan-400'}>
              {line || null}
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg bg-amber-500/5 border border-amber-500/20 p-3">
          <div className="text-xs text-amber-400 font-semibold mb-1">⚙️ GitHub Pages Base Path</div>
          <div className="text-xs text-slate-400 leading-relaxed">
            In <code className="text-cyan-400 bg-slate-800 px-1 rounded">vite.config.js</code>, set{' '}
            <code className="text-cyan-400 bg-slate-800 px-1 rounded">base: '/am-simulation/'</code>{' '}
            (replace with your actual repo name) before deploying.
          </div>
        </div>
      </div>

      {/* License */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-4 flex gap-4 items-start">
        <div className="text-2xl">📄</div>
        <div>
          <div className="text-sm font-semibold text-white mb-1">MIT License</div>
          <div className="text-xs text-slate-500 leading-relaxed">
            Free to use, modify, and distribute for educational purposes.
            Based on MAKAUT EC401 Analog Communication syllabus.
          </div>
        </div>
      </div>

    </div>
  );
}
