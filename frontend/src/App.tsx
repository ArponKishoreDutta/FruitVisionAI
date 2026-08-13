import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FruitScanner } from './components/FruitScanner';
import { SupportedFruits } from './components/SupportedFruits';
import { HowItWorks } from './components/HowItWorks';
import { ModelInfo } from './components/ModelInfo';
import { Footer } from './components/Footer';
import { AnimatedBackground } from './components/AnimatedBackground';
import { checkHealth } from './services/api';
import { HealthResponse } from './types/prediction';

export const App: React.FC = () => {
  const [health, setHealth] = useState<HealthResponse | null>(null);

  useEffect(() => {
    // Initial health check & periodic poll
    const fetchHealth = async () => {
      const res = await checkHealth();
      setHealth(res);
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectSampleFruit = async (fruitName: string, sampleSvg: string) => {
    handleNavigate('scanner');
    try {
      const res = await fetch(sampleSvg);
      const blob = await res.blob();
      const sampleFile = new File([blob], `sample_${fruitName.toLowerCase().replace(/\s+/g, '_')}.png`, {
        type: 'image/png',
        lastModified: Date.now(),
      });
      // Trigger file uploader via custom DOM event or smooth scroll to uploader
      const inputEl = document.querySelector('input[type="file"]') as HTMLInputElement | null;
      if (inputEl) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(sampleFile);
        inputEl.files = dataTransfer.files;
        inputEl.dispatchEvent(new Event('change', { bubbles: true }));
      }
    } catch (err) {
      console.error('Error auto-loading sample fruit into scanner:', err);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-x-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
    >
      {/* Dynamic Animated Background */}
      <AnimatedBackground />

      {/* Navigation Header */}
      <Navbar health={health} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        <Hero onStartScanning={() => handleNavigate('scanner')} />
        <FruitScanner />
        <SupportedFruits onSelectSampleFruit={handleSelectSampleFruit} />
        <HowItWorks />
        <ModelInfo />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
