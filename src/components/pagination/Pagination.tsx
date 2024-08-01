import React, { useEffect, useState } from "react";
import styles from "./Pagination.module.scss";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onChangePage(page: number): void;
}

function Pagination(props: IPaginationProps) {
  const { currentPage, totalPages, onChangePage } = props;
  const [currentPageState, setCurrentPageState] = useState(0);
  const [pages, setPages] = useState<(number | string)[]>([]);

  useEffect(() => {
    const elements = Array.from({ length: totalPages }, (_, i) => i + 1);
    setCurrentPageState(currentPage);
    if (totalPages === 1 || !totalPages) {
      setPages([]);
      return;
    }

    if (totalPages < 3) {
      setPages([1, 2]);
      return;
    }

    if (totalPages === 3) {
      setPages([1, 2, 3]);
      return;
    }

    if (totalPages > 3 && currentPageState === 1) {
      const endPages = elements.slice(
        currentPageState - 1,
        currentPageState + 2
      );

      setPages([...endPages, "...", totalPages]);
      return;
    }

    if (currentPageState === totalPages) {
      const startPages = elements.slice(currentPageState - 3, currentPageState);

      setPages([1, "...", ...startPages]);
      return;
    }

    if (totalPages > 3 && currentPageState > 1) {
      const endPages = elements.slice(
        currentPageState - 2,
        currentPageState + 1
      );

      if (!endPages.includes(1)) {
        setPages([1, "...", ...endPages, "...", totalPages]);
        return;
      }

      setPages([...endPages, "...", totalPages]);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    onChangePage(page);
    setCurrentPageState(page);
  };

  return (
    <div className={styles.pagination}>
      {pages.map((page) => (
        <button
          key={Math.random()}
          onClick={(_) => {
            if (!Number.isNaN(+page)) {
              handlePageChange(+page);
            }
          }}
          type="button"
          className={`${currentPageState === page ? styles.active : ""}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
