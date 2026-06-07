import React from 'react';
import WaveformChart from '../WaveformChart.jsx';
import ControlPanel from '../ControlPanel.jsx';
import ResultCards from '../ResultCards.jsx';

// Over-modulation warning banner
function OverModWarning({ m }) {
  return (
    <div className="over-mod-banner" role="alert">
      <div className="text-xl flex-shrink-0">⚠️</div>
      <div>
        <div className="text-sm font-bold text-red-400 mb-1">
          Over-Modulation Detected (m = {m.toFixed(3)})
        </div>
        <div className="text-xs text-red-300/80 leading-relaxed">
          When m &gt; 1, the instantaneous amplitude of the AM signal goes negative, causing{' '}
          <strong>envelope distortion</strong>. The envelope detector cannot correctly recover the
          message signal — clipping and phase reversal artifacts appear. In practice this causes
          distortion and intermodulation in the received audio/signal.
        </div>
        <div className="mt-2 font-mono text-[10px] text-red-500">
          Condition violated: Am ({(m * 2).toFixed(2)} V) &gt; Ac (2.00 V) → |1 + m·cos(θ)| crosses zero
        </div>
      </div>
    </div>
  );
}

// Waveform stage definition
const STAGES = [
  {
    key: 'message',
    title: 'Message Signal  m(t)',
    subtitle: 'm(t) = Am · cos(2π·fm·t)',
    color: '#22d3ee',
    dotColor: '#22d3ee',
  },
  {
    key: 'carrier',
    title: 'Carrier Signal  c(t)',
    subtitle: 'c(t) = Ac · cos(2π·fc·t)',
    color: '#a78bfa',
    dotColor: '#a78bfa',
  },
  {
    key: 'amSignal',
    title: 'AM DSB-TC Signal  s(t)',
    subtitle: 's(t) = Ac·[1 + m·cos(2πfm·t)]·cos(2πfc·t)',
    color: '#10b981',
    dotColor: '#10b981',
  },
  {
    key: 'noisyAM',
    title: 'Noisy AM Signal  s(t) + n(t)',
    subtitle: 'AWGN channel — Box-Muller Gaussian noise',
    color: '#ef4444',
    dotColor: '#ef4444',
  },
  {
    key: 'envelope',
    title: 'Envelope Detector Output',
    subtitle: 'RC low-pass IIR filter — follows positive peak',
    color: '#f59e0b',
    dotColor: '#f59e0b',
  },
  {
    key: 'recovered',
    title: 'Recovered Signal  r(t)',
    subtitle: 'DC-blocked envelope — approximates m(t)',
    color: '#f1f5f9',
    dotColor: '#94a3b8',
  },
];

export default function Simulator({ config, onChange, simData }) {
  const { params } = simData || {};

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="section-title">AM Simulation</h2>
          <p className="section-subtitle">Adjust parameters and observe waveforms in real-time</p>
        </div>
        {params && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">m =</span>
            <span
              className="font-mono font-bold text-lg"
              style={{ color: params.status === 'over' ? '#ef4444' : params.status === 'critical' ? '#f59e0b' : '#10b981' }}
            >
              {params.m.toFixed(3)}
            </span>
            <span className={
              params.status === 'under' ? 'badge-green' :
              params.status === 'critical' ? 'badge-yellow' : 'badge-red'
            }>
              {params.status === 'under' ? 'Under' : params.status === 'critical' ? 'Critical' : 'Over'}
            </span>
          </div>
        )}
      </div>

      {/* Over-mod warning */}
      {params?.status === 'over' && <OverModWarning m={params.m} />}

      {/* Main layout: controls left, waveforms right */}
      <div className="flex gap-4 items-start" style={{ flexWrap: 'wrap' }}>

        {/* Left: Controls + Results */}
        <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-4">
          <ControlPanel config={config} onChange={onChange} params={params} />
          <ResultCards params={params} />
        </div>

        {/* Right: Waveforms */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Stage progress bar */}
          <div className="card py-3">
            <div className="flex items-center justify-between gap-1">
              {STAGES.map((s, i) => (
                <React.Fragment key={s.key}>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-[8px] text-slate-600 hidden sm:block text-center leading-tight" style={{ maxWidth: '50px' }}>
                      {i + 1}
                    </span>
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className="flex-1 h-px bg-slate-800" style={{ maxWidth: '30px' }} />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center justify-between text-[9px] text-slate-700 mt-1 hidden sm:flex">
              <span>Message</span>
              <span>Carrier</span>
              <span>AM</span>
              <span>AWGN</span>
              <span>Envelope</span>
              <span>Recovery</span>
            </div>
          </div>

          {/* Waveform charts */}
          {STAGES.map((stage) => (
            <WaveformChart
              key={stage.key}
              data={simData?.[stage.key] || []}
              color={stage.color}
              dotColor={stage.dotColor}
              title={stage.title}
              subtitle={stage.subtitle}
              height={140}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
