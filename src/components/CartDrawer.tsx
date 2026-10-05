import React, { useState } from 'react';
import { CartItem } from '../types/coffee';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Check, Tag, Clock, MapPin, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  
  // Checkout flow state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string | null>(null);
  const [orderStage, setOrderStage] = useState<'queued' | 'extracting' | 'ready'>('queued');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, curr) => acc + curr.unitPrice * curr.quantity, 0);
  const discountAmount = subtotal * discountPercent;
  const tax = (subtotal - discountAmount) * 0.085;
  const deliveryFee = orderType === 'delivery' ? 4.50 : 0;
  const total = subtotal - discountAmount + tax + deliveryFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'KOMOREBI10' || code === 'FIRSTROAST') {
      setDiscountPercent(0.10);
      setPromoMessage('10% Specialty discount applied!');
    } else {
      setPromoMessage('Invalid promo code. Try "KOMOREBI10"');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const orderId = `KMRB-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedOrderNumber(orderId);

    // Simulate barista preparation pipeline
    setTimeout(() => {
      setOrderStage('extracting');
    }, 4000);

    setTimeout(() => {
      setOrderStage('ready');
    }, 9000);
  };

  const handleResetOrder = () => {
    onClearCart();
    setConfirmedOrderNumber(null);
    setIsCheckingOut(false);
    setOrderStage('queued');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl border-l border-[#231F1C]/15 flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-[#231F1C]/10 flex items-center justify-between bg-[#f5efe6]/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#7f5e3e]" />
              <h2 className="font-serif-display text-xl font-semibold text-[#231F1C]">
                {confirmedOrderNumber ? 'Order Status' : isCheckingOut ? 'Express Checkout' : 'Your Order Bag'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#4a3424] hover:text-[#231F1C] hover:bg-[#e9decf]/60 rounded-xs transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* If Order is Placed & Tracking Active */}
            {confirmedOrderNumber ? (
              <div className="space-y-6 text-center py-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>

                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#7f5e3e]">
                    Order #{confirmedOrderNumber}
                  </span>
                  <h3 className="font-serif-display text-2xl font-semibold text-[#231F1C] mt-1">
                    Thank you, {customerName}!
                  </h3>
                  <p className="text-xs text-[#63472e] mt-1">
                    SMS notification dispatched to {customerPhone}.
                  </p>
                </div>

                {/* Live Barista Preparation Timeline */}
                <div className="bg-white p-4 rounded-xs border border-[#231F1C]/10 text-left space-y-3">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[#231F1C]/10">
                    <span className="font-semibold text-[#231F1C]">Extraction State</span>
                    <span className="font-mono text-[#7f5e3e] tabular-nums">
                      {orderType === 'pickup' ? 'Ready in ~12 mins' : 'Delivery in ~25 mins'}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                      <span className="text-[#231F1C] font-medium">Order Ticket Printed at Bar</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        orderStage === 'extracting' || orderStage === 'ready'
                          ? 'bg-emerald-600 animate-pulse'
                          : 'bg-[#d6c4ae]'
                      }`} />
                      <span className={orderStage === 'extracting' || orderStage === 'ready' ? 'text-[#231F1C] font-medium' : 'text-[#a7805b]'}>
                        Dosing & Precision Extraction
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        orderStage === 'ready' ? 'bg-emerald-600' : 'bg-[#d6c4ae]'
                      }`} />
                      <span className={orderStage === 'ready' ? 'text-emerald-700 font-semibold' : 'text-[#a7805b]'}>
                        {orderType === 'pickup' ? 'Ready at Pickup Counter' : 'Dispatched with Courier'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pickup Instructions */}
                <div className="bg-[#f5efe6] p-4 rounded-xs border border-[#231F1C]/10 text-xs text-left text-[#63472e] space-y-1">
                  <div className="font-semibold text-[#231F1C] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#7f5e3e]" />
                    <span>Pickup Location</span>
                  </div>
                  <p>428 Pine Street, Historic Arts District</p>
                  <p className="text-[11px] text-[#7f5e3e]">Show order reference #{confirmedOrderNumber} to the bar host.</p>
                </div>

                <button
                  onClick={handleResetOrder}
                  className="w-full py-3 text-xs font-semibold tracking-wider uppercase text-[#FAF7F2] bg-[#251910] hover:bg-[#422f1f] rounded-xs cursor-pointer transition-colors"
                >
                  Done & Close
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Express Customer Checkout Form */
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="bg-white p-4 rounded-xs border border-[#231F1C]/10 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#231F1C] pb-2 border-b border-[#231F1C]/10">
                    Customer Information
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4a3424] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Julian Hayes"
                      className="w-full text-xs p-2.5 rounded-xs border border-[#231F1C]/15 bg-[#FAF7F2] text-[#231F1C] focus:outline-hidden focus:border-[#7f5e3e]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4a3424] block mb-1">
                      Mobile Number for Order Ready SMS *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="(555) 019-2831"
                      className="w-full text-xs p-2.5 rounded-xs border border-[#231F1C]/15 bg-[#FAF7F2] text-[#231F1C] focus:outline-hidden focus:border-[#7f5e3e]"
                    />
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#4a3424] block mb-1">
                        Delivery Address (Local 3-Mile Radius) *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="Street address, Apt/Suite"
                        className="w-full text-xs p-2.5 rounded-xs border border-[#231F1C]/15 bg-[#FAF7F2] text-[#231F1C] focus:outline-hidden focus:border-[#7f5e3e]"
                      />
                    </div>
                  )}
                </div>

                {/* Payment Option */}
                <div className="bg-white p-4 rounded-xs border border-[#231F1C]/10 text-xs space-y-2">
                  <div className="font-semibold text-[#231F1C]">Payment Method</div>
                  <div className="p-2.5 bg-[#FAF7F2] rounded-xs border border-[#7f5e3e]/30 flex items-center justify-between">
                    <span>Pay at Bar Counter (Card / Cash / Apple Pay)</span>
                    <span className="font-mono text-[#7f5e3e] font-semibold">Zero Fee</span>
                  </div>
                  <p className="text-[11px] text-[#63472e]">
                    Order will be extracted fresh upon receipt and held in our temperature station.
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#4a3424] bg-white border border-[#231F1C]/15 rounded-xs cursor-pointer"
                  >
                    Back to Items
                  </button>
                  <button
                    type="submit"
                    className="flex-2 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#251910] hover:bg-[#422f1f] rounded-xs cursor-pointer transition-colors shadow-xs"
                  >
                    Authorize & Place Order · ${total.toFixed(2)}
                  </button>
                </div>
              </form>
            ) : cart.length === 0 ? (
              /* Empty Bag View */
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-10 h-10 text-[#d6c4ae] mx-auto" />
                <h3 className="font-serif-display text-lg font-semibold text-[#231F1C]">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#63472e] max-w-xs mx-auto">
                  Explore our curated single-origin roasts, seasonal signature drinks, or dawn pastries.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#251910] rounded-xs cursor-pointer"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              /* Itemized Cart List */
              <div className="space-y-4">
                
                {/* Order Type Toggle: Pickup vs Local Courier */}
                <div className="grid grid-cols-2 p-1 bg-[#f5efe6] rounded-xs border border-[#231F1C]/10 text-xs">
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-1.5 font-medium rounded-xs transition-colors cursor-pointer ${
                      orderType === 'pickup'
                        ? 'bg-white text-[#231F1C] shadow-xs'
                        : 'text-[#63472e] hover:text-[#231F1C]'
                    }`}
                  >
                    Counter Pickup (12 min)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-1.5 font-medium rounded-xs transition-colors cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-white text-[#231F1C] shadow-xs'
                        : 'text-[#63472e] hover:text-[#231F1C]'
                    }`}
                  >
                    Local Courier ($4.50)
                  </button>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {cart.map((cartItem) => (
                    <div
                      key={cartItem.cartId}
                      className="bg-white p-3.5 rounded-xs border border-[#231F1C]/10 flex items-start justify-between gap-3 shadow-2xs"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="font-serif-display text-base font-semibold text-[#231F1C]">
                          {cartItem.item.name}
                        </div>

                        {/* Customization Details */}
                        <div className="text-[11px] text-[#7f5e3e] space-y-0.5">
                          {cartItem.selectedTemp && (
                            <div>Serving: {cartItem.selectedTemp}</div>
                          )}
                          {cartItem.selectedMilk && (
                            <div>Milk: {cartItem.selectedMilk}</div>
                          )}
                          {cartItem.selectedGrind && (
                            <div>Grind: {cartItem.selectedGrind}</div>
                          )}
                          {cartItem.specialInstructions && (
                            <div className="italic text-[#63472e]">"{cartItem.specialInstructions}"</div>
                          )}
                        </div>

                        <div className="font-mono tabular-nums text-xs font-semibold text-[#231F1C] pt-1">
                          ${(cartItem.unitPrice * cartItem.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Stepper + Delete */}
                      <div className="flex flex-col items-end justify-between self-stretch">
                        <button
                          onClick={() => onRemoveItem(cartItem.cartId)}
                          className="text-[#a7805b] hover:text-red-700 p-1 cursor-pointer transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center border border-[#231F1C]/15 rounded-xs bg-[#FAF7F2]">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                            className="p-1 text-[#4a3424] hover:text-[#231F1C] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-mono tabular-nums text-xs font-semibold text-[#231F1C]">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                            className="p-1 text-[#4a3424] hover:text-[#231F1C] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="space-y-1.5 pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code (e.g. KOMOREBI10)"
                      className="flex-1 text-xs p-2 rounded-xs border border-[#231F1C]/15 bg-white uppercase text-[#231F1C] focus:outline-hidden focus:border-[#7f5e3e]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#231F1C] bg-[#f5efe6] hover:bg-[#e9decf] rounded-xs cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <div className="text-[11px] text-[#7f5e3e] font-medium">{promoMessage}</div>
                  )}
                </form>

              </div>
            )}

          </div>

          {/* Footer with Calculations and Primary Action */}
          {!confirmedOrderNumber && cart.length > 0 && !isCheckingOut && (
            <div className="p-5 border-t border-[#231F1C]/10 bg-[#f5efe6]/80 space-y-3">
              <div className="space-y-1.5 text-xs text-[#63472e]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount (10%)</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Tax (8.5%)</span>
                  <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
                </div>

                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Local Courier</span>
                    <span className="font-mono tabular-nums">${deliveryFee.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#231F1C]/10 flex justify-between text-sm font-semibold text-[#231F1C]">
                  <span>Total</span>
                  <span className="font-mono tabular-nums text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 px-4 text-xs font-semibold tracking-wider uppercase text-[#FAF7F2] bg-[#251910] hover:bg-[#422f1f] rounded-xs cursor-pointer transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>Proceed to Express Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
