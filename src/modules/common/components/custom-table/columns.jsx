import { createColumnHelper } from "@tanstack/react-table";
import clsx from "clsx";
import { FaRegEdit } from "react-icons/fa";

const columnHelper = createColumnHelper();
export const userColumn = (navigate,pagination, itemsPerPage) => [
  columnHelper.accessor("id", {
    cell: (info) => <span>{(pagination - 1) * itemsPerPage + (info.row.index + 1)}</span>,
    header: () => <span className="">No</span>,
  }),
  columnHelper.accessor("name", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="">Name</span>,
  }),
  columnHelper.accessor("phone", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="column-head">Phone No</span>,
  }),
  columnHelper.accessor("email", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="column-head">Email</span>,
  }),
  columnHelper.accessor("created_at", {
    cell: (info) => {
      const date = new Date(info.getValue());
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      return <span>{formattedDate}</span>;
    },
    header: () => <span className="">Member Since</span>,
  }),
  columnHelper.accessor("id", {
    cell: (info) => (
      <button
        className="flex w-full flex-row items-center justify-center gap-2 border-none bg-transparent hover:cursor-pointer text-blue-500"
        onClick={() => {
          navigate(
            `/dashboard/customerlists/customerdetail/${info.getValue()}`
          );
        }}
      >
        <p>Detail</p> <FaRegEdit />
      </button>
    ),
    header: () => <span className="column-head"></span>,
  }),
];

export const cardColumn = (navigate,pagination, itemsPerPage) => [
  columnHelper.accessor("id", {
    cell: (info) => <span>{(pagination - 1) * itemsPerPage + (info.row.index + 1)}</span>,
    header: () => <span className="">No</span>,
  }),
  columnHelper.accessor("card_number", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="">Card Number</span>,
  }),
  columnHelper.accessor("customer", {
    cell: (info) => <span>{info.getValue().name}</span>,
    header: () => <span className="">Customer</span>,
  }),
  columnHelper.accessor("disabled", {
    cell: (info) => (
      <span
        className={clsx("font-semibold", {
          "text-red-700": info.getValue(),
          "text-green-500": !info.getValue(),
        })}
      >
        {info.getValue() ? "disabled" : "enabled"}
      </span>
    ),
    header: () => <span className="column-head">Status</span>,
  }),
  columnHelper.accessor("balance", {
    cell: (info) => <span>{info.getValue().toLocaleString()}</span>,
    header: () => <span className="column-head">Balance</span>,
  }),
  columnHelper.accessor("id", {
    cell: (info) => (
      <button
        className="flex w-full flex-row items-center justify-center gap-2 border-none bg-transparent hover:cursor-pointer text-blue-500"
        onClick={() => {
          navigate(`/dashboard/cardlists/carddetail/${info.getValue()}`);
        }}
      >
        <p>Detail</p> <FaRegEdit />
      </button>
    ),
    header: () => <span className="column-head"></span>,
  }),
];

export const facilityColumn = (navigate,pagination, itemsPerPage) => [
  columnHelper.accessor("id", {
    cell: (info) => <span>{(pagination - 1) * itemsPerPage + (info.row.index + 1)}</span>,
    header: () => <span className="">No</span>,
  }),
  columnHelper.accessor("name", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="">Name</span>,
  }),
  columnHelper.accessor("phone", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="column-head">Phone No</span>,
  }),
  columnHelper.accessor("email", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="column-head">Email</span>,
  }),
  columnHelper.accessor("id", {
    cell: (info) => (
      <button
        className="flex w-full flex-row items-center justify-center gap-2 border-none bg-transparent hover:cursor-pointer text-blue-500"
        onClick={() => {
          navigate(
            `/dashboard/facilitylists/facilitydetail/${info.getValue()}`
          );
        }}
      >
        <p>Detail</p> <FaRegEdit />
      </button>
    ),
    header: () => <span className="column-head"></span>,
  }),
];

export const facilityServiceColumn = (navigate,pagination, itemsPerPage) => [
  columnHelper.accessor("id", {
    cell: (info) => <span>{(pagination - 1) * itemsPerPage + (info.row.index + 1)}</span>,
    header: () => <span className="">No</span>,
  }),
  columnHelper.accessor("name", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="">Service</span>,
  }),
  columnHelper.accessor("facility", {
    cell: (info) => <span>{info.getValue().name}</span>,
    header: () => <span className="">Business Unit</span>,
  }),
  columnHelper.accessor("price", {
    cell: (info) => <span>{info.getValue().toLocaleString()}</span>,
    header: () => <span className="column-head">Price</span>,
  }),
  columnHelper.accessor("id", {
    cell: (info) => (
      <button
        className="flex w-full flex-row items-center justify-center gap-2 border-none bg-transparent hover:cursor-pointer text-blue-500"
        onClick={() => {
          navigate(
            `/dashboard/facilityservicelists/facilityservicedetail/${info.getValue()}`
          );
        }}
      >
        <p>Detail</p> <FaRegEdit />
      </button>
    ),
    header: () => <span className="column-head"></span>,
  }),
];

export const terminalColumn = (navigate,pagination, itemsPerPage) => [
  columnHelper.accessor("id", {
    cell: (info) => <span>{(pagination - 1) * itemsPerPage + (info.row.index + 1)}</span>,
    header: () => <span className="">No</span>,
  }),
  columnHelper.accessor("terminal_number", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="">Terminal Number</span>,
  }),
  columnHelper.accessor("facility", {
    cell: (info) => <span>{info.getValue().name}</span>,
    header: () => <span className="">Business Unit</span>,
  }),
  columnHelper.accessor("disabled", {
    cell: (info) => (
      <span
        className={clsx("font-semibold", {
          "text-red-700": info.getValue(),
          "text-green-500": !info.getValue(),
        })}
      >
        {info.getValue() ? "disabled" : "enabled"}
      </span>
    ),
    header: () => <span className="column-head">Status</span>,
  }),
  columnHelper.accessor("id", {
    cell: (info) => (
      <button
        className="flex w-full flex-row items-center justify-center gap-2 border-none bg-transparent hover:cursor-pointer text-blue-500"
        onClick={() => {
          navigate(
            `/dashboard/terminallists/terminaldetail/${info.getValue()}`
          );
        }}
      >
        <p>Detail</p> <FaRegEdit />
      </button>
    ),
    header: () => <span className="column-head"></span>,
  }),
];

export const cashinColumn = (navigate,pagination, itemsPerPage) => [
  columnHelper.accessor("id", {
    cell: (info) => <span>{(pagination - 1) * itemsPerPage + (info.row.index + 1)}</span>,
    header: () => <span className="">No</span>,
  }),
  columnHelper.accessor("amount", {
    cell: (info) => <span>{info.getValue().toLocaleString()}</span>,
    header: () => <span className="">Amount</span>,
  }),
  columnHelper.accessor("id", {
    cell: (info) => (
      <button
        className="flex w-full flex-row items-center justify-center gap-2 border-none bg-transparent hover:cursor-pointer text-blue-500"
        onClick={() => {
          navigate(`/dashboard/cashinlists/cashindetail/${info.getValue()}`);
        }}
      >
        <p>Detail</p> <FaRegEdit />
      </button>
    ),
    header: () => <span className="column-head"></span>,
  }),
];

export const cardTransactionColumn = (navigate,pagination, itemsPerPage) => [
  columnHelper.accessor("id", {
    cell: (info) => <span>{(pagination - 1) * itemsPerPage + (info.row.index + 1)}</span>,
    header: () => <span className="">No</span>,
  }),
  columnHelper.accessor("transaction_number", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span className="">Transaction No</span>,
  }),
  columnHelper.accessor("terminal", {
    cell: (info) => <span>{info.getValue().terminal_number}</span>,
    header: () => <span className="">Terminal</span>,
  }),
  columnHelper.accessor("amount", {
    cell: (info) => <span>{info.getValue().toLocaleString()}</span>,
    header: () => <span className="">Amount</span>,
  }),
  columnHelper.accessor("card_transaction_type", {
    cell: (info) => (
      <span
        className={clsx("font-semibold", {
          "text-red-700": info.getValue() === "purchase",
          "text-green-500": info.getValue() === "cash in",
        })}
      >
        {info.getValue()}
      </span>
    ),
    header: () => <span className="">Type</span>,
  }),
  columnHelper.accessor("created_at", {
    cell: (info) => {
      const date = new Date(info.getValue());
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      return <span>{formattedDate}</span>;
    },
    header: () => <span className="">Transaction Time</span>,
  }),
  columnHelper.accessor("id", {
    cell: (info) => (
      <button
        className="flex w-full flex-row items-center justify-center gap-2 border-none bg-transparent hover:cursor-pointer text-blue-500"
        onClick={() => {
          navigate(
            `/dashboard/cardtransactionlists/cardtransactiondetail/${info.getValue()}`
          );
        }}
      >
        <p>Detail</p> <FaRegEdit />
      </button>
    ),
    header: () => <span className="column-head"></span>,
  }),
];
