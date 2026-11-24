import React from 'react';
import { 
  Filter, 
  X, 
  Search, 
  Star, 
  RotateCcw,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { FilterOptions } from '../types';

interface CourseFiltersProps {
  filters: FilterOptions;
  categories: string[];
  totalResults: number;
  onFilterChange: (updates: Partial<FilterOptions>) => void;
  onReset: () => void;
}

export const CourseFilters: React.FC<CourseFiltersProps> = ({
  filters,
  categories,
  totalResults,
  onFilterChange,
  onReset
}) => {
  const hasActiveFilters = 
    filters.category !== 'all' ||
    filters.search !== '' ||
    filters.level !== 'all' ||
    filters.price !== 'all' ||
    filters.rating > 0 ||
    filters.duration !== 'all';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs mb-8 space-y-5">
      
      {/* Top Search & Sort Row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Search input inside catalog */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by course title, skills, or keywords..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-hidden transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Counter & Sort Dropdown */}
        <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0">
          <span className="text-xs font-semibold text-slate-500">
            Showing <strong className="text-navy-900">{totalResults}</strong> courses
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 hidden sm:inline">Sort:</span>
            <select
              value={filters.sort}
              onChange={(e) => onFilterChange({ sort: e.target.value as FilterOptions['sort'] })}
              className="text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 py-2 px-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Releases</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

      </div>

      {/* Filter Selectors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4 border-t border-slate-100">
        
        {/* Category Filter */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
            className="w-full text-xs font-semibold text-slate-800 bg-slate-50 py-2 px-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Difficulty Level */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Difficulty
          </label>
          <select
            value={filters.level}
            onChange={(e) => onFilterChange({ level: e.target.value })}
            className="w-full text-xs font-semibold text-slate-800 bg-slate-50 py-2 px-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Price
          </label>
          <select
            value={filters.price}
            onChange={(e) => onFilterChange({ price: e.target.value as FilterOptions['price'] })}
            className="w-full text-xs font-semibold text-slate-800 bg-slate-50 py-2 px-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            <option value="all">All Prices</option>
            <option value="free">Free Courses</option>
            <option value="paid">Paid Courses</option>
            <option value="under50">Under $50</option>
            <option value="under100">Under $100</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Rating
          </label>
          <select
            value={filters.rating}
            onChange={(e) => onFilterChange({ rating: Number(e.target.value) })}
            className="w-full text-xs font-semibold text-slate-800 bg-slate-50 py-2 px-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            <option value="0">All Ratings</option>
            <option value="4.5">4.5 & up ★</option>
            <option value="4.0">4.0 & up ★</option>
            <option value="3.5">3.5 & up ★</option>
          </select>
        </div>

        {/* Duration Filter */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Duration
          </label>
          <select
            value={filters.duration}
            onChange={(e) => onFilterChange({ duration: e.target.value as FilterOptions['duration'] })}
            className="w-full text-xs font-semibold text-slate-800 bg-slate-50 py-2 px-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            <option value="all">Any Duration</option>
            <option value="short">&lt; 15 Hours</option>
            <option value="medium">15 - 30 Hours</option>
            <option value="long">30+ Hours</option>
          </select>
        </div>

      </div>

      {/* Active Filter Tags & Reset */}
      {hasActiveFilters && (
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">Active filters:</span>
          
          {filters.category !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200">
              {filters.category}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onFilterChange({ category: 'all' })} />
            </span>
          )}

          {filters.level !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {filters.level}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onFilterChange({ level: 'all' })} />
            </span>
          )}

          {filters.price !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {filters.price === 'free' ? 'Free' : filters.price === 'paid' ? 'Paid' : filters.price}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onFilterChange({ price: 'all' })} />
            </span>
          )}

          {filters.rating > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              {filters.rating}+ Stars
              <X className="w-3 h-3 cursor-pointer" onClick={() => onFilterChange({ rating: 0 })} />
            </span>
          )}

          <button
            onClick={onReset}
            className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
