import { Pagination } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { StyledPagination } from './buttons.styles';

function Paginator({ resultsPerPage, totalResults, startIndexSetter }) {
  const [active, setActive] = useState(1);
  const pages = [];
  const pageCount = Math.ceil(totalResults / resultsPerPage);

  for (let number = 1; number <= pageCount; number += 1) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          console.log('booyah clicked');
          console.log('active before:', active);
          paginate(number);
          console.log('active after:', active);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  const paginate = (number) => {
    setActive(number);
    startIndexSetter((number - 1) * resultsPerPage);
  };

  return (
    <StyledPagination size="sm">
      <Pagination.Prev
        onClick={() => {
          if (active > 1) {
            paginate(active - 1);
          }
        }}
        // hidden={active === 1 || pageCount <= 1}
      />
      {pages}
      <Pagination.Next
        onClick={() => {
          if (active < pageCount) {
            paginate(active + 1);
          }
        }}
        //  hidden={active === pageCount || pageCount <= 1 || !pageCount}
      />
    </StyledPagination>
  );
}

export default Paginator;
