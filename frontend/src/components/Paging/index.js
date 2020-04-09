import React, { useState, useMemo } from 'react';
import {
  MdChevronLeft,
  MdChevronRight,
  MdFirstPage,
  MdLastPage,
} from 'react-icons/md';

import { Container } from './styles';

export default function Paging() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage] = useState(5);
  const [disablePreviousButton, setDisablePreviousButton] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(false);

  const pageText = useMemo(() => {
    return `${currentPage} de ${totalPage}`;
  }, [currentPage, totalPage]);

  function disableButtons(page) {
    setCurrentPage(page);

    if (totalPage === 1) {
      setDisablePreviousButton(true);
      setDisableNextButton(true);
      return;
    }

    if (page === 1) {
      setDisablePreviousButton(true);
      setDisableNextButton(false);
      return;
    }

    if (page === totalPage) {
      setDisableNextButton(true);
      setDisablePreviousButton(false);
    }
  }

  function handleFirstPage() {
    disableButtons(1);
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      disableButtons(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPage) {
      disableButtons(currentPage + 1);
    }
  }

  function handleLastPage() {
    disableButtons(totalPage);
  }

  return (
    <Container>
      <button
        type="button"
        onClick={handleFirstPage}
        disabled={disablePreviousButton}
      >
        <MdFirstPage
          size={30}
          color={disablePreviousButton ? '#bbb' : '#666'}
        />
      </button>
      <button
        type="button"
        onClick={handlePreviousPage}
        disabled={disablePreviousButton}
      >
        <MdChevronLeft
          size={30}
          color={disablePreviousButton ? '#bbb' : '#666'}
        />
      </button>
      <span>{pageText}</span>
      <button
        type="button"
        onClick={handleNextPage}
        disabled={disableNextButton}
      >
        <MdChevronRight size={30} color={disableNextButton ? '#bbb' : '#666'} />
      </button>
      <button
        type="button"
        onClick={handleLastPage}
        disabled={disableNextButton}
      >
        <MdLastPage size={30} color={disableNextButton ? '#bbb' : '#666'} />
      </button>
    </Container>
  );
}
