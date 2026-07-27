import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage = 1,
  totalPages = 9,
  onPageChange = () => {},
}) => {

  const visiblePages = [];

  const maxVisiblePages = 3;

  for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
    visiblePages.push(i);
  }

  return (
    <div className="pagination-wrapper">

      {/* Previous */}

      <button
        className="pagination-arrow"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={18} />
      </button>

      {/* First 5 Pages */}

      {visiblePages.map((page) => (
        <button
          key={page}
          className={`pagination-btn ${
            currentPage === page ? "active" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Dots */}

      {totalPages > maxVisiblePages + 1 && (
        <span className="pagination-dots">
          ...
        </span>
      )}

      {/* Last Page */}

      {totalPages > maxVisiblePages && (
        <button
          className={`pagination-btn ${
            currentPage === totalPages ? "active" : ""
          }`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      )}

      {/* Next */}

      <button
        className="pagination-arrow"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={18} />
      </button>

    </div>
  );
};

export default Pagination;