import React, { useState } from 'react';
import { TASTING_FLIGHTS } from '../data/coffeeData';
import { ReservationData } from '../types/coffee';
import { Calendar, Clock, Users, CheckCircle, Sparkles, MapPin, Coffee, X } from 'lucide-react';

interface SlowBarReservationProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const SlowBarReservation: React.FC<SlowBarReservationProps> = ({
  isOpenModal = false,
  onCloseModal,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '11:30 AM',
    guests: 2,
    zone: 'Slow Bar Tasting Counter' as ReservationData['zone'],
    flightOption: 'The African Terroir Flight',
    specialOccasion: '',
  });

  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);

  const timeSlots = [
    '9:00 AM',
    '10:30 AM',
    '11:30 AM',
    '1:00 PM',
    '2:30 PM',
    '4:00 PM',
    '5:30 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const reservation: ReservationData = {
      id: `KMRB-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '(555) 234-8910',
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      zone: formData.zone,
      flightOption: formData.flightOption,
      specialOccasion: formData.specialOccasion,
    };

    setConfirmedReservation(reservation);
  };

  const content = (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7f5e3e] mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>Table & Counter Reservations</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#231F1C] tracking-tight">
          Reserve the Brewster Counter
        </h2>
        <p className="mt-3 text-sm text-[#4a3424] font-light leading-relaxed">
          Sit face-to-face with our head baristas for a multi-origin cupping flight, or reserve a tranquil table in our solarium courtyard.
        </p>
      </div>

      {confirmedReservation ? (
        /* Confirmation State */
        <div className="bg-white rounded-xs border border-[#7f5e3e]/30 shadow-md p-8 text-center animate-in fade-in duration-300">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6" />
          </div>

          <div className="text-xs font-mono uppercase tracking-wider text-[#7f5e3e]">
            Reservation Confirmed
          </div>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#231F1C] mt-1 mb-2">
            We look forward to hosting you, {confirmedReservation.name}
          </h3>
          <p className="text-xs text-[#63472e] max-w-md mx-auto mb-6">
            A confirmation has been dispatched to <strong>{confirmedReservation.email}</strong>. Please arrive 5 minutes prior to your allocated slot.
          </p>

          {/* Ticket Card */}
          <div className="max-w-md mx-auto bg-[#FAF7F2] p-5 rounded-xs border border-[#231F1C]/15 text-left space-y-3 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-[#231F1C]/10 text-xs">
              <span className="font-mono text-[#7f5e3e]">Reference ID</span>
              <span className="font-mono font-bold text-[#231F1C]">{confirmedReservation.id}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#7f5e3e] uppercase text-[10px] block">Date & Time</span>
                <span className="font-semibold text-[#231F1C]">{confirmedReservation.date} at {confirmedReservation.time}</span>
              </div>
              <div>
                <span className="text-[#7f5e3e] uppercase text-[10px] block">Seating Area</span>
                <span className="font-semibold text-[#231F1C]">{confirmedReservation.zone}</span>
              </div>
              <div>
                <span className="text-[#7f5e3e] uppercase text-[10px] block">Party Size</span>
                <span className="font-semibold text-[#231F1C]">{confirmedReservation.guests} Guest(s)</span>
              </div>
              <div>
                <span className="text-[#7f5e3e] uppercase text-[10px] block">Tasting Flight</span>
                <span className="font-semibold text-[#231F1C] truncate block" title={confirmedReservation.flightOption}>
                  {confirmedReservation.flightOption || 'Standard Service'}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#231F1C]/10 flex items-center justify-between text-[11px] text-[#63472e]">
              <span>Komorebi Roasters · 428 Pine St</span>
              <span className="text-emerald-700 font-medium">Table Reserved</span>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={() => setConfirmedReservation(null)}
              className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#231F1C] bg-[#FAF7F2] border border-[#231F1C]/20 hover:bg-[#e9decf] rounded-xs cursor-pointer transition-colors"
            >
              Book Another Time
            </button>
            {onCloseModal && (
              <button
                onClick={onCloseModal}
                className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#FAF7F2] bg-[#251910] hover:bg-[#422f1f] rounded-xs cursor-pointer transition-colors"
              >
                Done
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Reservation Form */
        <form onSubmit={handleSubmit} className="bg-white rounded-xs border border-[#231F1C]/15 shadow-xs p-6 sm:p-10 space-y-8">
          
          {/* 1. Zone Selection */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#231F1C] block">
              1. Choose Seating Atmosphere
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'Slow Bar Tasting Counter',
                  title: 'Slow Bar Counter',
                  desc: 'Direct barista view, origin cupping dialogue.',
                },
                {
                  id: 'Sunlit Solarium',
                  title: 'Sunlit Solarium',
                  desc: 'Airy atrium, tropical greenery, natural sunlight.',
                },
                {
                  id: 'Cedar Library Nook',
                  title: 'Cedar Library',
                  desc: 'Whisper-quiet acoustic corner with coffee books.',
                },
              ].map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, zone: zone.id as any })}
                  className={`p-3.5 text-left rounded-xs border transition-all cursor-pointer ${
                    formData.zone === zone.id
                      ? 'border-[#7f5e3e] bg-[#f5efe6]'
                      : 'border-[#231F1C]/15 bg-[#FAF7F2] hover:border-[#231F1C]/40'
                  }`}
                >
                  <div className="text-xs font-semibold text-[#231F1C]">{zone.title}</div>
                  <div className="text-[11px] text-[#63472e] mt-1">{zone.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Date, Time & Party */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#231F1C] block mb-2">
                Date
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xs border border-[#231F1C]/20 bg-[#FAF7F2] text-[#231F1C] focus:outline-hidden focus:border-[#7f5e3e]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#231F1C] block mb-2">
                Time Slot
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xs border border-[#231F1C]/20 bg-[#FAF7F2] text-[#231F1C] focus:outline-hidden focus:border-[#7f5e3e]"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#231F1C] block mb-2">
                Guests
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                className="w-full text-xs p-2.5 rounded-xs border border-[#231F1C]/20 bg-[#FAF7F2] text-[#231F1C] focus:outline-hidden focus:border-[#7f5e3e]"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Optional Tasting Flight Selection */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#231F1C] block">
              Optional: Curated Slow Bar Tasting Experience
            </label>
            <div className="space-y-2">
              {TASTING_FLIGHTS.map((flight) => (
                <label
                  key={flight.id}
                  className={`flex items-start justify-between p-3 rounded-xs border text-xs cursor-pointer transition-colors ${
                    formData.flightOption === flight.name
                      ? 'border-[#7f5e3e] bg-[#f5efe6]'
                      : 'border-[#231F1C]/15 bg-[#FAF7F2] hover:border-[#231F1C]/35'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="radio"
                      name="tasting-flight"
                      checked={formData.flightOption === flight.name}
                      onChange={() => setFormData({ ...formData, flightOption: flight.name })}
                      className="mt-0.5 text-[#7f5e3e] focus:ring-[#7f5e3e]"
                    />
                    <div>
                      <div className="font-semibold text-[#231F1C]">{flight.name}</div>
                      <div className="text-[11px] text-[#63472e] mt-0.5">{flight.description}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="font-mono font-semibold text-[#231F1C]">${flight.price}</span>
                    <span className="text-[10px] text-[#7f5e3e] block font-mono">{flight.duration}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Guest Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#231F1C] block mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Eleanor Vance"
                className="w-full text-xs p-2.5 rounded-xs border border-[#231F1C]/20 bg-[#FAF7F2] text-[#231F1C] focus:outline-hidden focus:border-[#7f5e3e]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#231F1C] block mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="eleanor@domain.com"
                className="w-full text-xs p-2.5 rounded-xs border border-[#231F1C]/20 bg-[#FAF7F2] text-[#231F1C] focus:outline-hidden focus:border-[#7f5e3e]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#231F1C] block mb-1.5">
                Dietary Notes or Occasion (Optional)
              </label>
              <input
                type="text"
                value={formData.specialOccasion}
                onChange={(e) => setFormData({ ...formData, specialOccasion: e.target.value })}
                placeholder="e.g. Birthday, preferring plant-based pairing, gluten sensitivity"
                className="w-full text-xs p-2.5 rounded-xs border border-[#231F1C]/20 bg-[#FAF7F2] text-[#231F1C] focus:outline-hidden focus:border-[#7f5e3e]"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-[#231F1C]/10 flex items-center justify-between">
            <span className="text-xs text-[#63472e]">
              No deposit required · Free cancellation up to 1 hr before
            </span>
            <button
              type="submit"
              className="py-3 px-6 text-xs font-semibold tracking-wider uppercase text-[#FAF7F2] bg-[#251910] hover:bg-[#422f1f] rounded-xs cursor-pointer transition-colors shadow-xs"
            >
              Confirm Reservation
            </button>
          </div>

        </form>
      )}
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
        <div className="bg-[#FAF7F2] w-full max-w-3xl rounded-xs shadow-2xl border border-[#231F1C]/20 p-6 sm:p-8 relative my-8">
          <button
            onClick={onCloseModal}
            className="absolute top-4 right-4 p-2 text-[#4a3424] hover:text-[#231F1C] cursor-pointer"
            aria-label="Close reservation modal"
          >
            <X className="w-5 h-5" />
          </button>
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="reservation" className="py-20 lg:py-28 bg-[#f5efe6] border-t border-[#231F1C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    </section>
  );
};
