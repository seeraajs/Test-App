'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';

export default function Home() {
  const [name, setName] = useState('');
  const [accent, setAccent] = useState<'indigo' | 'emerald' | 'amber' | 'rose'>('indigo');
  const [celebrated, setCelebrated] = useState(false);
  const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([]);

  // Simple color theme configurations
  const themes = {
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
      accentBg: 'bg-indigo-600',
      hoverBg: 'hover:bg-indigo-700',
      focusRing: 'focus:ring-indigo-500',
      glow: 'shadow-indigo-100/50',
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      accentBg: 'bg-emerald-600',
      hoverBg: 'hover:bg-emerald-700',
      focusRing: 'focus:ring-emerald-500',
      glow: 'shadow-emerald-100/50',
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
      accentBg: 'bg-amber-600',
      hoverBg: 'hover:bg-amber-700',
      focusRing: 'focus:ring-amber-500',
      glow: 'shadow-amber-100/50',
    },
    rose: {
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-100',
      accentBg: 'bg-rose-600',
      hoverBg: 'hover:bg-rose-700',
      focusRing: 'focus:ring-rose-500',
      glow: 'shadow-rose-100/50',
    },
  };

  const activeTheme = themes[accent];

  const handleCelebrate = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCelebrated(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const newStars = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: -Math.random() * 100 - 20,
    }));
    setStars(newStars);
    setTimeout(() => {
      setCelebrated(false);
      setStars([]);
    }, 1200);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-6 md:p-12 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Decorative subtle ambient background blob */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        id="welcome-card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full max-w-lg bg-white rounded-2xl border border-slate-100 p-8 md:p-10 shadow-xl ${activeTheme.glow} transition-shadow duration-500 z-10`}
      >
        {/* Card Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className={`p-2.5 rounded-xl ${activeTheme.bg} ${activeTheme.text} transition-colors duration-300`}>
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="font-mono text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Active Workspace
          </span>
        </div>

        {/* Dynamic Greeting Heading */}
        <div className="min-h-[80px] flex flex-col justify-end mb-4">
          <AnimatePresence mode="wait">
            {name ? (
              <motion.h1
                key="custom-greeting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
              >
                Welcome, <span className={`${activeTheme.text} transition-colors duration-300`}>{name}</span>!
              </motion.h1>
            ) : (
              <motion.h1
                key="default-greeting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-display text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
              >
                Hello! This is a test app.
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8">
          Your Next.js, Tailwind, and React environment is fully initialized and operational. Test interactions instantly using the options below.
        </p>

        {/* Configuration Section */}
        <div className="space-y-6 border-t border-slate-100 pt-8">
          {/* Text Input */}
          <div>
            <label htmlFor="name-input" className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Personalize Greeting
            </label>
            <input
              id="name-input"
              type="text"
              maxLength={24}
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 focus:ring-2 ${activeTheme.focusRing} focus:ring-offset-2 transition-all text-sm`}
            />
          </div>

          {/* Theme Selector */}
          <div>
            <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Accent Palette
            </span>
            <div id="accent-selector" className="flex items-center gap-2">
              {(['indigo', 'emerald', 'amber', 'rose'] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => setAccent(color)}
                  className={`relative flex-1 py-2.5 rounded-xl text-xs font-medium capitalize border transition-all ${
                    accent === color
                      ? `${themes[color].bg} ${themes[color].text} ${themes[color].border} ring-2 ring-offset-2 ${themes[color].focusRing}`
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Interactive Button */}
          <div className="relative pt-2">
            <button
              id="celebrate-btn"
              onClick={handleCelebrate}
              className={`relative w-full py-3.5 px-4 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 ${activeTheme.accentBg} ${activeTheme.hoverBg} transition-colors shadow-sm duration-300 active:scale-[0.98] cursor-pointer`}
            >
              <span>Celebrate Setup</span>
              <ArrowRight className="w-4 h-4" />

              {/* Floating stars particle container */}
              <AnimatePresence>
                {celebrated && stars.map((star) => (
                  <motion.span
                    key={star.id}
                    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                    animate={{ opacity: 0, scale: 1.2, x: star.x, y: star.y }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="absolute pointer-events-none text-xl"
                    style={{ left: '50%', top: '30%' }}
                  >
                    ✨
                  </motion.span>
                ))}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Subtle Status Footer */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Environment ready</span>
          </div>
          <div className="flex items-center gap-1">
            <RefreshCw className="w-3 h-3 animate-spin-slow text-slate-300" />
            <span>Next.js App Router</span>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
