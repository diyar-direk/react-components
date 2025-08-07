import { useCallback, useState } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "./table.css";
import Paginations from "./Paginations";
import ConfirmPopUp from "./../popup/ConfirmPopUp";
import APIClient from "../../utils/ApiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../button/Button";
const Table = ({
  colmuns,
  selectable,
  loading,
  currentPage,
  setPage,
  data,
  dataLength,
  setSort,
  selectedItems,
  setSelectedItems,
  delelteEndPoint,
  queryKey,
}) => {
  const [columnsState, setColumnsState] = useState(colmuns || []);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const handleDeletePopUpClose = useCallback(() => {
    setSelectedItems(new Set());
    setIsPopUpOpen(false);
  }, [setSelectedItems]);
  const apiClient = new APIClient(delelteEndPoint);
  const queryclient = useQueryClient();
  const handleDelete = useMutation({
    mutationKey: [queryKey],
    mutationFn: (data) => apiClient.deleteAll({ ids: data }),
    onSuccess: () => {
      if (data?.length === selectedItems?.size) {
        setPage((prev) => (prev === 1 ? prev : prev - 1));
      }
      setIsPopUpOpen(false);
      setSelectedItems(new Set());
      queryclient.invalidateQueries({
        queryKey: [queryKey],
      });
    },
  });
  const handleConfirmDelete = useCallback(() => {
    handleDelete.mutate([...selectedItems]);
  }, [handleDelete, selectedItems]);
  return (
    <>
      <div className="table">
        <table>
          <TableHeader
            selectable={selectable}
            setSelectedItems={setSelectedItems}
            column={columnsState}
            setSort={setSort}
            data={data}
            selectedItems={selectedItems}
          />
          <TableBody
            loading={loading}
            column={columnsState}
            data={data}
            selectable={selectable}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            setIsPopUpOpen={setIsPopUpOpen}
            isPopUpOpen={isPopUpOpen}
          />
        </table>
      </div>
      {selectedItems.size > 0 && (
        <Button
          btnStyleType="outlin"
          btnType="delete"
          onClick={() => setIsPopUpOpen(true)}
        >
          delete
        </Button>
      )}
      <ConfirmPopUp
        isOpen={isPopUpOpen}
        onClose={handleDeletePopUpClose}
        onConfirm={handleConfirmDelete}
        confirmButtonProps={{ isSending: handleDelete.isLoading }}
      />
      <Paginations
        currentPage={currentPage}
        dataLength={dataLength}
        setPage={setPage}
        setSelectedItems={setSelectedItems}
      />
    </>
  );
};

export default Table;
