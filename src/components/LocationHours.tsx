import React, { useState } from 'react';
import { MapPin, Clock, Wifi, Disc, Dog, Car, Copy, Check, Send } from 'lucide-react';

export const LocationHours: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');

  const address = '428 Pine Street, Historic Arts District, CA 90013';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
    }, 4000);
  };

  return (
    <section id="visit" className="py-20 lg:py-28 bg-[#f5efe6] border-t border-[#231F1C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#231F1C]/10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#7f5e3e] mb-2">
              Sanctuary in the Arts District
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#231F1C] tracking-tight">
              Hours & Slow Bar Visit
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-[#4a3424] max-w-md font-light leading-relaxed">
            Designed as an acoustic respite from urban bustle. Natural plaster walls, natural oak counters, and morning sunshine through heritage loft windows.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Hours, Location & Amenities (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Hours Table Card */}
            <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#231F1C]/10 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#231F1C]/10 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#7f5e3e]" />
                  <h3 className="font-serif-display text-xl font-semibold text-[#231F1C]">
                    Roastery Operating Hours
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Bar Open Today
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                {[
                  { day: 'Monday – Thursday', hours: '6:30 AM – 6:30 PM' },
                  { day: 'Friday', hours: '6:30 AM – 7:30 PM' },
                  { day: 'Saturday (Dawn Baking)', hours: '7:00 AM – 7:30 PM' },
                  { day: 'Sunday (Slow Bar Cupping)', hours: '7:00 AM – 6:00 PM' },
                ].map((schedule) => (
                  <div key={schedule.day} className="flex justify-between py-1.5 border-b border-[#231F1C]/5">
                    <span className="text-[#4a3424] font-sans">{schedule.day}</span>
                    <span className="text-[#231F1C] font-semibold tabular-nums">{schedule.hours}</span>
                  </div>
                ))}
              </div>

              {/* Address & Copy Action */}
              <div className="mt-6 pt-4 border-t border-[#231F1C]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#231F1C]">
                  <MapPin className="w-4 h-4 text-[#7f5e3e] shrink-0" />
                  <span className="font-medium">{address}</span>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7f5e3e] hover:text-[#231F1C] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Address Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Space Amenities Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-4 rounded-xs border border-[#231F1C]/10 space-y-1">
                <Wifi className="w-4 h-4 text-[#7f5e3e]" />
                <span className="font-semibold text-[#231F1C] block">Gigabit Fiber</span>
                <span className="text-[11px] text-[#63472e] block">Concealed power plugs</span>
              </div>
              <div className="bg-white p-4 rounded-xs border border-[#231F1C]/10 space-y-1">
                <Disc className="w-4 h-4 text-[#7f5e3e]" />
                <span className="font-semibold text-[#231F1C] block">Analog Vinyl</span>
                <span className="text-[11px] text-[#63472e] block">Acoustic warmth only</span>
              </div>
              <div className="bg-white p-4 rounded-xs border border-[#231F1C]/10 space-y-1">
                <Dog className="w-4 h-4 text-[#7f5e3e]" />
                <span className="font-semibold text-[#231F1C] block">Dog Patio</span>
                <span className="text-[11px] text-[#63472e] block">Shaded garden bowls</span>
              </div>
              <div className="bg-white p-4 rounded-xs border border-[#231F1C]/10 space-y-1">
                <Car className="w-4 h-4 text-[#7f5e3e]" />
                <span className="font-semibold text-[#231F1C] block">Quick Bays</span>
                <span className="text-[11px] text-[#63472e] block">15-min curbside pickup</span>
              </div>
            </div>

          </div>

          {/* Right Column: Private Events & Barista Direct Inquiry (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xs border border-[#231F1C]/10 shadow-xs">
            <div className="pb-4 border-b border-[#231F1C]/10 mb-5">
              <h3 className="font-serif-display text-xl font-semibold text-[#231F1C]">
                Cupping Workshops & Catering
              </h3>
              <p className="text-xs text-[#63472e] mt-1">
                Inquire about private slow-bar cupping sessions, whole-bean office subscriptions, or custom event espresso bar services.
              </p>
            </div>

            {inquirySent ? (
              <div className="p-6 bg-[#FAF7F2] border border-emerald-300 text-center rounded-xs space-y-2">
                <Check className="w-6 h-6 text-emerald-700 mx-auto" />
                <div className="text-sm font-serif-display font-semibold text-[#231F1C]">
                  Message Dispatched
                </div>
                <p className="text-xs text-[#63472e]">
                  Our lead roaster will reply within 24 hours. Thank you!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold uppercase tracking-wider text-[#231F1C] block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Maya Chen"
                    className="w-full p-2.5 rounded-xs border border-[#231F1C]/15 bg-[#FAF7F2] text-[#231F1C] focus:outline-hidden focus:border-[#7f5e3e]"
                  />
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider text-[#231F1C] block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="maya@domain.com"
                    className="w-full p-2.5 rounded-xs border border-[#231F1C]/15 bg-[#FAF7F2] text-[#231F1C] focus:outline-hidden focus:border-[#7f5e3e]"
                  />
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider text-[#231F1C] block mb-1">
                    Inquiry Details
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Tell us about your event date, wholesale bean volume, or cupping class interests..."
                    className="w-full p-2.5 rounded-xs border border-[#231F1C]/15 bg-[#FAF7F2] text-[#231F1C] focus:outline-hidden focus:border-[#7f5e3e]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-semibold tracking-wider uppercase text-[#FAF7F2] bg-[#251910] hover:bg-[#422f1f] rounded-xs cursor-pointer transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Roastery Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
