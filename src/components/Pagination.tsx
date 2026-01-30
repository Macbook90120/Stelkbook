import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}) => {
  const pages: number[] = [];
  // Simple implementation:
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const visiblePages = getVisiblePages();

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage && !isLoading) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className={`w-11 h-11 flex items-center justify-center rounded-lg border transition-colors duration-200 
          ${currentPage === 1 || isLoading
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
            : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-300 hover:border-red-600 hover:text-red-600'}`}
        aria-label="Previous Page"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          disabled={page === '...' || isLoading}
          className={`w-11 h-11 flex items-center justify-center rounded-lg border font-medium transition-all duration-200
            ${page === currentPage
              ? 'bg-red-600 text-white border-red-600 shadow-md transform scale-105'
              : page === '...'
                ? 'bg-transparent text-gray-400 border-none cursor-default'
                : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-300 hover:border-red-600 hover:text-red-600'
            }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className={`w-11 h-11 flex items-center justify-center rounded-lg border transition-colors duration-200
          ${currentPage === totalPages || isLoading
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
            : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-300 hover:border-red-600 hover:text-red-600'}`}
        aria-label="Next Page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
