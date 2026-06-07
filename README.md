# 📡 AM Simulation — MAKAUT EC401 Analog Communication

> **Simulation of AM Transmitter and Envelope Detector Receiver under Noisy Channel**  
> A fully client-side, interactive browser tool for the complete AM DSB-TC communication chain.

[![React](https://img.shields.io/badge/React-18.2-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.1-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

---

## 🎯 Objective

Interactive simulation of the complete AM analog communication system:

```
Message m(t) → AM Modulator → AWGN Channel → RC Envelope Detector → Recovered Signal
```

All calculations are derived from first principles, fully aligned with the **MAKAUT EC401 Analog Communication** syllabus.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Live AM Simulation** | Real-time waveforms as you drag sliders |
| **6-Stage Waveforms** | Message, Carrier, AM, Noisy AM, Envelope, Recovered |
| **Parameter Controls** | Am, Ac, fm, fc, R, AWGN noise level |
| **Result Cards** | m, BW, Pc, Pt, η, USB/LSB, RC values |
| **Modulation Status** | Auto badge: Under / Critical / Over-modulated |
| **Over-Mod Warning** | Prominent alert when m > 1 with explanation |
| **Formula Reference** | 4-tab theory sheet: AM Basics, Bandwidth, Power, Noise & SNR |
| **Quick Presets** | Critical / Under / Over / Noisy channel one-click presets |
| **Responsive UI** | Works on desktop and mobile |
| **Dark Engineering Theme** | Navy/cyan professional dashboard |

---

## 📐 Key Formulae

```
AM Signal:        s(t) = Ac · [1 + m · cos(2π·fm·t)] · cos(2π·fc·t)

Modulation Index: m = Am / Ac
  m < 1  → Under-modulated (normal)
  m = 1  → Critical (max efficiency 33.3%)
  m > 1  → Over-modulated (distortion!)

Bandwidth:        BW = 2·fm
Sidebands:        fUSB = fc + fm,  fLSB = fc − fm

Carrier Power:    Pc  = Ac² / (2R)
Total Power:      Pt  = Pc · (1 + m²/2)
Sideband Power:   Pusb = Plsb = Pc · m² / 4
Efficiency:       η   = m² / (2 + m²)  [max 33.3% at m=1]

RC Condition:     1/(2π·fc) << RC << 1/(2π·fm)
Optimal RC:       RC = 1 / (2π · √(fc · fm))

AWGN:             r(t) = s(t) + n(t)   [Box-Muller Gaussian noise]
```

---

## 🗂️ MAKAUT EC401 Syllabus Coverage

| EC401 Topic | Covered In |
|---|---|
| Need for Modulation | Dashboard, Formulas → AM Basics |
| AM DSB-TC Signal Equation | Simulator → AM waveform |
| Modulation Index m = Am/Ac | Control panel + Result cards |
| Under / Critical / Over Modulation | Modulation badge + warning |
| AM Bandwidth BW = 2·fm | Result cards |
| Carrier Power Pc = Ac²/2R | Result cards |
| Total Transmitted Power Pt | Result cards |
| Transmission Efficiency η | Result cards |
| USB and LSB frequencies | Result cards |
| Channel Noise (AWGN) | Noisy AM waveform + slider |
| Envelope Detector (RC circuit) | Envelope + Recovered waveforms |
| RC Time Constant Condition | signalMath.js + Formulas panel |
| SNR and Figure of Merit | Formulas → Noise & SNR tab |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.2 | UI components and state management |
| Vite | 5.1 | Build tool and hot-reload dev server |
| Tailwind CSS | 3.4 | Utility-first styling |
| Recharts | 2.10 | SVG-based waveform chart rendering |
| JavaScript ES6+ | — | Signal math and DSP logic |

**No backend. No database. Fully static.**

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/am-simulation.git
cd am-simulation

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# → App runs at http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🌐 Deploy to GitHub Pages

### Step 1 — Update `vite.config.js`
Change the `base` to match your GitHub repository name:
```js
export default defineConfig({
  plugins: [react()],
  base: '/am-simulation/',  // ← replace with your repo name
})
```

### Step 2 — Add deploy script to `package.json`
```json
"scripts": {
  "deploy": "vite build && gh-pages -d dist"
}
```

### Step 3 — Deploy

```bash
npm install --save-dev gh-pages
npm run deploy
```

Your app will be live at: `https://YOUR_USERNAME.github.io/am-simulation/`

---

## 📁 Project Structure

```
am-simulation/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Top navigation bar
│   │   ├── Sidebar.jsx             # Side navigation panel
│   │   ├── WaveformChart.jsx       # Reusable Recharts waveform card
│   │   ├── ResultCards.jsx         # AM parameter result cards
│   │   ├── ControlPanel.jsx        # Parameter sliders + presets
│   │   └── sections/
│   │       ├── Dashboard.jsx       # Home / overview page
│   │       ├── Simulator.jsx       # Main simulation section
│   │       ├── FormulasPanel.jsx   # Formula and theory reference
│   │       └── About.jsx           # Project info + syllabus map
│   ├── utils/
│   │   └── signalMath.js           # All signal generation & calculations
│   ├── App.jsx                     # Root app component
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles + Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🔬 Simulation Methodology

1. **Signal Generation** — Pure JavaScript trig functions, first principles
2. **AWGN** — Box-Muller transform for Gaussian noise
3. **Envelope Detector** — IIR RC filter: charge to |x[n]|, decay by e^(−dt/RC)
4. **Signal Recovery** — DC-block (subtract mean) from envelope
5. **500 samples** per 3 message cycles; charts downsampled to 250 points

---

## 🔮 Future Scope

- [ ] FFT / frequency spectrum plot
- [ ] FM (Frequency Modulation) simulation
- [ ] DSB-SC and SSB modes
- [ ] SNR dB readout meter
- [ ] Multi-tone message signal
- [ ] Export waveform data as CSV
- [ ] Audio input → live AM demo

---

## 📄 License

MIT License — free to use and modify for educational purposes.

---

*Based on MAKAUT EC401 Analog Communication syllabus.*
