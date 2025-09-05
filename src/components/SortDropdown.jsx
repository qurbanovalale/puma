import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

function SortDropdown({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Sort by");
  const dropdownRef = useRef(null);

  const options = [
    "Price Low To High",
    "Price High To Low",
    "Newest",
    "Top Sellers",
  ];

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  // Çöldə klikləyəndə bağlanma
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Sort By Button */}
      <div
        onClick={toggleDropdown}
        className="flex items-center uppercase gap-[7px] text-[#191919] p-[7px_20px] border border-gray-400 cursor-pointer select-none"
      >
        <span className="font-semibold text-[16px]">{selected}</span>
        <FaChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute mt-1 w-[220px] border bg-white shadow-md z-10">
          {/* Sort by həmişə ilk sırada, disabled */}
          <div className="px-4 py-2 font-semibold text-gray-500 uppercase cursor-default select-none">
            Sort by
          </div>

          {/* Qalan seçimlər */}
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-[#191919]"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortDropdown;
