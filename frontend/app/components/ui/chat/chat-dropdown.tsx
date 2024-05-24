"use client";

import { useState } from "react";

interface DropdownProps {
  onSelect: (section: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState("Introduction");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (section: string) => {
    setSelected(section);
    onSelect(section);
    setIsOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left w-full max-w-5xl mx-auto mb-4">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : "false"}
          onClick={toggleDropdown}
        >
          {selected || "Select Section"}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {["Introduction", "Review", "Methodology", "Results", "Conclusion"].map((section) => (
              <button
                key={section}
                onClick={() => handleSelect(section)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
