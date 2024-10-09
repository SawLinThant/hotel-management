import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_CARDS_TRANSACTION_TODAY,
  GET_CARDS_TRANSACTION_TODAY_BY_CARD_NUMBER,
  GET_CARDS_TRANSACTION_TODAY_BY_TYPE,
  GET_CARDS_TRANSACTION_SEVENDAYS,
} from "../../../graphql/query/card-transaction-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import CustomFilter from "./custom-filter";
import { transactionFilterOptions } from "../../../lib/config";
import { useLocation } from "react-router-dom";
import { useAccount } from "../../../lib/context/account-context";


const CustomTransctionList = () => {
  const {userType} = useAccount();
  const [transactionLists, setTransactionLists] = useState([]);
  const location = useLocation();
  const [filter, setFilter] = useState("");
  const [cardNumberSearch, setCardNumberSearch] = useState("");
  const [hotelGroup, setHotelGroup] = useState(userType); // Add hotelGroup state

  // Fetch all daily transactions with hotel group filter
  const [
    getDailyTransaction,
    { data: dailyTransaction, loading: dailyTransactionLoading, refetch: refetchDailyTransactions },
  ] = useLazyQuery(GET_CARDS_TRANSACTION_TODAY);

  // Fetch daily transactions by type with hotel group filter
  const [
    getDailyTransactionByType,
    { data: dailyTransactionByType, loading: dailyTransactionByTypeLoading, refetch: refetchDailyTransactionsByType },
  ] = useLazyQuery(GET_CARDS_TRANSACTION_TODAY_BY_TYPE);

  // Fetch daily transactions by card number with hotel group filter
  const [
    getTransactionByCardNumber,
    { data: transactionByCardNumber, loading: fetchTransactionByCardNumber },
  ] = useLazyQuery(GET_CARDS_TRANSACTION_TODAY_BY_CARD_NUMBER);

  // Fetch transactions based on filter and hotel group
  const fetchTransactionLists = () => {
    if (filter === "all" || filter === "") {
      getDailyTransaction({ variables: { hotelGroup } })
        .then((response) => {
          setCardNumberSearch("");
          setTransactionLists(response.data.card_transactions || []);
        })
        .finally(() => {});
    } else {
      getDailyTransactionByType({
        variables: { transactionType: filter, hotelGroup },
      })
        .then((response) => {
          setCardNumberSearch("");
          setTransactionLists(response.data.card_transactions || []);
        })
        .finally(() => {});
    }
  };

  // Handle card number search
  const handleSearch = () => {
    if (cardNumberSearch.trim()) {
      setFilter("");
      getTransactionByCardNumber({
        variables: { cardNumber: cardNumberSearch, hotelGroup },
      })
        .then((response) => {
          setTransactionLists(response.data.card_transactions || []);
        })
        .finally(() => {});
    }
  };

  // Handle CSV export
  const exportCsv = (tableData) => {
    if (!tableData || tableData.length === 0) {
      toast.error();
      return;
    }

    const filteredData = tableData.map((transaction) => ({
      id: transaction.id,
      transaction_number: transaction.transaction_number,
      amount: transaction.amount,
      terminal_number: transaction.terminal.terminal_number,
      name: transaction.card.customer.name,
      card_number: transaction.card.card_number,
      card_transaction_type: transaction.card_transaction_type,
      created_at: transaction.created_at,
      updated_at: transaction.updated_at,
    }));

    const headers = Object.keys(filteredData[0]);
    const csvRows = [
      headers.join(","),
      ...filteredData.map((row) =>
        headers.map((header) => JSON.stringify(row[header] || "")).join(",")
      ),
    ];
    const csvString = csvRows.join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "card_transactions.csv");
    a.click();
  };

  // Fetch data on filter or hotel group change
  useEffect(() => {
    fetchTransactionLists();
  }, [filter, hotelGroup, getDailyTransaction]);

  // Refetch data when location state changes
  useEffect(() => {
    if (location.state?.refetch) {
      refetchDailyTransactions();
      refetchDailyTransactionsByType();
    }
  }, [location.state, refetchDailyTransactions]);


  if (dailyTransactionLoading || dailyTransactionByTypeLoading || fetchTransactionByCardNumber)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <>
      <div className="w-full h-[5rem] grid grid-cols-2 border border-primary shadow-md px-2">
        <div className="w-full h-full flex flex-row items-center justify-start">
          <div className="flex flex-row items-center gap-4">
            <input
              placeholder="Enter card number"
              className="lg:w-[15vw] md:w-[25vw] p-2 rounded border border-primary"
              type="text"
              value={cardNumberSearch}
              onChange={(e) => setCardNumberSearch(e.target.value)}
            />
            <button onClick={handleSearch} className="border border-primary text-primary">
              Search
            </button>
          </div>
        </div>
        <div className="w-full h-full flex flex-row items-center justify-end gap-4">
          <input
            placeholder="Enter hotel group"
            className="lg:w-[15vw] md:w-[25vw] p-2 rounded border border-primary"
            type="text"
            value={hotelGroup}
            onChange={(e) => setHotelGroup(e.target.value)} // Capture hotelGroup input
          />
          <CustomFilter
            setOptions={setFilter}
            option={transactionFilterOptions}
            filter={filter}
            selectLabel="Select Type"
          />
          <div className="h-12">
            <button
              className="bg-primary hover:border-green-500 text-white duration-500 hover:bg-gray-900 hover:text-white"
              onClick={() => exportCsv(transactionLists)}
            >
              Export
            </button>
          </div>
        </div>
      </div>
      <div className="w-full px-2 mt-4"></div>
      <div className="w-full max-h-full h-[80%] overflow-y-auto px-2">
        <div className="w-full h-[3rem] border bg-primary border-primarybold font-bold grid text-white grid-cols-7">
          <div className="w-full h-full flex items-center justify-start">
            <p className="ml-6">No</p>
          </div>
          <div className="w-full h-full flex items-center justify-start">
            <p>Card No</p>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <p>Customer</p>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <p>Terminal</p>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <p>Amount</p>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <p>Type</p>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <p>Transaction Time</p>
          </div>
        </div>
        {transactionLists.length > 0 ? (
          transactionLists.map((transaction, index) => (
            <div key={transaction.id} className="w-full h-[5rem] bg-white border mt-2 border-gray-500 p-3 rounded grid grid-cols-7">
              <div className="w-full h-full flex items-center justify-start px-4">
                <p className="font-bold">{index + 1}.</p>
              </div>
              <div className="w-full h-full flex flex-row gap-2">
                <div className="flex flex-col items-center justify-center">
                  <p>{transaction.card.card_number}</p>
                </div>
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <p>{transaction.card.customer.name}</p>
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <p>{transaction.terminal.terminal_number}</p>
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <p>{transaction.amount.toLocaleString()} KS</p>
              </div>
              <div
                className={clsx("w-full h-full flex items-center justify-center font-semibold", {
                  "text-red-700": transaction.card_transaction_type === "purchase",
                  "text-green-500": transaction.card_transaction_type === "topup",
                })}
              >
                <p>{transaction.card_transaction_type}</p>
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <p>{transaction.created_at}</p>
              </div>
            </div>
          ))
        ) : (
          <div>No Transaction Lists</div>
        )}
      </div>
    </>
  );
};

export default CustomTransctionList;
