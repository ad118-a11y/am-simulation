import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/sections/Dashboard.jsx';
import Simulator from './components/sections/Simulator.jsx';
import FormulasPanel from './components/sections/FormulasPanel.jsx';
import About from './components/sections/About.jsx';
import { runSimulation } from './utils/signalMath.js';

// Default simulation parameters
const DEFAULT_CONFIG = {
  Am: 1.5,       // Message amplitude (V)
  Ac: 2.0,       // Carrier amplitude (V)
  fm: 500,       // Message frequency (Hz)
  fc: 10000,     // Carrier frequency (Hz)
  R: 100,        // Load resistance (Ω)
  noiseLevel: 0.15, // AWGN noise level (0-1)
  rcOverride: null, // null = use optimal RC
};

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  // Run the complete AM simulation whenever config changes
  const simData = useMemo(() => {
    try {
      return runSimulation(config);
    } catch (err) {
      console.error('Simulation error:', err);
      return null;
    }
  }, [config]);

  // Config change handler
  const handleConfigChange = useCallback((newConfig) => {
    setConfig(newConfig);
  }, []);

  // Section change closes sidebar on mobile
  const handleSectionChange = useCallback((section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  }, []);

  // Render active section
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard setActiveSection={handleSectionChange} />;
      case 'simulator':
        return (
          <Simulator
            config={config}
            onChange={handleConfigChange}
            simData={simData}
          />
        );
      case 'formulas':
        return <FormulasPanel />;
      case 'about':
        return <About />;
      default:
        return <Dashboard setActiveSection={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0a0f1e' }}>
      {/* Top navigation */}
      <Header
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Body: sidebar + main content */}
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={handleSectionChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content area */}
        <main
          className="flex-1 overflow-y-auto"
          style={{ background: 'linear-gradient(180deg, #0a0f1e 0%, #0a0f1e 100%)' }}
        >
          <div className="p-4 lg:p-6 max-w-screen-2xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
