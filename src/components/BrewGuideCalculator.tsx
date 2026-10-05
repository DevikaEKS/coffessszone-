import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Droplets, Flame, Scale, Clock, Award } from 'lucide-react';

export const BrewGuideCalculator: React.FC = () => {
  const [dose, setDose] = useState<number>(18);
  const [ratio, setRatio] = useState<number>(16);
  const [method, setMethod] = useState<'v60' | 'chemex' | 'aeropress' | 'frenchpress'>('v60');

  // Interactive Stopwatch
  const [seconds, setSeconds] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!timerRunning && seconds !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, seconds]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResetTimer = () => {
    setTimerRunning(false);
    setSeconds(0);
  };

  // Calculations
  const totalWater = Math.round(dose * ratio);
  const bloomWater = Math.round(dose * 3);
  const firstPourWater = Math.round(totalWater * 0.6);
  const finalPourWater = totalWater;

  const methodDetails = {
    v60: {
      name: 'Hario V60 (Spiral Pour)',
      temp: '93°C / 200°F',
      grind: 'Medium-Fine (Sea Salt)',
      targetTime: '2:45 – 3:15',
    },
    chemex: {
      name: 'Chemex (Thick Bonded Filter)',
      temp: '94°C / 202°F',
      grind: 'Medium-Coarse (Kosher Salt)',
      targetTime: '3:45 – 4:30',
    },
    aeropress: {
      name: 'AeroPress (Inverted Method)',
      temp: '88°C / 190°F',
      grind: 'Fine-Medium (Table Salt)',
      targetTime: '1:45 – 2:15',
    },
    frenchpress: {
      name: 'French Press (Full Immersion)',
      temp: '95°C / 204°F',
      grind: 'Coarse (Cracked Pepper)',
      targetTime: '4:00 – 4:30',
    },
  }[method];

  return (
    <section id="brew-guide" className="py-20 lg:py-28 bg-[#FAF7F2] border-t border-[#231F1C]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#231F1C]/10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#7f5e3e] mb-2">
              Barista Math · Precision Science
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#231F1C] tracking-tight">
              Pour-Over Ratio Calculator
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-[#4a3424] max-w-md font-light leading-relaxed">
            Calibrate your home extraction mathematically. Fine-tune your coffee dose, golden ratio, and track pour intervals in real-time.
          </p>
        </div>

        {/* Method Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {[
            { id: 'v60', label: 'Hario V60 Crystal' },
            { id: 'chemex', label: 'Chemex Classic' },
            { id: 'aeropress', label: 'AeroPress' },
            { id: 'frenchpress', label: 'French Press' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id as any)}
              className={`px-4 py-2 text-xs font-semibold tracking-wide uppercase rounded-xs transition-colors cursor-pointer whitespace-nowrap ${
                method === m.id
                  ? 'bg-[#251910] text-[#FAF7F2]'
                  : 'bg-[#f5efe6] text-[#4a3424] hover:bg-[#e9decf]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#231F1C]/10 shadow-xs space-y-8">
              
              {/* Dose Adjuster */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#231F1C] flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-[#7f5e3e]" />
                    <span>Dry Coffee Dose</span>
                  </label>
                  <span className="font-mono tabular-nums text-lg font-bold text-[#231F1C]">
                    {dose}g
                  </span>
                </div>

                <input
                  type="range"
                  min="12"
                  max="36"
                  step="1"
                  value={dose}
                  onChange={(e) => setDose(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-[#e9decf] rounded-lg appearance-none cursor-pointer accent-[#251910]"
                />

                <div className="flex items-center justify-between gap-2 mt-3">
                  {[15, 18, 20, 24, 30].map((quickVal) => (
                    <button
                      key={quickVal}
                      onClick={() => setDose(quickVal)}
                      className={`px-2.5 py-1 text-xs font-mono rounded-xs border transition-colors cursor-pointer ${
                        dose === quickVal
                          ? 'border-[#251910] bg-[#251910] text-white'
                          : 'border-[#231F1C]/15 text-[#4a3424] hover:border-[#231F1C]/40'
                      }`}
                    >
                      {quickVal}g
                    </button>
                  ))}
                </div>
              </div>

              {/* Ratio Adjuster */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#231F1C] flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-[#7f5e3e]" />
                    <span>Brew Water Ratio</span>
                  </label>
                  <span className="font-mono tabular-nums text-lg font-bold text-[#231F1C]">
                    1:{ratio}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 15, label: '1:15 · Syrupy & Dense' },
                    { val: 16, label: '1:16 · Golden Standard' },
                    { val: 17, label: '1:17 · Tea-Like & Crisp' },
                  ].map((r) => (
                    <button
                      key={r.val}
                      onClick={() => setRatio(r.val)}
                      className={`p-2.5 text-xs text-center rounded-xs border transition-colors cursor-pointer ${
                        ratio === r.val
                          ? 'border-[#251910] bg-[#251910] text-[#FAF7F2] font-semibold'
                          : 'border-[#231F1C]/15 bg-[#FAF7F2] text-[#4a3424] hover:border-[#231F1C]/40'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipe Target Summary Grid */}
              <div className="pt-6 border-t border-[#231F1C]/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-[#f5efe6] p-3 rounded-xs">
                  <span className="text-[11px] uppercase tracking-wider text-[#7f5e3e] block">Total Water</span>
                  <span className="font-mono tabular-nums text-lg font-bold text-[#231F1C] block mt-0.5">
                    {totalWater}g
                  </span>
                </div>
                <div className="bg-[#f5efe6] p-3 rounded-xs">
                  <span className="text-[11px] uppercase tracking-wider text-[#7f5e3e] block">Water Temp</span>
                  <span className="font-mono tabular-nums text-sm font-semibold text-[#231F1C] block mt-1">
                    {methodDetails.temp}
                  </span>
                </div>
                <div className="bg-[#f5efe6] p-3 rounded-xs">
                  <span className="text-[11px] uppercase tracking-wider text-[#7f5e3e] block">Grind Size</span>
                  <span className="text-xs font-semibold text-[#231F1C] block mt-1 truncate" title={methodDetails.grind}>
                    {methodDetails.grind}
                  </span>
                </div>
                <div className="bg-[#f5efe6] p-3 rounded-xs">
                  <span className="text-[11px] uppercase tracking-wider text-[#7f5e3e] block">Target Draw</span>
                  <span className="font-mono tabular-nums text-sm font-semibold text-[#231F1C] block mt-1">
                    {methodDetails.targetTime}
                  </span>
                </div>
              </div>

            </div>

            {/* Brewing Steps */}
            <div className="bg-[#FAF7F2] border border-[#231F1C]/15 rounded-xs p-6 space-y-4">
              <h3 className="font-serif-display text-xl font-semibold text-[#231F1C]">
                4-Stage Pour Protocol
              </h3>

              <div className="space-y-3 text-xs text-[#4a3424]">
                <div className="flex items-start gap-3 p-3 bg-white rounded-xs border border-[#231F1C]/10">
                  <span className="font-mono text-[#7f5e3e] font-semibold shrink-0">0:00 - 0:45</span>
                  <div>
                    <span className="font-semibold text-[#231F1C] block">Phase 1: The Bloom ({bloomWater}g)</span>
                    <p className="text-[#63472e] mt-0.5">Pour {bloomWater}g water gently from center outward to saturate coffee grounds. Swirl once and let CO2 degas for 45 seconds.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-xs border border-[#231F1C]/10">
                  <span className="font-mono text-[#7f5e3e] font-semibold shrink-0">0:45 - 1:30</span>
                  <div>
                    <span className="font-semibold text-[#231F1C] block">Phase 2: Center Pulse to {firstPourWater}g</span>
                    <p className="text-[#63472e] mt-0.5">Pour in steady, slow spirals outward, keeping water level 1 inch below the rim. Focus stream on dark coffee slurry.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-xs border border-[#231F1C]/10">
                  <span className="font-mono text-[#7f5e3e] font-semibold shrink-0">1:30 - 2:15</span>
                  <div>
                    <span className="font-semibold text-[#231F1C] block">Phase 3: Top-Up to {finalPourWater}g</span>
                    <p className="text-[#63472e] mt-0.5">Complete final pour up to {finalPourWater}g total. Give one gentle circular swirl to wash fines off filter walls.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-xs border border-[#231F1C]/10">
                  <span className="font-mono text-[#7f5e3e] font-semibold shrink-0">2:15 - 3:00</span>
                  <div>
                    <span className="font-semibold text-[#231F1C] block">Phase 4: Final Drawdown & Serve</span>
                    <p className="text-[#63472e] mt-0.5">Allow all liquid to filter through. Coffee bed should settle flat. Swirl carafe and pour into pre-warmed ceramic.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stopwatch Companion Column (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xs border border-[#231F1C]/15 shadow-xs sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-[#231F1C]/10">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7f5e3e]">
                <Clock className="w-3.5 h-3.5" />
                <span>Barista Kettle Timer</span>
              </div>
              <span className="text-xs text-[#63472e]">Live Stopwatch</span>
            </div>

            {/* Huge Tabular Stopwatch Display */}
            <div className="py-8 text-center">
              <div className="font-mono tabular-nums text-5xl sm:text-6xl font-light text-[#231F1C] tracking-tight">
                {formatTimer(seconds)}
              </div>
              
              {/* Dynamic current phase indicator based on elapsed seconds */}
              <div className="mt-3 text-xs font-medium text-[#7f5e3e]">
                {seconds === 0 && 'Ready to pour bloom'}
                {seconds > 0 && seconds <= 45 && 'Phase 1: Bloom saturation in progress...'}
                {seconds > 45 && seconds <= 90 && `Phase 2: Pour to ${firstPourWater}g...`}
                {seconds > 90 && seconds <= 135 && `Phase 3: Final pour to ${finalPourWater}g...`}
                {seconds > 135 && seconds <= 190 && 'Phase 4: Drawdown & aeration...'}
                {seconds > 190 && 'Brew complete. Enjoy your extract!'}
              </div>
            </div>

            {/* Timer Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className={`flex-1 py-3 px-4 text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                  timerRunning
                    ? 'bg-amber-800 text-white hover:bg-amber-900'
                    : 'bg-[#251910] text-[#FAF7F2] hover:bg-[#422f1f]'
                }`}
              >
                {timerRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Start Timer</span>
                  </>
                )}
              </button>

              <button
                onClick={handleResetTimer}
                className="p-3 text-[#4a3424] hover:text-[#231F1C] bg-[#f5efe6] hover:bg-[#e9decf] rounded-xs cursor-pointer transition-colors"
                aria-label="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Water Purity & Pro Barista Note */}
            <div className="mt-6 pt-6 border-t border-[#231F1C]/10 text-xs text-[#63472e] space-y-2">
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#7f5e3e] shrink-0 mt-0.5" />
                <p>
                  <strong>Komorebi Standard:</strong> We brew using mineral-balanced water at 80 PPM total hardness with 40 PPM alkalinity for optimum citric vibrance.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
