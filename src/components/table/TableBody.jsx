import { useCallback, useMemo, useState } from "react";

const TableBody = ({
  loading,
  column,
  data,
  selectable,
  selectedItems,
  setSelectedItems,
  setIsPopUpOpen,
  isPopUpOpen,
}) => {
  const role = "admin";

  const [isCustomPopUpOpen, setIsCustomPopUpOpen] = useState(false);

  const selectRowId = useCallback(
    (id) => {
      setSelectedItems((prev) => {
        const newIds = new Set(prev);
        if (newIds.has(id)) newIds.delete(id);
        else newIds.add(id);
        return newIds;
      });
    },
    [setSelectedItems]
  );

  const renderCell = useCallback(
    (column, row) => {
      if (column.getCell) {
        return column.getCell({
          row,
          setSelectedItems,
          role,
          setIsPopUpOpen,
          isPopUpOpen,
          isCustomPopUpOpen,
          setIsCustomPopUpOpen,
        });
      }
      return row[column.name];
    },
    [
      setSelectedItems,
      role,
      setIsPopUpOpen,
      isPopUpOpen,
      isCustomPopUpOpen,
      setIsCustomPopUpOpen,
    ]
  );

  const rows = useMemo(
    () =>
      data?.map((row) => (
        <tr key={row._id}>
          {selectable && (
            <td>
              <div
                onClick={() => selectRowId(row._id)}
                className={`checkbox ${
                  selectedItems?.has(row._id) ? "active" : ""
                }`}
              ></div>
            </td>
          )}
          {column?.map(
            (column) =>
              !column.hidden &&
              (!column.allwoedTo || column.allwoedTo?.includes(role)) && (
                <td key={column.name} className={column.className}>
                  {renderCell(column, row)}
                </td>
              )
          )}
        </tr>
      )),
    [data, column, renderCell, selectable, selectedItems, role, selectRowId]
  );

  return (
    <tbody className={loading || rows ? "relative" : ""}>
      {loading ? (
        <div className="table-loading"> loading </div>
      ) : rows?.length > 0 ? (
        <>{rows}</>
      ) : (
        <div className="table-loading">no data</div>
      )}
    </tbody>
  );
};

export default TableBody;
