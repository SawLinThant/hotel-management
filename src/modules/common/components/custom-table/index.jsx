import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

const CustomTable = ({ column, tableData, isRowColor=false, navigate, setPaginationProps, itemInPage = 10 }) => {
  const [pagination, setPagination] = useState(1);
  const [inputValue, setInputValue] = useState(1);
  const itemsPerPage = itemInPage;
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const start = (pagination - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return tableData.slice(start, end);
  }, [tableData, pagination, itemsPerPage]);

  const table = useReactTable({
    columns: column ? column : [],
    getCoreRowModel: getCoreRowModel(),
    data: currentItems,
  });

  const handlePageChange = (direction) => {
    setPagination((prevPagination) => {
      const newPage =
        direction === "next" ? prevPagination + 1 : prevPagination - 1;
      if (newPage < 1 || newPage > totalPages) {
        return prevPagination; 
      }
      setInputValue(newPage);
      setPaginationProps(newPage);
      return newPage;
    });
  };

  const handlePageInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value); // Allow the input value to update
  };

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     const newPage = Number(event.target.value);
  //     if (newPage >= 1 && newPage <= totalPages) {
  //       setPagination(newPage); // Change page only when Enter is pressed
  //     } else {
  //       setInputValue(pagination); // Reset input to current page if invalid
  //     }
  //   }
  // };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const newPage = Number(event.target.value);
      if (newPage >= 1 && newPage <= totalPages) {
        setPagination(newPage);
        setPaginationProps(newPage);
      } else {
        setInputValue(pagination);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <table className="w-full  border border-purple-300">
        <thead className="w-full h-12 bg-gradient-to-r from-primary to-primarybold text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="w-full">
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} scope="col" className="w-12">
                    {header.placeholderId
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {table.getRowModel()?.rows?.map((row, index) => (
            <tr key={row.id} className={clsx("border-b border-gray-400",{
              // "bg-red-200 text-black":isRowColor && row.original.card_transaction_type === 'purchase',
              // "bg-purple-100 text-black":isRowColor && row.original.card_transaction_type === 'cash in',
            })}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="items-center p-4 text-primary">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="">
        <div className="flex flex-row gap-3">
          <button onClick={() => handlePageChange("prev")} className="">
            <GrPrevious />
          </button>
          <div className="flex flex-row gap-3 items-center">
            <input
              type="text"
              value={inputValue}
              onChange={handlePageInputChange}
              onKeyDown={handleKeyDown}
              min="1"
              max={totalPages}
              className="border-none focus:border-white after:ring-white focus-visible:border-white focus-visible:ring-white focus:ring p-1 text-center w-6 text-purple-800"
            />
            <span>/</span>
            <span>{totalPages}</span>
          </div>

          <button onClick={() => handlePageChange("next")} className="">
            <GrNext />
          </button>
        </div>
      </div>
    </div>
  );
};
export default CustomTable;
