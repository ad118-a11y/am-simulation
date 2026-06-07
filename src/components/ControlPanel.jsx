import React, { useCallback } from 'react';

/**
 * A single slider + number-input row.
 */
function SliderRow({ id, label, symbol, value, min, max, step, unit, onChange, color = '#06b6d4' }) {
  const pct = ((value - min) / (max - min)) * 100;

  const handleSlider = useCallback((e) => {
    onChange(parseFloat(e.target.value));
  }, [onChange]);

  const handleInput = useCallback((e) => {
    const v = parseFloat(e.target.value);
    if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
  }, [onChange, min, max]);

  return (
    <div className="slider-group">
      <div className="slider-label">
        <span className="slider-name">
          <span className="font-mono text-slate-400 text-[11px]">{symbol}</span>
          {' '}{label}
        </span>
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={handleInput}
            className="w-20"
            aria-label={`${label} value`}
          />
          <span className="text-[10px] text-slate-600 w-8">{unit}</span>
        </div>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSlider}
        style={{ '--pct': `${pct}%`, accentColor: color }}
        aria-label={label}
      />
      <div className="flex justify-between text-[9px] text-slate-700">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

/**
 * Main control panel — all simulation parameters.
 */
export default function ControlPanel({ config, onChange, params }) {
  const { Am, Ac, fm, fc, R, noiseLevel } = config;

  const set = (key) => (val) => onChange({ ...config, [key]: val });

  return (
    <div className="space-y-5">

      {/* Signal Parameters */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 rounded-full bg-cyan-500" />
          <h3 className="text-sm font-semibold text-white">Signal Parameters</h3>
        </div>
        <div className="space-y-4">
          <SliderRow
            id="slider-Am"
            label="Message Amplitude"
            symbol="Am"
            value={Am}
            min={0.1}
            max={5}
            step={0.05}
            unit="V"
            onChange={set('Am')}
            color="#22d3ee"
          />
          <SliderRow
            id="slider-Ac"
            label="Carrier Amplitude"
            symbol="Ac"
            value={Ac}
            min={0.5}
            max={5}
            step={0.05}
            unit="V"
            onChange={set('Ac')}
            color="#a78bfa"
          />
          <SliderRow
            id="slider-fm"
            label="Message Frequency"
            symbol="fm"
            value={fm}
            min={100}
            max={2000}
            step={50}
            unit="Hz"
            onChange={set('fm')}
            color="#f59e0b"
          />
          <SliderRow
            id="slider-fc"
            label="Carrier Frequency"
            symbol="fc"
            value={fc}
            min={5000}
            max={50000}
            step={1000}
            unit="Hz"
            onChange={set('fc')}
            color="#60a5fa"
          />
        </div>
      </div>

      {/* Channel & Detector */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 rounded-full bg-amber-500" />
          <h3 className="text-sm font-semibold text-white">Channel & Detector</h3>
        </div>
        <div className="space-y-4">
          <SliderRow
            id="slider-R"
            label="Load Resistance"
            symbol="R"
            value={R}
            min={50}
            max={1000}
            step={10}
            unit="Ω"
            onChange={set('R')}
            color="#10b981"
          />
          <SliderRow
            id="slider-noise"
            label="AWGN Noise Level"
            symbol="σ"
            value={noiseLevel}
            min={0}
            max={1}
            step={0.01}
            unit=""
            onChange={set('noiseLevel')}
            color="#ef4444"
          />
        </div>

        {/* Noise level info */}
        {noiseLevel > 0 && (
          <div className="mt-3 rounded-lg bg-red-500/5 border border-red-500/20 px-3 py-2">
            <div className="text-[10px] text-red-400">
              AWGN active — Box-Muller Gaussian noise, amplitude ∝ {(noiseLevel * 100).toFixed(0)}% of signal peak
            </div>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 rounded-full bg-purple-500" />
          <h3 className="text-sm font-semibold text-white">Quick Presets</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            id="preset-critical"
            onClick={() => onChange({ ...config, Am: 2, Ac: 2, fm: 500, fc: 10000, noiseLevel: 0 })}
            className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs text-amber-400 hover:bg-amber-500/10 transition-colors text-left"
          >
            <div className="font-semibold">Critical</div>
            <div className="text-[10px] text-amber-600">m = 1.0</div>
          </button>
          <button
            id="preset-under"
            onClick={() => onChange({ ...config, Am: 1, Ac: 2, fm: 500, fc: 10000, noiseLevel: 0 })}
            className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-xs text-emerald-400 hover:bg-emerald-500/10 transition-colors text-left"
          >
            <div className="font-semibold">Under-Mod</div>
            <div className="text-[10px] text-emerald-600">m = 0.5</div>
          </button>
          <button
            id="preset-over"
            onClick={() => onChange({ ...config, Am: 3, Ac: 2, fm: 500, fc: 10000, noiseLevel: 0 })}
            className="rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors text-left"
          >
            <div className="font-semibold">Over-Mod</div>
            <div className="text-[10px] text-red-600">m = 1.5</div>
          </button>
          <button
            id="preset-noisy"
            onClick={() => onChange({ ...config, Am: 2, Ac: 2, fm: 500, fc: 10000, noiseLevel: 0.4 })}
            className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 px-3 py-2 text-xs text-cyan-400 hover:bg-cyan-500/10 transition-colors text-left"
          >
            <div className="font-semibold">Noisy Channel</div>
            <div className="text-[10px] text-cyan-600">σ = 0.4</div>
          </button>
        </div>
      </div>

    </div>
  );
}
