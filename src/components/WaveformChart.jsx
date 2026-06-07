import React, { useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-700 bg-[#0f1729] px-3 py-2 text-xs shadow-xl">
        <p className="text-slate-400 mb-0.5">t = <span className="font-mono text-slate-300">{label} ms</span></p>
        <p style={{ color: payload[0]?.color }} className="font-mono font-semibold">
          y = {payload[0]?.value?.toFixed(4)}
        </p>
      </div>
    );
  }
  return null;
};

/**
 * WaveformChart — Reusable recharts waveform card
 * Props:
 *   data: [{t, y}, ...]
 *   color: hex color string
 *   title: string
 *   subtitle: string
 *   yDomain: [min, max] | 'auto'
 *   height: number (default 140)
 *   dotColor: string (color for the stage dot indicator)
 */
export default function WaveformChart({
  data,
  color = '#06b6d4',
  title = 'Signal',
  subtitle = '',
  yDomain = 'auto',
  height = 140,
  dotColor,
}) {
  // Downsample for performance: display at most 250 points
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    if (data.length <= 250) return data;
    const step = Math.ceil(data.length / 250);
    return data.filter((_, i) => i % step === 0);
  }, [data]);

  const domain = useMemo(() => {
    if (yDomain !== 'auto') return yDomain;
    if (!chartData.length) return [-1, 1];
    const vals = chartData.map((d) => d.y);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const pad = (max - min) * 0.15 || 0.5;
    return [+(min - pad).toFixed(2), +(max + pad).toFixed(2)];
  }, [chartData, yDomain]);

  return (
    <div className="card animate-fade-in-up">
      {/* Header */}
      <div className="chart-header mb-3">
        <div className="chart-dot" style={{ backgroundColor: dotColor || color }} />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white leading-tight">{title}</div>
          {subtitle && <div className="text-[10px] text-slate-500 font-mono leading-tight">{subtitle}</div>}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,58,95,0.5)" />
          <XAxis
            dataKey="t"
            tick={{ fontSize: 9, fill: '#475569' }}
            tickLine={false}
            axisLine={{ stroke: '#1e3a5f' }}
            tickFormatter={(v) => `${v.toFixed(1)}`}
            label={{ value: 'ms', position: 'insideRight', offset: 10, fontSize: 9, fill: '#475569' }}
          />
          <YAxis
            domain={domain}
            tick={{ fontSize: 9, fill: '#475569' }}
            tickLine={false}
            axisLine={{ stroke: '#1e3a5f' }}
            width={40}
            tickFormatter={(v) => v.toFixed(1)}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0} stroke="rgba(100,116,139,0.3)" strokeDasharray="4 2" />
          <Line
            type="monotone"
            dataKey="y"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 3, fill: color, strokeWidth: 0 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
