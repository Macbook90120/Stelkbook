'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronDown, X, Filter, Check } from 'lucide-react';

interface Book {
  kategori?: string;
  kelas?: string;
  mapel?: string;
  penerbit?: string;
  penulis?: string;
  [key: string]: any;
}

export interface FilterState {
  kelas: string[];
  mapel: string[];
  penerbit: string[];
  penulis: string[];
}

interface FilterCheckboxProps {
  books: Book[];
  onFilterChange: (filters: FilterState) => void;
  hiddenFilters?: (keyof FilterState)[];
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ books, onFilterChange, hiddenFilters = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    kelas: [],
    mapel: [],
    penerbit: [],
    penulis: []
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extract unique options with counts
  const options = useMemo(() => {
    const extractOptions = (key: keyof Book, fallbackKey?: keyof Book) => {
      const counts: Record<string, number> = {};
      books.forEach(book => {
        let value = book[key];
        // Fallback logic for 'kelas' using 'kategori' if 'kelas' is missing
        if (!value && fallbackKey) {
          value = book[fallbackKey];
        }
        
        if (typeof value === 'string' && value) {
          counts[value] = (counts[value] || 0) + 1;
        }
      });
      return Object.entries(counts).sort((a, b) => b[1] - a[1]); // Sort by count desc
    };

    return {
      kelas: extractOptions('kelas', 'kategori'),
      mapel: extractOptions('mapel'),
      penerbit: extractOptions('penerbit'),
      penulis: extractOptions('penulis')
    };
  }, [books]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update parent when filters change
  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const resetFilters = () => {
    setSelectedFilters({
      kelas: [],
      mapel: [],
      penerbit: [],
      penulis: []
    });
  };

  const activeFilterCount = Object.values(selectedFilters).flat().length;

  const renderSection = (title: string, category: keyof FilterState, items: [string, number][]) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">{title}</h3>
        <div className="max-h-40 overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-thumb-gray-300">
          {items.map(([value, count]) => (
            <label key={value} className="flex items-center space-x-2 cursor-pointer group p-1 hover:bg-gray-50 rounded">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                  checked={selectedFilters[category].includes(value)}
                  onChange={() => toggleFilter(category, value)}
                />
              </div>
              <span className="text-sm text-gray-600 flex-grow group-hover:text-gray-900 transition-colors">
                {value}
              </span>
              <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 border rounded-lg shadow-sm transition-colors ${
          activeFilterCount > 0 
            ? 'bg-red-50 border-red-200 text-red-700' 
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Filter size={18} />
        <span className="font-medium">Filter</span>
        {activeFilterCount > 0 && (
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {activeFilterCount}
          </span>
        )}
        <ChevronDown 
          size={18} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-100">
          <div className="p-4 max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">Filter Buku</h2>
              {activeFilterCount > 0 && (
                <button 
                  onClick={resetFilters}
                  className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                >
                  <X size={14} /> Reset
                </button>
              )}
            </div>

            {!hiddenFilters.includes('kelas') && renderSection('Kelas', 'kelas', options.kelas)}
            {!hiddenFilters.includes('mapel') && renderSection('Mata Pelajaran', 'mapel', options.mapel)}
            {!hiddenFilters.includes('penerbit') && renderSection('Penerbit', 'penerbit', options.penerbit)}
            {!hiddenFilters.includes('penulis') && renderSection('Penulis', 'penulis', options.penulis)}

            {((!hiddenFilters.includes('kelas') && options.kelas.length === 0) && 
              (!hiddenFilters.includes('mapel') && options.mapel.length === 0) && 
              (!hiddenFilters.includes('penerbit') && options.penerbit.length === 0) && 
              (!hiddenFilters.includes('penulis') && options.penulis.length === 0)) && (
              <p className="text-sm text-gray-500 text-center py-4">Tidak ada opsi filter tersedia.</p>
            )}
          </div>
          
          <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
            >
              Terapkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterCheckbox;
