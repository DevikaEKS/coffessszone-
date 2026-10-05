import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types/coffee';
import { X, Plus, Minus, Check } from 'lucide-react';

interface CustomizeModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedMilk, setSelectedMilk] = useState<string>(
    item.availableMilks?.[0] || 'Oat Milk (Barista Edition)'
  );
  const [selectedGrind, setSelectedGrind] = useState<string>(
    item.availableGrinds?.[0] || 'Whole Bean (Recommended)'
  );
  const [selectedTemp, setSelectedTemp] = useState<'Hot' | 'Iced'>('Hot');
  const [instructions, setInstructions] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Extra price for premium milk (e.g. Macadamia)
  const milkSurcharge = selectedMilk.includes('Macadamia') ? 0.75 : 0;
  const unitPrice = item.price + milkSurcharge;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const cartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}`,
      item,
      quantity,
      selectedMilk: item.availableMilks ? selectedMilk : undefined,
      selectedGrind: item.availableGrinds ? selectedGrind : undefined,
      selectedTemp: item.category !== 'bakery' && item.category !== 'beans' ? selectedTemp : undefined,
      specialInstructions: instructions.trim() ? instructions.trim() : undefined,
      unitPrice,
    };

    setAddedAnimation(true);
    setTimeout(() => {
      onAddToCart(cartItem);
      setAddedAnimation(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-[#FAF7F2] w-full max-w-lg rounded-sm shadow-2xl border border-[#231F1C]/15 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-[#231F1C]/10 flex items-start justify-between bg-[#f5efe6]/70">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#7f5e3e] mb-1">
              <span>{item.category.toUpperCase()}</span>
              {item.origin && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{item.origin}</span>
                </>
              )}
            </div>
            <h2 id="modal-headline" className="font-serif-display text-2xl font-semibold text-[#231F1C]">
              {item.name}
            </h2>
            {item.japaneseName && (
              <span className="text-xs text-[#7f5e3e] font-light">{item.japaneseName}</span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#4a3424] hover:text-[#231F1C] hover:bg-[#e9decf]/60 rounded-xs transition-colors cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Item Description & Notes */}
          <p className="text-sm text-[#4a3424] leading-relaxed">
            {item.description}
          </p>

          {item.tastingNotes && item.tastingNotes.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#63472e]">
              <span className="font-semibold text-[#231F1C]">Tasting Notes:</span>
              {item.tastingNotes.map((note, index) => (
                <React.Fragment key={note}>
                  <span>{note}</span>
                  {index < item.tastingNotes!.length - 1 && <span aria-hidden="true" className="text-[#a7805b]">·</span>}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Temperature Choice (For drinks) */}
          {item.category !== 'bakery' && item.category !== 'beans' && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#231F1C] block">
                Serving Temperature
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTemp('Hot')}
                  className={`py-2 px-3 text-xs font-medium rounded-xs border text-center transition-colors cursor-pointer ${
                    selectedTemp === 'Hot'
                      ? 'bg-[#251910] text-[#FAF7F2] border-[#251910]'
                      : 'bg-white text-[#4a3424] border-[#231F1C]/20 hover:border-[#231F1C]/40'
                  }`}
                >
                  Hot (Ceramic Cup / 65°C)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTemp('Iced')}
                  className={`py-2 px-3 text-xs font-medium rounded-xs border text-center transition-colors cursor-pointer ${
                    selectedTemp === 'Iced'
                      ? 'bg-[#251910] text-[#FAF7F2] border-[#251910]'
                      : 'bg-white text-[#4a3424] border-[#231F1C]/20 hover:border-[#231F1C]/40'
                  }`}
                >
                  Iced (Hand-cut Ice Sphere)
                </button>
              </div>
            </div>
          )}

          {/* Milk Options (If applicable) */}
          {item.availableMilks && item.availableMilks.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#231F1C] block">
                Milk Selection
              </label>
              <div className="space-y-1.5">
                {item.availableMilks.map((milk) => (
                  <label
                    key={milk}
                    className={`flex items-center justify-between p-2.5 rounded-xs border text-xs font-medium cursor-pointer transition-colors ${
                      selectedMilk === milk
                        ? 'border-[#7f5e3e] bg-[#f5efe6]'
                        : 'border-[#231F1C]/15 bg-white hover:border-[#231F1C]/35'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="milk-option"
                        value={milk}
                        checked={selectedMilk === milk}
                        onChange={() => setSelectedMilk(milk)}
                        className="text-[#7f5e3e] focus:ring-[#7f5e3e]"
                      />
                      <span>{milk}</span>
                    </div>
                    {milk.includes('Macadamia') && (
                      <span className="font-mono text-[#7f5e3e]">+ $0.75</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Grind Size (If whole beans) */}
          {item.availableGrinds && item.availableGrinds.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#231F1C] block">
                Grind Specification (250g Valve Bag)
              </label>
              <div className="space-y-1.5">
                {item.availableGrinds.map((grind) => (
                  <label
                    key={grind}
                    className={`flex items-center justify-between p-2.5 rounded-xs border text-xs font-medium cursor-pointer transition-colors ${
                      selectedGrind === grind
                        ? 'border-[#7f5e3e] bg-[#f5efe6]'
                        : 'border-[#231F1C]/15 bg-white hover:border-[#231F1C]/35'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="grind-option"
                        value={grind}
                        checked={selectedGrind === grind}
                        onChange={() => setSelectedGrind(grind)}
                        className="text-[#7f5e3e] focus:ring-[#7f5e3e]"
                      />
                      <span>{grind}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Special Requests */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#231F1C] block">
              Barista Instructions (Optional)
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Extra hot, warm croissant, light ice"
              className="w-full text-xs p-2.5 rounded-xs border border-[#231F1C]/20 bg-white focus:outline-hidden focus:border-[#7f5e3e]"
            />
          </div>
        </div>

        {/* Modal Footer with Stepper and Action */}
        <div className="p-4 sm:p-5 border-t border-[#231F1C]/10 bg-[#f5efe6]/70 flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-[#231F1C]/20 rounded-xs bg-white">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-2 text-[#4a3424] hover:text-[#231F1C] disabled:opacity-30 cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-mono tabular-nums text-sm font-semibold text-[#231F1C]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-[#4a3424] hover:text-[#231F1C] cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            type="button"
            onClick={handleAdd}
            disabled={addedAnimation}
            className={`flex-1 py-3 px-4 text-xs font-semibold tracking-wider uppercase rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
              addedAnimation
                ? 'bg-emerald-700 text-white'
                : 'bg-[#251910] hover:bg-[#422f1f] text-[#FAF7F2]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <span>Add to Bag</span>
                <span className="font-mono tabular-nums font-normal text-[#d6c4ae]">
                  · ${totalPrice.toFixed(2)}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
