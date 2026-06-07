/**
 * signalMath.js — All DSP logic for the AM Simulation
 * MAKAUT EC401 — Analog Communication
 *
 * Signal Model:
 *   s(t) = Ac · [1 + m·cos(2π·fm·t)] · cos(2π·fc·t)
 *   where m = Am/Ac (modulation index)
 */

const TWO_PI = 2 * Math.PI;

// ─── Time Array ──────────────────────────────────────────────────────────────

/**
 * Generate a time array spanning exactly `numCycles` message signal cycles.
 * We use 500 points for a smooth but performant chart.
 * @param {number} fm - Message frequency (Hz)
 * @param {number} numCycles - Number of message cycles to display
 * @param {number} numPoints - Number of sample points
 * @returns {number[]}
 */
export function generateTimeArray(fm, numCycles = 3, numPoints = 500) {
  const T = numCycles / fm; // total time window
  const dt = T / (numPoints - 1);
  return Array.from({ length: numPoints }, (_, i) => i * dt);
}

// ─── Signal Generators ───────────────────────────────────────────────────────

/**
 * Message (modulating) signal: m(t) = Am·cos(2π·fm·t)
 */
export function generateMessage(timeArr, Am, fm) {
  return timeArr.map((t) => Am * Math.cos(TWO_PI * fm * t));
}

/**
 * Carrier signal: c(t) = Ac·cos(2π·fc·t)
 * Uses compressed time so carrier cycles are visible (not aliased on chart)
 */
export function generateCarrier(timeArr, Ac, fc, fm) {
  // Show apparent carrier at fc/fm ratio relative to message
  // This keeps chart readable while preserving frequency ratio visually
  const ratio = Math.min(fc / fm, 20); // cap ratio at 20 for chart clarity
  return timeArr.map((t) => Ac * Math.cos(TWO_PI * ratio * fm * t));
}

/**
 * AM DSB-TC signal: s(t) = Ac·[1 + m·cos(2π·fm·t)]·cos(2π·fc·t)
 * Uses visual carrier frequency (same cap as above) for chart clarity.
 */
export function generateAM(timeArr, Am, Ac, fm, fc) {
  const m = Am / Ac;
  const ratio = Math.min(fc / fm, 20);
  return timeArr.map((t) => {
    const envelope = Ac * (1 + m * Math.cos(TWO_PI * fm * t));
    const carrier = Math.cos(TWO_PI * ratio * fm * t);
    return envelope * carrier;
  });
}

// ─── AWGN Noise ──────────────────────────────────────────────────────────────

/**
 * Box-Muller transform — generates a Gaussian-distributed random number
 * with mean=0 and std≈1.
 */
function gaussianRandom() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(TWO_PI * v);
}

/**
 * Add AWGN (Additive White Gaussian Noise) to a signal.
 * noiseLevel: 0 = no noise, 1 = noise amplitude = signal peak amplitude
 * @param {number[]} signal
 * @param {number} noiseLevel - 0 to 1
 * @param {number} signalPeak - used to scale noise amplitude
 * @returns {number[]}
 */
export function addAWGN(signal, noiseLevel, signalPeak) {
  if (noiseLevel === 0) return [...signal];
  const noiseAmp = noiseLevel * signalPeak;
  return signal.map((s) => s + noiseAmp * gaussianRandom());
}

// ─── Envelope Detector (RC Circuit) ──────────────────────────────────────────

/**
 * IIR RC envelope detector simulation.
 *
 * The RC low-pass filter follows the positive envelope of the signal.
 * - Charging phase (rectifier ON):  y[n] = |x[n]|
 * - Discharging phase (RC decay):   y[n] = y[n-1] * exp(-dt/RC)
 *
 * The optimal RC time constant satisfies:
 *   1/(2π·fc) << RC << 1/(2π·fm)
 *   RC_optimal = 1 / (2π · √(fc·fm))
 *
 * @param {number[]} signal - AM signal (possibly noisy)
 * @param {number} RC - RC time constant (seconds)
 * @param {number} dt - sample interval (seconds)
 * @returns {number[]}
 */
export function envelopeDetect(signal, RC, dt) {
  const output = new Array(signal.length).fill(0);
  const alpha = Math.exp(-dt / RC); // discharge factor per sample

  output[0] = Math.abs(signal[0]);

  for (let i = 1; i < signal.length; i++) {
    const rectified = Math.abs(signal[i]);
    if (rectified >= output[i - 1]) {
      // Charging: follow the peak
      output[i] = rectified;
    } else {
      // Discharging: exponential decay
      output[i] = output[i - 1] * alpha;
    }
  }
  return output;
}

// ─── Signal Recovery ─────────────────────────────────────────────────────────

/**
 * Recover the message signal from the envelope:
 * 1. Remove DC bias (subtract mean)
 * 2. Normalize amplitude relative to Ac
 * The result approximates the original message signal m(t).
 *
 * @param {number[]} envelope
 * @param {number} Ac - Carrier amplitude (used for reference)
 * @returns {number[]}
 */
export function recoverSignal(envelope, Ac) {
  const mean = envelope.reduce((a, b) => a + b, 0) / envelope.length;
  return envelope.map((v) => v - mean);
}

// ─── Parameter Calculations ──────────────────────────────────────────────────

/**
 * Compute all AM parameters for the result cards.
 *
 * @param {Object} params
 * @param {number} params.Am - Message amplitude (V)
 * @param {number} params.Ac - Carrier amplitude (V)
 * @param {number} params.fm - Message frequency (Hz)
 * @param {number} params.fc - Carrier frequency (Hz)
 * @param {number} params.R  - Load resistance (Ω)
 * @returns {Object} computed parameters
 */
export function computeParams({ Am, Ac, fm, fc, R }) {
  const m = Am / Ac; // modulation index

  // Frequencies
  const fUSB = fc + fm;
  const fLSB = fc - fm;
  const BW = 2 * fm;

  // Power calculations
  const Pc = (Ac * Ac) / (2 * R);           // Carrier power
  const Pt = Pc * (1 + (m * m) / 2);        // Total transmitted power
  const Pusb = Pc * (m * m) / 4;            // Upper sideband power
  const Plsb = Pc * (m * m) / 4;            // Lower sideband power
  const Psidebands = Pusb + Plsb;           // Total sideband power

  // Efficiency (max 33.3% at m=1)
  const eta = (m * m) / (2 + m * m);

  // RC time constant for envelope detector
  const RC_optimal = 1 / (TWO_PI * Math.sqrt(fc * fm));
  const RC_min = 1 / (TWO_PI * fc);        // Must be >> this
  const RC_max = 1 / (TWO_PI * fm);        // Must be << this

  // Modulation status
  let status = 'under';
  if (Math.abs(m - 1) < 0.01) status = 'critical';
  else if (m > 1) status = 'over';

  return {
    m: parseFloat(m.toFixed(4)),
    fUSB,
    fLSB,
    BW,
    Pc: parseFloat(Pc.toFixed(4)),
    Pt: parseFloat(Pt.toFixed(4)),
    Pusb: parseFloat(Pusb.toFixed(4)),
    Plsb: parseFloat(Plsb.toFixed(4)),
    Psidebands: parseFloat(Psidebands.toFixed(4)),
    eta: parseFloat((eta * 100).toFixed(2)), // as percentage
    RC_optimal: parseFloat(RC_optimal.toExponential(3)),
    RC_min: parseFloat(RC_min.toExponential(3)),
    RC_max: parseFloat(RC_max.toExponential(3)),
    status,
  };
}

// ─── Full Pipeline ────────────────────────────────────────────────────────────

/**
 * Run the complete AM simulation pipeline.
 * Returns all waveform arrays + computed parameters.
 *
 * @param {Object} config
 * @returns {Object} { timeArr, message, carrier, amSignal, noisyAM, envelope, recovered, params }
 */
export function runSimulation(config) {
  const { Am, Ac, fm, fc, R, noiseLevel, rcOverride } = config;

  const timeArr = generateTimeArray(fm, 3, 500);
  const dt = timeArr[1] - timeArr[0];

  const params = computeParams({ Am, Ac, fm, fc, R });

  const message = generateMessage(timeArr, Am, fm);
  const carrier = generateCarrier(timeArr, Ac, fc, fm);
  const amSignal = generateAM(timeArr, Am, Ac, fm, fc);

  const signalPeak = Ac * (1 + params.m); // peak of AM signal
  const noisyAM = addAWGN(amSignal, noiseLevel, signalPeak);

  // Use override RC or optimal
  const RC = rcOverride !== null ? rcOverride : params.RC_optimal;
  const envelope = envelopeDetect(noisyAM, RC, dt);
  const recovered = recoverSignal(envelope, Ac);

  // Convert to chart-ready format: [{t, y}, ...]
  const toChartData = (arr) =>
    timeArr.map((t, i) => ({
      t: parseFloat((t * 1000).toFixed(4)), // ms for display
      y: parseFloat(arr[i].toFixed(5)),
    }));

  return {
    timeArr,
    message: toChartData(message),
    carrier: toChartData(carrier),
    amSignal: toChartData(amSignal),
    noisyAM: toChartData(noisyAM),
    envelope: toChartData(envelope),
    recovered: toChartData(recovered),
    params,
    RC,
  };
}
