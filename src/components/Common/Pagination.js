import React from 'react';



const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        &lt; Previous
      </button>
      <span >{currentPage}/{totalPages}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
