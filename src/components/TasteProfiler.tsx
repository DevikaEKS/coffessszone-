import React, { useState } from 'react';
import { Sparkles, RefreshCw, CheckCircle2, ArrowRight, Coffee, Droplets } from 'lucide-react';
import { MENU_ITEMS } from '../data/coffeeData';
import { MenuItem, CartItem } from '../types/coffee';

interface TasteProfilerProps {
  onAddToCart: (cartItem: CartItem) => void;
  onOpenCustomize: (item: MenuItem) => void;
}

export const TasteProfiler: React.FC<TasteProfilerProps> = ({
  onAddToCart,
  onOpenCustomize,
}) => {
  const [step, setStep] = useState<number>(1);
  const [brewMethod, setBrewMethod] = useState<string>('pourover');
  const [flavorPreference, setFlavorPreference] = useState<string>('floral');
  const [bodyPreference, setBodyPreference] = useState<string>('tea-like');
  const [matchedItem, setMatchedItem] = useState<MenuItem | null>(null);
  const [addedToast, setAddedToast] = useState(false);

  // Compute recommendation
  const calculateMatch = () => {
    let matchedId = 'beans-solar-blend';

    if (flavorPreference === 'decaf') {
      matchedId = 'beans-decaf-mountain-water';
    } else if (flavorPreference === 'floral' || bodyPreference === 'tea-like') {
      matchedId = 'beans-ethiopia-idido';
    } else if (flavorPreference === 'tropical' || flavorPreference === 'fruit') {
      matchedId = 'beans-colombia-pink-bourbon';
    } else {
      matchedId = 'beans-solar-blend';
    }

    const found = MENU_ITEMS.find((i) => i.id === matchedId) || MENU_ITEMS[0];
    setMatchedItem(found);
    setStep(4); // Results step
  };

  const handleReset = () => {
    setStep(1);
    setMatchedItem(null);
  };

  const handleAddMatchedToCart = () => {
    if (!matchedItem) return;
    onOpenCustomize(matchedItem);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <section id="taste-profiler" className="py-20 lg:py-28 bg-[#f5efe6] border-t border-[#231F1C]/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7f5e3e] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Roaster Match</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#231F1C] tracking-tight">
            Find Your Daily Extract
          </h2>
          <p className="mt-3 text-sm text-[#4a3424] font-light leading-relaxed">
            Answer three quick questions about how you brew at home. We will tailor your optimal origin bean lot and exact brew parameters.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-[#FAF7F2] rounded-xs border border-[#231F1C]/15 shadow-sm p-6 sm:p-10">
          
          {/* Progress Indicator (Unboxed Text with Separator) */}
          <div className="flex items-center justify-between text-xs font-medium text-[#7f5e3e] pb-6 mb-8 border-b border-[#231F1C]/10">
            <div className="flex items-center gap-2">
              <span className={step >= 1 ? 'text-[#231F1C] font-semibold' : ''}>01. Brew Method</span>
              <span aria-hidden="true">·</span>
              <span className={step >= 2 ? 'text-[#231F1C] font-semibold' : ''}>02. Palate Flavor</span>
              <span aria-hidden="true">·</span>
              <span className={step >= 3 ? 'text-[#231F1C] font-semibold' : ''}>03. Body & Finish</span>
            </div>
            <span className="font-mono tabular-nums">
              {step <= 3 ? `Step ${step} of 3` : 'Result'}
            </span>
          </div>

          {/* STEP 1: Brew Method */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-serif-display text-2xl font-semibold text-[#231F1C]">
                How do you brew your morning coffee?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    id: 'pourover',
                    title: 'Hario V60 / Origami / Chemex',
                    desc: 'Paper filter hand pour with crystal clarity and vibrant floral nuances.',
                  },
                  {
                    id: 'espresso',
                    title: 'Espresso Machine / Lever',
                    desc: 'High-pressure 9-bar extraction with thick crema and concentrated sweetness.',
                  },
                  {
                    id: 'immersion',
                    title: 'French Press / Cold Brew',
                    desc: 'Full immersion steeped brew with heavy tactile body and comforting warmth.',
                  },
                  {
                    id: 'aeropress',
                    title: 'AeroPress / Moka Pot',
                    desc: 'Versatile hybrid extraction balancing richness and clean definition.',
                  },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setBrewMethod(option.id);
                      setStep(2);
                    }}
                    className={`p-4 rounded-xs border text-left transition-all cursor-pointer group ${
                      brewMethod === option.id
                        ? 'border-[#7f5e3e] bg-[#f5efe6]'
                        : 'border-[#231F1C]/15 bg-white hover:border-[#7f5e3e]/50'
                    }`}
                  >
                    <div className="font-semibold text-sm text-[#231F1C] group-hover:text-[#7f5e3e] transition-colors">
                      {option.title}
                    </div>
                    <p className="text-xs text-[#63472e] mt-1 leading-relaxed">
                      {option.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Flavor Notes */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-serif-display text-2xl font-semibold text-[#231F1C]">
                Which flavor notes ignite your palate?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    id: 'floral',
                    title: 'Jasmine, Bergamot & White Peach',
                    desc: 'Delicate tea-like aromatics with crisp Meyer lemon acidity.',
                  },
                  {
                    id: 'chocolate',
                    title: 'Dark Chocolate, Praline & Brown Butter',
                    desc: 'Deep comforting cocoa notes with caramelized pecan richness.',
                  },
                  {
                    id: 'tropical',
                    title: 'Pink Guava, Passionfruit & Honey',
                    desc: 'Juicy, dynamic anaerobic fruit sweetness with wine-like complexity.',
                  },
                  {
                    id: 'decaf',
                    title: 'Gentle Decaf: Roasted Almond & Cinnamon',
                    desc: 'Pure mountain water decaf without chemical solvents, soothing & sweet.',
                  },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setFlavorPreference(option.id);
                      setStep(3);
                    }}
                    className={`p-4 rounded-xs border text-left transition-all cursor-pointer group ${
                      flavorPreference === option.id
                        ? 'border-[#7f5e3e] bg-[#f5efe6]'
                        : 'border-[#231F1C]/15 bg-white hover:border-[#7f5e3e]/50'
                    }`}
                  >
                    <div className="font-semibold text-sm text-[#231F1C] group-hover:text-[#7f5e3e] transition-colors">
                      {option.title}
                    </div>
                    <p className="text-xs text-[#63472e] mt-1 leading-relaxed">
                      {option.desc}
                    </p>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-[#7f5e3e] hover:text-[#231F1C] underline cursor-pointer"
                >
                  ← Back to Brew Method
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Body & Mouthfeel */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-serif-display text-2xl font-semibold text-[#231F1C]">
                What cup texture do you crave?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {[
                  {
                    id: 'tea-like',
                    title: 'Tea-Like & Crisp',
                    desc: 'Light body, razor-sharp botanical finish, refreshing clarity.',
                  },
                  {
                    id: 'velvety',
                    title: 'Silky & Balanced',
                    desc: 'Medium mouthfeel, round sweetness, harmonious lingering aftertaste.',
                  },
                  {
                    id: 'syrupy',
                    title: 'Syrupy & Heavy',
                    desc: 'Dense extraction, coating body, luxurious caramel lingering finish.',
                  },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setBodyPreference(option.id);
                    }}
                    className={`p-4 rounded-xs border text-left transition-all cursor-pointer group ${
                      bodyPreference === option.id
                        ? 'border-[#7f5e3e] bg-[#f5efe6]'
                        : 'border-[#231F1C]/15 bg-white hover:border-[#7f5e3e]/50'
                    }`}
                  >
                    <div className="font-semibold text-sm text-[#231F1C] group-hover:text-[#7f5e3e] transition-colors">
                      {option.title}
                    </div>
                    <p className="text-xs text-[#63472e] mt-1 leading-relaxed">
                      {option.desc}
                    </p>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-[#7f5e3e] hover:text-[#231F1C] underline cursor-pointer"
                >
                  ← Back to Flavor
                </button>

                <button
                  onClick={calculateMatch}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#FAF7F2] bg-[#251910] hover:bg-[#422f1f] rounded-xs cursor-pointer shadow-xs"
                >
                  <span>Reveal My Matched Lot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: RECOMMENDATION RESULT */}
          {step === 4 && matchedItem && (
            <div className="animate-in fade-in zoom-in-95 duration-200">
              <div className="bg-[#FAF7F2] border border-[#7f5e3e]/30 rounded-xs p-6 sm:p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#7f5e3e]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Curated Roaster Match</span>
                      <span aria-hidden="true">·</span>
                      <span>{matchedItem.category.toUpperCase()}</span>
                    </div>

                    <h3 className="font-serif-display text-3xl font-semibold text-[#231F1C]">
                      {matchedItem.name}
                    </h3>

                    {matchedItem.japaneseName && (
                      <span className="text-xs text-[#7f5e3e] block">
                        {matchedItem.japaneseName}
                      </span>
                    )}

                    <p className="text-sm text-[#4a3424] leading-relaxed">
                      {matchedItem.description}
                    </p>

                    {/* Terroir & Origin specs */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 text-xs text-[#63472e] border-t border-[#231F1C]/10">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#7f5e3e] block">Origin</span>
                        <span className="font-medium text-[#231F1C]">{matchedItem.origin || 'Direct Micro-Lot'}</span>
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#7f5e3e] block">Process</span>
                        <span className="font-medium text-[#231F1C]">{matchedItem.process || 'Washed'}</span>
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#7f5e3e] block">Roast Level</span>
                        <span className="font-medium text-[#231F1C]">{matchedItem.roastLevel || 'Light'}</span>
                      </div>
                    </div>

                    {/* Tasting notes */}
                    {matchedItem.tastingNotes && (
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#7f5e3e]">
                        <span className="font-semibold text-[#231F1C]">Notes:</span>
                        {matchedItem.tastingNotes.map((n, i) => (
                          <React.Fragment key={n}>
                            <span>{n}</span>
                            {i < matchedItem.tastingNotes!.length - 1 && <span>·</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    {/* Tailored Barista Brew Recipe */}
                    <div className="bg-[#f5efe6] p-4 rounded-xs border border-[#231F1C]/10 space-y-2 text-xs">
                      <div className="font-semibold text-[#231F1C] flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-[#7f5e3e]" />
                        <span>Recommended Extraction Recipe</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 font-mono tabular-nums text-[#4a3424]">
                        <div>Dose: <span className="font-semibold text-[#231F1C]">16.0g</span></div>
                        <div>Water: <span className="font-semibold text-[#231F1C]">256g (1:16)</span></div>
                        <div>Temp: <span className="font-semibold text-[#231F1C]">93.5°C</span></div>
                      </div>
                      <div className="text-[11px] text-[#63472e]">
                        Drawdown target: 2 min 40 sec. Medium-fine grind (24 clicks Comandante).
                      </div>
                    </div>
                  </div>

                  {/* Actions & Price card */}
                  <div className="md:w-60 bg-white p-5 rounded-xs border border-[#231F1C]/15 flex flex-col justify-between shrink-0 shadow-xs">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-[#7f5e3e]">Price per 250g bag</div>
                      <div className="font-mono tabular-nums text-2xl font-bold text-[#231F1C] mt-1">
                        ${matchedItem.price.toFixed(2)}
                      </div>
                      <div className="text-[11px] text-[#63472e] mt-1">
                        Includes custom valve bag & roast date stamp.
                      </div>
                    </div>

                    <div className="space-y-2 mt-6">
                      <button
                        onClick={handleAddMatchedToCart}
                        className="w-full py-2.5 px-3 text-xs font-semibold tracking-wider uppercase text-[#FAF7F2] bg-[#251910] hover:bg-[#422f1f] rounded-xs cursor-pointer transition-colors shadow-xs"
                      >
                        Customize & Bag
                      </button>

                      <button
                        onClick={handleReset}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-[#7f5e3e] hover:text-[#231F1C] hover:bg-[#f5efe6] rounded-xs cursor-pointer transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Retake Profiler</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
