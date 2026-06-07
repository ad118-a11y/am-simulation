import React from 'react';

// Status badge config
const STATUS_CONFIG = {
  under: {
    label: 'Under-Modulated',
    cls: 'badge-green',
    icon: '↓',
    tip: 'm < 1: Normal — no distortion',
  },
  critical: {
    label: 'Critical (m=1)',
    cls: 'badge-yellow',
    icon: '◎',
    tip: 'm = 1: Maximum efficiency (33.3%)',
  },
  over: {
    label: 'Over-Modulated',
    cls: 'badge-red',
    icon: '⚠',
    tip: 'm > 1: Distortion occurs!',
  },
};

function MetricCard({ label, value, unit, color, children }) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value" style={{ color: color || '#06b6d4' }}>
        {value}
        {unit && <span className="text-sm font-normal text-slate-500 ml-1">{unit}</span>}
      </div>
      {children}
    </div>
  );
}

export default function ResultCards({ params }) {
  if (!params) return null;

  const {
    m, status, fUSB, fLSB, BW,
    Pc, Pt, Pusb, Plsb, Psidebands, eta,
    RC_optimal, RC_min, RC_max,
  } = params;

  const statusCfg = STATUS_CONFIG[status] || STATUS_CONFIG.under;

  const fmt = (v, d = 4) => (typeof v === 'number' ? v.toFixed(d) : v);
  const fmtF = (hz) => hz >= 1000 ? `${(hz / 1000).toFixed(2)} kHz` : `${hz} Hz`;
  const fmtP = (w) => w < 0.001 ? `${(w * 1000).toFixed(3)} mW` : `${w.toFixed(4)} W`;

  return (
    <div className="space-y-4">

      {/* Modulation Index — hero card */}
      <div className="card border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-transparent">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="metric-label mb-1">Modulation Index</div>
            <div className="text-4xl font-black font-mono gradient-text">{fmt(m, 3)}</div>
            <div className="text-xs text-slate-500 mt-1">m = Am / Ac</div>
          </div>
          <div className="text-right space-y-2">
            <div className={statusCfg.cls}>
              <span>{statusCfg.icon}</span>
              <span>{statusCfg.label}</span>
            </div>
            <div className="text-[10px] text-slate-500">{statusCfg.tip}</div>
          </div>
        </div>

        {/* Progress bar for m */}
        <div className="mt-3">
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(m * 50, 100)}%`,
                background: m < 0.95
                  ? 'linear-gradient(to right, #10b981, #06b6d4)'
                  : m <= 1.05
                    ? 'linear-gradient(to right, #f59e0b, #ef4444)'
                    : 'linear-gradient(to right, #ef4444, #dc2626)',
              }}
            />
          </div>
          <div className="flex justify-between text-[9px] text-slate-600 mt-0.5">
            <span>0</span><span>m=1</span><span>2</span>
          </div>
        </div>
      </div>

      {/* Frequency cards */}
      <div>
        <div className="text-[10px] uppercase tracking-widest text-slate-600 mb-2 font-medium px-1">Frequency</div>
        <div className="grid grid-cols-2 gap-2">
          <MetricCard label="USB" value={fmtF(fUSB)} color="#22d3ee" />
          <MetricCard label="LSB" value={fmtF(fLSB)} color="#22d3ee" />
          <MetricCard label="Bandwidth" value={fmtF(BW)} color="#f59e0b" />
        </div>
      </div>

      {/* Power cards */}
      <div>
        <div className="text-[10px] uppercase tracking-widest text-slate-600 mb-2 font-medium px-1">Power (R={params.R || '—'}Ω)</div>
        <div className="grid grid-cols-2 gap-2">
          <MetricCard label="Carrier Pc" value={fmtP(Pc)} color="#a78bfa" />
          <MetricCard label="Total Pt" value={fmtP(Pt)} color="#a78bfa" />
          <MetricCard label="Sideband" value={fmtP(Psidebands)} color="#60a5fa" />
          <MetricCard
            label="Efficiency η"
            value={`${fmt(eta, 2)}%`}
            color={eta > 30 ? '#10b981' : eta > 15 ? '#f59e0b' : '#64748b'}
          />
        </div>
      </div>

      {/* RC */}
      <div>
        <div className="text-[10px] uppercase tracking-widest text-slate-600 mb-2 font-medium px-1">RC Detector</div>
        <div className="rounded-lg border border-slate-700/50 bg-slate-900/50 p-3 space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">RC_optimal</span>
            <span className="font-mono text-emerald-400">{RC_optimal} s</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">RC_min (1/2πfc)</span>
            <span className="font-mono text-slate-400">{RC_min} s</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">RC_max (1/2πfm)</span>
            <span className="font-mono text-slate-400">{RC_max} s</span>
          </div>
          <div className="glow-line mt-2" />
          <div className="text-[10px] text-slate-600 text-center">
            1/2πfc ≪ RC ≪ 1/2πfm
          </div>
        </div>
      </div>

    </div>
  );
}
