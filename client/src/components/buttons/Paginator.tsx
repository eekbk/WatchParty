import { Pagination } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import { VoiceContext } from '../../contexts/voiceContext';
import { StyledPagination } from './buttons.styles';

function Paginator({ resultsPerPage, totalResults, startIndexSetter }) {
  const [active, setActive] = useState(1);
  const pages = [];
  const pageCount = Math.ceil(totalResults / resultsPerPage);
  const { voicePageNum, setVoicePageNum } = useContext(VoiceContext);

  for (let number = 1; number <= pageCount; number += 1) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          paginate(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    const wordToInt = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      eleven: 11,
      twelve: 12,
      thirteen: 13,
      fourteen: 14,
      fifteen: 15,
      sixteen: 16,
      seventeen: 17,
      eighteen: 18,
      nineteen: 19,
      twenty: 20,
    };
    let newPageNum = voicePageNum;
    if (typeof voicePageNum !== 'number' && wordToInt[voicePageNum]) {
      newPageNum = wordToInt[voicePageNum];
    }
    if (newPageNum !== active && newPageNum <= pageCount) {
      paginate(newPageNum);
    }
  }, [voicePageNum]);

  const paginate = async (number) => {
    setActive(number);
    startIndexSetter((number - 1) * resultsPerPage);
    if (voicePageNum !== number) {
      await setVoicePageNum(number);
    }
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
