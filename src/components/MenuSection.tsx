import React, { useState } from 'react';
import { MenuItem, CartItem, CoffeeCategory } from '../types/coffee';
import { MENU_ITEMS } from '../data/coffeeData';
import { Search, SlidersHorizontal, Plus, Check } from 'lucide-react';

interface MenuSectionProps {
  onOpenCustomize: (item: MenuItem) => void;
  onQuickAdd: (cartItem: CartItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onOpenCustomize,
  onQuickAdd,
}) => {
  const [activeCategory, setActiveCategory] = useState<CoffeeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPreference, setFilterPreference] = useState<'all' | 'single-origin' | 'vegan' | 'beans'>('all');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Filtering logic
  const filteredItems = MENU_ITEMS.filter((item) => {
    // Category match
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
    
    // Search match
    const query = searchQuery.toLowerCase().trim();
    const searchMatch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      (item.origin && item.origin.toLowerCase().includes(query)) ||
      (item.tastingNotes && item.tastingNotes.some(n => n.toLowerCase().includes(query)));

    // Tag / preference filter
    let prefMatch = true;
    if (filterPreference === 'single-origin') {
      prefMatch = !!item.origin && !item.origin.includes('Blend');
    } else if (filterPreference === 'vegan') {
      prefMatch = !!item.isVegan;
    } else if (filterPreference === 'beans') {
      prefMatch = item.category === 'beans';
    }

    return categoryMatch && searchMatch && prefMatch;
  });

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    // If item has complex options (milks or grinds), open customize modal
    if (item.availableGrinds || (item.availableMilks && item.availableMilks.length > 2)) {
      onOpenCustomize(item);
      return;
    }

    const defaultCartItem: CartItem = {
      cartId: `${item.id}-${Date.now()}`,
      item,
      quantity: 1,
      selectedMilk: item.availableMilks?.[0],
      selectedTemp: item.category !== 'bakery' && item.category !== 'beans' ? 'Hot' : undefined,
      unitPrice: item.price,
    };

    setRecentlyAddedId(item.id);
    onQuickAdd(defaultCartItem);
    setTimeout(() => setRecentlyAddedId(null), 1200);
  };

  const categories: { id: CoffeeCategory; label: string }[] = [
    { id: 'all', label: 'All Offerings' },
    { id: 'espresso', label: 'Espresso & Milk' },
    { id: 'filter', label: 'Single Origin Filter' },
    { id: 'signature', label: 'Signature Creations' },
    { id: 'bakery', label: 'Dawn Bakery' },
    { id: 'beans', label: 'Whole Bean Bags' },
  ];

  return (
    <section id="menu" className="py-20 lg:py-28 bg-[#FAF7F2] border-t border-[#231F1C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#231F1C]/10">
          <div>
            {/* Clean unboxed metadata kicker */}
            <div className="text-xs font-semibold uppercase tracking-wider text-[#7f5e3e] mb-2">
              Extracted with Precision · Roasted with Intent
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#231F1C] tracking-tight">
              The Curated Menu
            </h2>
          </div>

          <p className="mt-3 md:mt-0 text-sm text-[#4a3424] max-w-md font-light leading-relaxed">
            All espresso beverages are pulled as a 1:2 double ristretto. Hand pours are brewed on crystal Hario V60 cones at 93°C.
          </p>
        </div>

        {/* Filter Bar & Search (Functional Button Tabs & Search Input) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
          {/* Category Tabs (Segmented Button Control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-xs transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#251910] text-[#FAF7F2]'
                    : 'bg-[#f5efe6] text-[#4a3424] hover:text-[#231F1C] hover:bg-[#e9decf]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search and Secondary Filter */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#7f5e3e]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search origins, notes, bakery..."
                className="w-full text-xs pl-8 pr-3 py-2 bg-white rounded-xs border border-[#231F1C]/15 text-[#231F1C] placeholder-[#7f5e3e]/60 focus:outline-hidden focus:border-[#7f5e3e]"
              />
            </div>

            {/* Quick Tag Filter Toggle */}
            <div className="flex items-center gap-1 bg-[#f5efe6] p-1 rounded-xs border border-[#231F1C]/10 text-xs">
              <button
                onClick={() => setFilterPreference(filterPreference === 'single-origin' ? 'all' : 'single-origin')}
                className={`px-2 py-1 rounded-xs text-[11px] font-medium transition-colors cursor-pointer ${
                  filterPreference === 'single-origin'
                    ? 'bg-[#251910] text-white'
                    : 'text-[#63472e] hover:text-[#231F1C]'
                }`}
              >
                Single Origin
              </button>
              <button
                onClick={() => setFilterPreference(filterPreference === 'vegan' ? 'all' : 'vegan')}
                className={`px-2 py-1 rounded-xs text-[11px] font-medium transition-colors cursor-pointer ${
                  filterPreference === 'vegan'
                    ? 'bg-[#251910] text-white'
                    : 'text-[#63472e] hover:text-[#231F1C]'
                }`}
              >
                Plant-Based
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop, 2-column tablet, 1-column mobile */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#f5efe6]/50 rounded-xs border border-[#231F1C]/10">
            <p className="text-sm text-[#63472e]">No items matched your current filter criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setFilterPreference('all');
              }}
              className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#7f5e3e] underline cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenCustomize(item)}
                className="group flex flex-col justify-between bg-white rounded-xs border border-[#231F1C]/10 hover:border-[#7f5e3e]/40 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden p-5"
              >
                {/* Top Section: Optional Image preview + Badge + Japanese subtitle */}
                <div>
                  {item.image && (
                    <div className="relative aspect-4/3 w-full mb-4 overflow-hidden rounded-xs bg-[#f5efe6]">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300 ease-out"
                      />
                      {/* Quiet Unboxed Badge / Tag */}
                      {item.badge && (
                        <div className="absolute top-2.5 left-2.5 bg-[#251910]/90 backdrop-blur-xs text-[#FAF7F2] text-[11px] font-medium px-2 py-0.5 rounded-xs">
                          {item.badge}
                        </div>
                      )}
                    </div>
                  )}

                  {!item.image && item.badge && (
                    <div className="text-[11px] font-medium uppercase tracking-wider text-[#7f5e3e] mb-1.5">
                      {item.badge}
                    </div>
                  )}

                  {/* Header Row: Title & Price */}
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div>
                      <h3 className="font-serif-display text-xl font-semibold text-[#231F1C] group-hover:text-[#7f5e3e] transition-colors">
                        {item.name}
                      </h3>
                      {item.japaneseName && (
                        <span className="text-[11px] text-[#7f5e3e]/80 font-light block">
                          {item.japaneseName}
                        </span>
                      )}
                    </div>
                    <span className="font-mono tabular-nums text-base font-semibold text-[#231F1C] shrink-0">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Unboxed Metadata (Origin, Farm, Process, Altitude) */}
                  {(item.origin || item.process || item.altitude) && (
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#63472e] my-2 font-medium">
                      {item.origin && <span>{item.origin}</span>}
                      {item.process && (
                        <>
                          <span aria-hidden="true" className="text-[#a7805b]">·</span>
                          <span>{item.process}</span>
                        </>
                      )}
                      {item.altitude && (
                        <>
                          <span aria-hidden="true" className="text-[#a7805b]">·</span>
                          <span>{item.altitude}</span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs text-[#4a3424] leading-relaxed line-clamp-2 mt-1">
                    {item.description}
                  </p>

                  {/* Tasting Notes as clean unboxed text with subtle dot separators */}
                  {item.tastingNotes && item.tastingNotes.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#231F1C]/5 flex flex-wrap items-center gap-1.5 text-[11px] text-[#7f5e3e]">
                      <span className="font-medium text-[#4a3424]">Notes:</span>
                      {item.tastingNotes.map((note, idx) => (
                        <React.Fragment key={note}>
                          <span>{note}</span>
                          {idx < item.tastingNotes!.length - 1 && (
                            <span aria-hidden="true" className="text-[#a7805b]">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="mt-5 pt-3 border-t border-[#231F1C]/10 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-[#7f5e3e] uppercase tracking-wider">
                    {item.category === 'beans'
                      ? 'Select Grind'
                      : item.availableMilks
                      ? 'Customize Milk'
                      : 'Prepared to Order'}
                  </span>

                  <button
                    onClick={(e) => handleQuickAdd(e, item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wide uppercase text-[#231F1C] bg-[#f5efe6] hover:bg-[#251910] hover:text-[#FAF7F2] transition-colors rounded-xs cursor-pointer"
                    aria-label={`Order ${item.name}`}
                  >
                    {recentlyAddedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>{item.availableGrinds ? 'Options' : 'Add'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
