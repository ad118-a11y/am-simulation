import React, { useState } from 'react';

// ─── Formula data ─────────────────────────────────────────────────────────────

const TABS = [
  { id: 'basics', label: '📡 AM Basics' },
  { id: 'bandwidth', label: '📶 Bandwidth' },
  { id: 'power', label: '⚡ Power & Efficiency' },
  { id: 'noise', label: '🔊 Noise & SNR' },
];

function FormulaBox({ title, formula, note }) {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-4">
      <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">{title}</div>
      <div className="formula-block">{formula}</div>
      {note && <div className="text-xs text-slate-500 mt-2 leading-relaxed">{note}</div>}
    </div>
  );
}

function Section({ heading, children }) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">{heading}</h3>
      {children}
    </div>
  );
}

// Tab content components
function TabBasics() {
  return (
    <div className="space-y-6">
      <Section heading="AM DSB-TC Signal Equation">
        <FormulaBox
          title="AM Signal"
          formula={
            <>
              s(t) = A<sub>c</sub> · [1 + m · cos(2π·f<sub>m</sub>·t)] · cos(2π·f<sub>c</sub>·t)
            </>
          }
          note="DSB-TC: Double Sideband with Transmitted Carrier. The carrier is always present, enabling simple envelope detection at the receiver."
        />
        <FormulaBox
          title="Expanded Form"
          formula={
            <>
              s(t) = A<sub>c</sub>·cos(2π·f<sub>c</sub>·t)
              {'  +  '}(m·A<sub>c</sub>/2)·cos(2π·(f<sub>c</sub>+f<sub>m</sub>)·t)
              {'  +  '}(m·A<sub>c</sub>/2)·cos(2π·(f<sub>c</sub>-f<sub>m</sub>)·t)
            </>
          }
          note="Three components: Carrier + Upper Sideband (USB) + Lower Sideband (LSB)"
        />
      </Section>

      <Section heading="Modulation Index">
        <FormulaBox
          title="Definition"
          formula={<>m = A<sub>m</sub> / A<sub>c</sub></>}
          note="m is dimensionless. It measures the degree of modulation."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { range: 'm < 1', label: 'Under-Modulated', color: '#10b981', desc: 'No distortion. Envelope intact. Efficiency < 33.3%' },
            { range: 'm = 1', label: 'Critical (100%)', color: '#f59e0b', desc: 'Maximum efficiency. Efficiency = 33.3%. Ideal case.' },
            { range: 'm > 1', label: 'Over-Modulated', color: '#ef4444', desc: 'Envelope crosses zero. Distortion. Envelope detector fails.' },
          ].map((s, i) => (
            <div key={i} className="rounded-lg p-3 border" style={{ borderColor: `${s.color}40`, background: `${s.color}08` }}>
              <div className="font-mono text-sm font-bold mb-1" style={{ color: s.color }}>{s.range}</div>
              <div className="text-xs font-semibold text-white mb-1">{s.label}</div>
              <div className="text-xs text-slate-500">{s.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section heading="Need for Modulation">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            ['Antenna Size', 'Carrier frequency allows practical antenna dimensions (λ/4 = c/4fc). At fm = 1kHz, antenna would be 75km!'],
            ['Multiplexing', 'Different stations use different fc — FDM (Frequency Division Multiplexing).'],
            ['Noise Immunity', 'High-frequency signals are less susceptible to low-frequency noise.'],
            ['Long Distance', 'High-frequency EM waves propagate efficiently via sky wave / space wave.'],
          ].map(([title, desc], i) => (
            <div key={i} className="card">
              <div className="text-sm font-semibold text-cyan-400 mb-1">{title}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function TabBandwidth() {
  return (
    <div className="space-y-6">
      <Section heading="Bandwidth and Sidebands">
        <FormulaBox
          title="AM Bandwidth"
          formula={<>BW = 2 · f<sub>m</sub></>}
          note="AM DSB-TC occupies twice the message bandwidth. If fm = 5 kHz, BW = 10 kHz."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormulaBox
            title="Upper Sideband (USB)"
            formula={<>f<sub>USB</sub> = f<sub>c</sub> + f<sub>m</sub></>}
            note="Contains the +fm component"
          />
          <FormulaBox
            title="Lower Sideband (LSB)"
            formula={<>f<sub>LSB</sub> = f<sub>c</sub> - f<sub>m</sub></>}
            note="Contains the -fm component"
          />
        </div>
        <FormulaBox
          title="Spectral Diagram (Conceptual)"
          formula={
            <div className="text-center space-y-1">
              <div className="text-slate-400 text-xs">Amplitude Spectrum |S(f)|</div>
              <div>
                <span className="text-blue-400">  A<sub>c</sub>/2 </span>
                {'             '}
                <span className="text-cyan-400"> A<sub>c</sub> </span>
                {'             '}
                <span className="text-blue-400"> A<sub>c</sub>/2 </span>
              </div>
              <div className="text-slate-500">
                {'   '}↑{'             '}↑{'             '}↑
              </div>
              <div>
                <span className="text-blue-400">f<sub>c</sub>-f<sub>m</sub></span>
                {'          '}
                <span className="text-cyan-400">f<sub>c</sub></span>
                {'          '}
                <span className="text-blue-400">f<sub>c</sub>+f<sub>m</sub></span>
              </div>
              <div className="text-slate-500 text-xs">{'|←— BW = 2·fm —→|'}</div>
            </div>
          }
        />
      </Section>

      <Section heading="Bandwidth Comparison">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-3 py-2 text-slate-400">Modulation</th>
                <th className="text-left px-3 py-2 text-slate-400">Bandwidth</th>
                <th className="text-left px-3 py-2 text-slate-400">Carrier?</th>
                <th className="text-left px-3 py-2 text-slate-400">Sidebands</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {[
                ['AM DSB-TC', '2·fm', 'Yes', 'Both'],
                ['AM DSB-SC', '2·fm', 'No (suppressed)', 'Both'],
                ['AM SSB', 'fm', 'No', 'One only'],
                ['FM (NBFM)', '2·fm', '—', 'Approx same'],
              ].map(([mod, bw, car, sb], i) => (
                <tr key={i} className="hover:bg-slate-800/20">
                  <td className="px-3 py-2 text-white font-medium">{mod}</td>
                  <td className="px-3 py-2 text-cyan-400 font-mono">{bw}</td>
                  <td className="px-3 py-2 text-slate-400">{car}</td>
                  <td className="px-3 py-2 text-slate-400">{sb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function TabPower() {
  return (
    <div className="space-y-6">
      <Section heading="Power Analysis">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormulaBox
            title="Carrier Power"
            formula={<>P<sub>c</sub> = A<sub>c</sub>² / (2R)</>}
            note="Power carried by the carrier component alone."
          />
          <FormulaBox
            title="Total Power"
            formula={<>P<sub>t</sub> = P<sub>c</sub> · (1 + m²/2)</>}
            note="Carrier + both sidebands. Always ≥ Pc."
          />
          <FormulaBox
            title="Sideband Powers"
            formula={<>P<sub>USB</sub> = P<sub>LSB</sub> = P<sub>c</sub> · m² / 4</>}
            note="Each sideband carries equal power."
          />
          <FormulaBox
            title="Total Sideband Power"
            formula={<>P<sub>sb</sub> = P<sub>c</sub> · m² / 2</>}
            note="Both sidebands together."
          />
        </div>
      </Section>

      <Section heading="Transmission Efficiency">
        <FormulaBox
          title="Efficiency η"
          formula={<>η = m² / (2 + m²) × 100%</>}
          note="Fraction of total power carried by useful sidebands (information). Carrier power is 'wasted'."
        />
        <div className="grid grid-cols-3 gap-3">
          {[
            { m: '0.5', eta: '11.1%', label: 'Typical', color: '#64748b' },
            { m: '1.0', eta: '33.3%', label: 'Maximum', color: '#10b981' },
            { m: '1.5', eta: '52.9%', label: '(Over-mod!)', color: '#ef4444' },
          ].map((row, i) => (
            <div key={i} className="rounded-lg p-3 text-center border border-slate-700/50 bg-slate-900/40">
              <div className="font-mono text-xs text-slate-400 mb-1">m = {row.m}</div>
              <div className="text-xl font-black font-mono" style={{ color: row.color }}>{row.eta}</div>
              <div className="text-[10px] text-slate-600 mt-0.5">{row.label}</div>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-3">
          <div className="text-xs text-amber-400 font-semibold mb-1">⚡ Key Insight</div>
          <div className="text-xs text-slate-400 leading-relaxed">
            AM DSB-TC has a maximum efficiency of <strong className="text-amber-400">33.3%</strong> at m=1.
            This means at least 2/3 of the transmitted power is wasted on the carrier,
            which carries no information. DSB-SC and SSB improve on this but require more complex receivers.
          </div>
        </div>
      </Section>
    </div>
  );
}

function TabNoise() {
  return (
    <div className="space-y-6">
      <Section heading="AWGN Channel Model">
        <FormulaBox
          title="Received Signal"
          formula={<>r(t) = s(t) + n(t)</>}
          note="n(t) is Additive White Gaussian Noise (AWGN) — the standard channel model in communications."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormulaBox
            title="Gaussian PDF"
            formula={<>p(n) = (1/√(2πσ²)) · e^(−n²/2σ²)</>}
            note="σ² is the noise variance (power). σ is the noise standard deviation."
          />
          <FormulaBox
            title="Box-Muller Transform (used here)"
            formula={<>n = √(−2·ln U₁) · cos(2π·U₂)</>}
            note="Generates Gaussian samples from uniform U₁, U₂ ∈ (0,1)"
          />
        </div>
      </Section>

      <Section heading="SNR and Figure of Merit">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormulaBox
            title="SNR (Baseband)"
            formula={<>SNR<sub>0</sub> = S<sub>i</sub> / N<sub>i</sub></>}
            note="Ratio of signal power to noise power at input."
          />
          <FormulaBox
            title="SNR (AM Detector Output)"
            formula={<>SNR<sub>o</sub> = m² · SNR<sub>0</sub> / (2 + m²)</>}
            note="For envelope detector with AM DSB-TC."
          />
          <FormulaBox
            title="Figure of Merit (FOM)"
            formula={<>FOM = SNR<sub>o</sub> / SNR<sub>0</sub> = m²/(2+m²)</>}
            note="FOM = η for AM. DSB-SC achieves FOM = 1."
          />
          <FormulaBox
            title="Noise Power"
            formula={<>N = N₀ · BW = N₀ · 2f<sub>m</sub></>}
            note="N₀ is single-sided noise PSD (W/Hz). BW = 2fm for AM."
          />
        </div>

        <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-3">
          <div className="text-xs text-red-400 font-semibold mb-1">🔊 Noise Performance Comparison</div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs mt-2">
              <thead>
                <tr className="border-b border-slate-800/50">
                  <th className="text-left py-1 px-2 text-slate-400">System</th>
                  <th className="text-left py-1 px-2 text-slate-400">FOM</th>
                  <th className="text-left py-1 px-2 text-slate-400">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/30">
                {[
                  ['AM DSB-TC (m=1)', 'η = 1/3', 'Worst — carrier wastes 2/3 power'],
                  ['AM DSB-SC', '1', 'Better — no wasted carrier'],
                  ['AM SSB', '1', 'Same FOM, half bandwidth'],
                  ['FM (NBFM)', '3', 'Best for wideband'],
                ].map(([sys, fom, note], i) => (
                  <tr key={i}>
                    <td className="py-1 px-2 text-white">{sys}</td>
                    <td className="py-1 px-2 text-cyan-400 font-mono">{fom}</td>
                    <td className="py-1 px-2 text-slate-500">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section heading="RC Envelope Detector">
        <FormulaBox
          title="RC Time Constant Condition"
          formula={<>1/(2π·f<sub>c</sub>) ≪ RC ≪ 1/(2π·f<sub>m</sub>)</>}
          note="RC must discharge fast enough to track the envelope, but not so fast that it follows the carrier."
        />
        <FormulaBox
          title="Optimal RC (geometric mean)"
          formula={<>RC<sub>opt</sub> = 1 / (2π · √(f<sub>c</sub> · f<sub>m</sub>))</>}
          note="Balances tracking speed vs. ripple rejection. Used in this simulation."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-lg p-3 border border-red-500/30 bg-red-500/5">
            <div className="text-xs font-semibold text-red-400 mb-1">RC too small (RC ≪ 1/2πfc)</div>
            <div className="text-xs text-slate-500">Output follows the carrier ripple — poor filtering, high-frequency noise passes through.</div>
          </div>
          <div className="rounded-lg p-3 border border-amber-500/30 bg-amber-500/5">
            <div className="text-xs font-semibold text-amber-400 mb-1">RC too large (RC ≫ 1/2πfm)</div>
            <div className="text-xs text-slate-500">Detector cannot follow fast envelope changes — "diagonal clipping" distortion at high m.</div>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ─── Main FormulasPanel ───────────────────────────────────────────────────────

export default function FormulasPanel() {
  const [activeTab, setActiveTab] = useState('basics');

  const tabContent = {
    basics: <TabBasics />,
    bandwidth: <TabBandwidth />,
    power: <TabPower />,
    noise: <TabNoise />,
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto animate-fade-in-up">
      <div>
        <h2 className="section-title">Formula Reference</h2>
        <p className="section-subtitle">MAKAUT EC401 — Analog Communication theory and equations</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 flex-wrap border-b border-slate-800 pb-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`formula-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="animate-fade-in-up">
        {tabContent[activeTab]}
      </div>
    </div>
  );
}
