import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Range } from 'react-range';

// YENİ: Hər bir filter bölməsi üçün təkrar istifadə edilə bilən komponent
const FilterSection = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="p-[18px_0] border-b border-gray-200">
      <h4
        className="text-[#191919] text-[18px] flex justify-between items-center font-semibold cursor-pointer"
        onClick={onToggle}
      >
        {title}
        {isOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
      </h4>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};


export default function Filter({
  setIsFilterOpen,
  options,
  selectedFilters,
  onFilterChange,
  clearAllFilters,
  productCount
}) {
  // YENİ: Hansı bölmənin açıq olduğunu saxlamaq üçün state
  const [openSection, setOpenSection] = useState('price'); // Başlanğıcda Price açıq olsun

  // YENİ: Price inputları üçün local state
  const [priceValues, setPriceValues] = useState(selectedFilters.price);

  useEffect(() => {
    // Ana komponentdən gələn qiymət dəyişəndə local state-i yenilə
    setPriceValues(selectedFilters.price);
  }, [selectedFilters.price]);

  const handlePriceInputChange = (e) => {
    const { name, value } = e.target;
    setPriceValues(prev => ({ ...prev, [name]: Number(value) }));
  }

  // Inputdan fokus gedəndə ana state-i yenilə
  const handlePriceInputBlur = () => {
    onFilterChange('price', priceValues);
  }

  const toggleSection = (sectionName) => {
    setOpenSection(openSection === sectionName ? null : sectionName);
  };

  const totalFiltersApplied = selectedFilters.styles.length + selectedFilters.colors.length + selectedFilters.categories.length;

  return (
    <div className="h-full fixed z-50000 w-full max-w-[448px] bg-white left-0 top-0 flex flex-col">
      <div className="flex justify-between items-center p-[24px] text-[#191919] text-[20px] font-bold">
        <h3>Product Filters</h3>
        <IoMdClose
          className="cursor-pointer"
          onClick={() => setIsFilterOpen(false)}
          size={30}
        />
      </div>
      <hr className="border-t-1 border-gray-200" />

      <div className="p-[0_24px] overflow-y-auto flex-grow">

        {/* Category (Sport) */}
        <FilterSection title="Category" isOpen={openSection === 'category'} onToggle={() => toggleSection('category')}>
          <div className="flex flex-col gap-2">
            {options.categories.map((cat, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  checked={selectedFilters.categories.includes(cat)}
                  onChange={() => onFilterChange('categories', cat)}
                /> {cat} [{options.categories.filter(c => c === cat).length}]
              </label>
            ))}
          </div>
        </FilterSection>


        {/* Style */}
        <FilterSection title="Style" isOpen={openSection === 'style'} onToggle={() => toggleSection('style')}>
          <div className="flex flex-col gap-2">
            {options.styles.map((style, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  checked={selectedFilters.styles.includes(style)}
                  onChange={() => onFilterChange('styles', style)}
                /> {style}
              </label>
            ))}
          </div>
        </FilterSection>
        <FilterSection title="Price" isOpen={openSection === 'price'} onToggle={() => toggleSection('price')}>
          {(() => {
            const roundToStep = (value, step) => Math.round(value / step) * step;

            const safePriceValues = {
              from: roundToStep(Math.max(options.prices.min, Math.min(priceValues.from, options.prices.max)), 5),
              to: roundToStep(Math.max(options.prices.min, Math.min(priceValues.to, options.prices.max)), 5),
            };

            if (options.prices.min === options.prices.max) {
              return (
                <p className="text-gray-700 font-semibold mt-3">
                  ${options.prices.min}
                </p>
              );
            }

            return (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      name="from"
                      value={safePriceValues.from}
                      onChange={handlePriceInputChange}
                      onBlur={handlePriceInputBlur}
                      className="w-full border border-gray-300 rounded-sm p-2 pl-6"
                      placeholder={`$ ${options.prices.min}`}
                    />
                  </div>
                  <span className="text-gray-500">-</span>
                  <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      name="to"
                      value={safePriceValues.to}
                      onChange={handlePriceInputChange}
                      onBlur={handlePriceInputBlur}
                      className="w-full border border-gray-300 rounded-sm p-2 pl-6"
                      placeholder={`$ ${options.prices.max}`}
                    />
                  </div>
                </div>

                <div className="mt-[30px] flex justify-center items-center">
                  <Range
                    step={5}
                    min={options.prices.min}
                    max={options.prices.max}
                    values={[safePriceValues.from, safePriceValues.to]}
                    onChange={([from, to]) => setPriceValues({ from, to })}
                    onFinalChange={([from, to]) => onFilterChange('price', { from, to })}
                    renderTrack={({ props, children }) => {
                      const { key, ...restProps } = props;
                      return (
                        <div key={key} {...restProps} className="h-1 w-[370px] bg-black rounded-full">
                          {children}
                        </div>
                      );
                    }}

                    renderThumb={({ props }) => {
                      const { key, ...restProps } = props;
                      return (
                        <div key={key} {...restProps} className="h-8 w-8 bg-black rounded-full" />
                      );
                    }}
                  />
                </div>
              </>
            );
          })()}
        </FilterSection>


        {/* Color */}
        <FilterSection title="Color" isOpen={openSection === 'color'} onToggle={() => toggleSection('color')}>
          <div className="flex flex-col gap-2">
            {options.colors.map((color, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  checked={selectedFilters.colors.includes(color)}
                  onChange={() => onFilterChange('colors', color)}
                /> {color}
              </label>
            ))}
          </div>
        </FilterSection>

      </div>

      {/* Footer with buttons */}
      <div className="p-[24px] border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">{totalFiltersApplied} Filter(s) Applied</span>
          <button
            onClick={clearAllFilters}
            className="font-semibold underline"
          >
            Clear All
          </button>
        </div>
        <button
          onClick={() => setIsFilterOpen(false)}
          className="w-full bg-black text-white p-4 font-bold uppercase"
        >
          Show {productCount} Products
        </button>
      </div>
    </div>
  );
}