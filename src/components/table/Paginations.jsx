import { useCallback, useMemo } from "react";
import { limit } from "../../sections/categories/pages/CategoriesTable";

const getVisiblePages = (currentPage, totalPages, maxVisibleNeighbors = 2) => {
  const pages = [];
  if (currentPage > 3 + maxVisibleNeighbors) {
    pages.push(1, 2, "...");
  } else {
    for (let i = 1; i < Math.min(3, totalPages + 1); i++) {
      pages.push(i);
    }
  }

  for (
    let i = Math.max(1, currentPage - maxVisibleNeighbors);
    i <= Math.min(totalPages, currentPage + maxVisibleNeighbors);
    i++
  ) {
    if (!pages.includes(i)) pages.push(i);
  }

  if (currentPage < totalPages - 4) {
    pages.push("...", totalPages - 1, totalPages);
  } else {
    for (let i = Math.max(totalPages - 3, 1); i <= totalPages; i++) {
      if (!pages.includes(i) && i > currentPage) pages.push(i);
    }
  }

  return pages;
};

const Paginations = ({
  currentPage,
  dataLength,
  setPage,
  setSelectedItems,
}) => {
  const pages = useMemo(() => {
    const pagesCount = Math.ceil(dataLength / limit);
    return getVisiblePages(currentPage, pagesCount);
  }, [dataLength, currentPage]);
  const onPageChange = useCallback(
    (page) => {
      setPage(page);
      setSelectedItems(new Set());
    },
    [setPage, setSelectedItems]
  );

  return (
    <div className="pagination">
      <div className="page-container">
        {pages?.map((page) =>
          typeof page === "number" ? (
            <button
              disabled={currentPage === page}
              onClick={() => onPageChange(page)}
              key={page}
            >
              {page}
            </button>
          ) : (
            <span key={page}> {page} </span>
          )
        )}
      </div>
      <h2>
        number of data : <span>{dataLength}</span>
      </h2>
    </div>
  );
};

export default Paginations;
