import { useQuery } from "@tanstack/react-query";
import Table from "./../../../components/table/Table";
import { useState } from "react";
import dateFormatter from "./../../../utils/dateFormatter";
import { Link } from "react-router";
import APIClient from "./../../../utils/ApiClient";
import PopUp from "../../../components/popup/PopUp";

const columns = [
  {
    name: "name",
    headerName: "name",
    sort: true,
  },
  {
    name: "createdAt",
    headerName: "created at",
    getCell: ({ row, isCustomPopUpOpen, setIsCustomPopUpOpen }) => {
      return (
        <>
          <PopUp
            isOpen={isCustomPopUpOpen}
            onClose={() => setIsCustomPopUpOpen(false)}
          >
            <p>{dateFormatter(row.createdAt, "fullDate")}</p>
          </PopUp>
          <p onClick={() => setIsCustomPopUpOpen(true)}>
            {dateFormatter(row.createdAt, "justYear")}
          </p>
        </>
      );
    },
    sort: true,
  },
  {
    name: "option",
    headerName: "options",
    getCell: ({ row, role, setSelectedItems, setIsPopUpOpen }) =>
      role === "admin" && (
        <>
          <i
            onClick={() => {
              setIsPopUpOpen(true);
              setSelectedItems(new Set([row._id]));
            }}
            className="fa-solid fa-trash-can"
            title="delete"
          />
          <Link to={`${row._id}`} title="update">
            <i className="fa-solid fa-pen-to-square" />
          </Link>
        </>
      ),
  },
];
export const limit = 10;
export const categoriesQueryKey = "categories";
const apiClient = new APIClient("categories");
const CategoriesTable = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const [selectedItems, setSelectedItems] = useState(new Set());
  const { data, isLoading } = useQuery({
    queryKey: [categoriesQueryKey, page, sort],
    queryFn: () => apiClient.getAll({ page, sort, limit }),
  });

  return (
    <>
      <Table
        colmuns={columns}
        loading={isLoading}
        selectable
        currentPage={page}
        setPage={setPage}
        data={data?.data}
        dataLength={data?.totalCount}
        setSort={setSort}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        delelteEndPoint="categories"
      />
    </>
  );
};

export default CategoriesTable;
