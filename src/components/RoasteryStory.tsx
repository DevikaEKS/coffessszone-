import React from 'react';
import { POUROVER_IMAGE, PASTRY_IMAGE } from '../data/coffeeData';
import { ShieldCheck, Flame, Leaf, Award } from 'lucide-react';

export const RoasteryStory: React.FC = () => {
  return (
    <section id="roastery" className="py-20 lg:py-28 bg-[#FAF7F2] border-t border-[#231F1C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7f5e3e] mb-3">
            <span>Our Philosophy</span>
            <span aria-hidden="true">·</span>
            <span>Origin Transparency</span>
            <span aria-hidden="true">·</span>
            <span>Single-Elevation Craft</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#231F1C] tracking-tight leading-[1.12]">
            Komorebi represents sunlight filtering through trees. We seek that same quiet clarity in the cup.
          </h2>
        </div>

        {/* 2-Column Split: Visual Story & Craft Ethos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Left Column: Visual asset with fallback */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-4/3 overflow-hidden rounded-xs bg-[#f5efe6] shadow-sm border border-[#231F1C]/10">
              <img
                src={POUROVER_IMAGE}
                alt="Artisanal pour-over coffee extraction in action with crystal V60 and steaming aromatic bloom"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-500"
              />
            </div>
            {/* Subtle caption */}
            <div className="flex items-center justify-between text-xs text-[#7f5e3e] mt-3">
              <span>Single Origin Extraction · Hario V60 Crystal Cone</span>
              <span className="font-mono">93.5°C · 1:16 Ratio</span>
            </div>
          </div>

          {/* Right Column: Craft Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#231F1C]">
                Loring Convection Roasting
              </h3>
              <p className="text-sm text-[#4a3424] leading-relaxed">
                Traditional drum roasters apply direct metal heat that risks scorching delicate coffee bean cells. At Komorebi, we roast exclusively on a Loring S15 Kestrel single-burner convection roaster. Super-heated recirculated air transfers energy gently and uniformly, preserving volatile floral aldehydes and sparkling stone fruit acidity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#231F1C]/10 text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-[#231F1C] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#7f5e3e]" />
                  Zero Conductive Char
                </span>
                <p className="text-[#63472e]">
                  Air-roasted cleanly without harsh carbon bitterness or smoky residue.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-[#231F1C] flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-[#7f5e3e]" />
                  80% Reduced Carbon
                </span>
                <p className="text-[#63472e]">
                  Closed-loop thermal air recirculation drastically slashes roastery energy usage.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Second Split: Dawn Bakery & Sourdough Fermentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#231F1C]">
                Baking at Dawn: Wild Levain & Spices
              </h3>
              <p className="text-sm text-[#4a3424] leading-relaxed">
                Every pastry is made by hand in our on-site micro-bakery. Our laminated croissants and sourdough cardamom knots begin with a wild sourdough mother nurtured since 2019. We ferment our doughs slowly over 36 hours, pairing French cultured butter with freshly crushed organic green cardamom pods and Maldon sea salt flakes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#231F1C]/10 text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-[#231F1C] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#7f5e3e]" />
                  36-Hour Cold Proof
                </span>
                <p className="text-[#63472e]">
                  Develops complex organic acids and natural airy honeycombed lamination.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-[#231F1C] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7f5e3e]" />
                  Unbleached Heritage Wheat
                </span>
                <p className="text-[#63472e]">
                  Stone-milled regional grains with intact germ and vibrant natural nuttiness.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="aspect-4/3 overflow-hidden rounded-xs bg-[#f5efe6] shadow-sm border border-[#231F1C]/10">
              <img
                src={PASTRY_IMAGE}
                alt="Freshly baked artisanal sourdough cardamom knots and laminated croissants"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-500"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-[#7f5e3e] mt-3">
              <span>Sourdough Cardamom Knots & Frangipane Lamination</span>
              <span className="font-mono">Daily 5:00 AM Bake</span>
            </div>
          </div>

        </div>

        {/* Direct-Trade Producer Transparency Cards */}
        <div className="pt-12 border-t border-[#231F1C]/10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#231F1C]">
              Direct Producer Partnerships
            </h3>
            <p className="text-xs text-[#63472e] mt-2">
              We visit our partner producers at origin every harvest season, contracting at least 140% above fair-trade baseline floor prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                region: 'Huila, Colombia',
                farm: 'Finca Las Flores',
                producer: 'Jhoan Vergara',
                varietals: 'Pink Bourbon, Sidra, Chiroso',
                altitude: '1,750 MASL',
                contract: 'Direct Trade · 5th Year',
              },
              {
                region: 'Gedeo, Ethiopia',
                farm: 'Idido Washing Station',
                producer: '650 Smallholder Families',
                varietals: 'Ancestral Heirloom Landraces',
                altitude: '2,150 MASL',
                contract: 'Community Premium Shared',
              },
              {
                region: 'Boquete, Panama',
                farm: 'Hacienda La Esmeralda',
                producer: 'Peterson Family',
                varietals: 'Green-Tip Gesha',
                altitude: '1,800 MASL',
                contract: 'Reserve Auction Direct',
              },
            ].map((p) => (
              <div
                key={p.farm}
                className="bg-white p-5 rounded-xs border border-[#231F1C]/10 space-y-3"
              >
                <div className="flex items-center justify-between text-[11px] text-[#7f5e3e] font-mono">
                  <span>{p.altitude}</span>
                  <span className="text-emerald-700 font-medium">{p.contract}</span>
                </div>

                <div>
                  <h4 className="font-serif-display text-lg font-semibold text-[#231F1C]">
                    {p.farm}
                  </h4>
                  <span className="text-xs text-[#7f5e3e] block">{p.region}</span>
                </div>

                <div className="pt-2 border-t border-[#231F1C]/5 text-xs text-[#4a3424] space-y-1">
                  <div>
                    <span className="text-[#7f5e3e]">Grower:</span> {p.producer}
                  </div>
                  <div>
                    <span className="text-[#7f5e3e]">Varietals:</span> {p.varietals}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
