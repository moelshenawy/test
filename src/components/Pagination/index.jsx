import React, { useContext, useEffect, useState } from 'react';
import { ContextStore } from '../../Context/StoreContext';

const Pagination = ({ pageNumbers }) => {
  const { activePage, setActivePage, currentTasks, setCurrentTasks } = useContext(ContextStore);

  // Logic for rendering page numbers
  const paginationItems = [];
  for (let number = 1; number <= pageNumbers; number++) {
    paginationItems.push(
      <li
        key={number}
        className={`page-item ${activePage === number ? 'active' : ''}`}
        onClick={() => setActivePage(number)}
      >
        <a className="page-link" href="#">
          {number}
        </a>
      </li>
    );
  }

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`} onClick={() => setActivePage((prev) => prev - 1)}>
          <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
            Previous
          </a>
        </li>
        {paginationItems}
        <li className={`page-item ${activePage === pageNumbers ? 'disabled' : ''}`} onClick={() => setActivePage((prev) => prev + 1)}>
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;