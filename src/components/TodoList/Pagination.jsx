// src/components/Pagination/Pagination.jsx

import styles from "./Pagination.module.css";

export default function Pagination({
  currentPage,
  totalPages,
  limit,
  onLimitChange,
  onPageChange,
}) {
  return (
    <div className={styles.pagination}>
      <label>
        第
        <input
          type="number"
          value={currentPage}
          onChange={(e) => {
            const page = parseInt(e.target.value) || 1;
            onPageChange(page);
          }}
          min="1"
          style={{ width: "50px", margin: "0 4px" }}
        />
        页
      </label>

      <label>
        每页
        <select
          value={limit}
          onChange={(e) => onLimitChange(parseInt(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        条
      </label>
    </div>
  );
}
