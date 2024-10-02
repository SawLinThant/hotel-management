import { useLazyQuery, useQuery } from "@apollo/client";
import {
  GET_CARDS_TRANSACTION_BY_CARD_NUMBER,
  GET_CARDS_TRANSACTION_SEVENDAYS,
  GET_CARDS_TRANSACTION_TODAY,
  GET_CARDS_TRANSACTION_TODAY_BY_CARD_NUMBER,
  GET_CARDS_TRANSACTION_TODAY_BY_TYPE,
} from "../../../graphql/query/card-transaction-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import CustomFilter from "./custom-filter";
import { transactionFilterOptions } from "../../../lib/config";
import { useLocation } from "react-router-dom";

const CustomTransctionList = () => {
  const [transactionLists, setTransactionLists] = useState({});
  const location = useLocation();
  const [filter, setFilter] = useState("");
  const [cardNumberSearch, setCardNumberSearch] = useState("");
  const [
    getDailyTransaction,
    {
      data: dailyTransaction,
      loading: dailyTransactionLoading,
      refetch: refetchDailyTransactions,
    },
  ] = useLazyQuery(GET_CARDS_TRANSACTION_TODAY);
  const [
    getDailyTransactionByType,
    {
      data: dailyTransactionByType,
      loading: dailyTransactionByTypeLoading,
      refetch: refetchDailyTransactionsByType,
    },
  ] = useLazyQuery(GET_CARDS_TRANSACTION_TODAY_BY_TYPE);

  const [
    getTransactionByCardNumber,
    { data: transactionByCardNumber, loading: fetchTransactionByCardNumber },
  ] = useLazyQuery(GET_CARDS_TRANSACTION_TODAY_BY_CARD_NUMBER);

  const fetchTransactionLists = () => {
    if (filter === "all" || filter === "") {
      getDailyTransaction()
        .then((response) => {
          setCardNumberSearch("");
          setTransactionLists(response.data.card_transactions || []);
        })
        .finally(() => {});
    } else {
      getDailyTransactionByType({
        variables: { transactionType: filter },
      })
        .then((response) => {
          setCardNumberSearch("");
          setTransactionLists(response.data.card_transactions || []);
        })
        .finally(() => {});
    }
  };

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

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    // Create a link element and trigger a download
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "card_transactions.csv");
    a.click();
  };

  useEffect(() => {
    fetchTransactionLists();
  }, [filter, getDailyTransaction]);

  useEffect(() => {
    if (location.state?.refetch) {
      refetchDailyTransactions();
      refetchDailyTransactionsByType();
    }
  }, [location.state, refetchDailyTransactions]);

  const handleSearch = () => {
    if (cardNumberSearch.trim()) {
      setFilter("");
      // nProgress.start();
      getTransactionByCardNumber({
        variables: { cardNumber: cardNumberSearch },
      })
        .then((response) => {
          setTransactionLists(response.data.card_transactions || []);
        })
        .finally(() => {
          //  nProgress.done();
        });
    }
  };

  console.log(transactionLists);

  const { data: weeklyTransaction, loading: weeklyTransactionLoading } =
    useQuery(GET_CARDS_TRANSACTION_SEVENDAYS);
  const weeklyTransactionLists = weeklyTransaction
    ? weeklyTransaction.card_transactions
    : [];
  if (weeklyTransactionLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  return (
    <>
      <div className="w-full h-[5rem] grid grid-cols-2 border border-primary shadow-md px-2">
        <div className="w-full h-full flex flex-row items-center justify-start">
          {" "}
          <div className="flex flex-row items-center gap-4">
            <input
              placeholder="Enter card number"
              className="lg:w-[15vw] md:w-[25vw] p-2 rounded border border-primary"
              type="text"
              value={cardNumberSearch}
              onChange={(e) => setCardNumberSearch(e.target.value)}
            />
            <button
              onClick={() => handleSearch()}
              className="border border-primary text-primary"
            >
              Search
            </button>
          </div>
        </div>
        <div className="w-full h-full flex flex-row items-center justify-end gap-4">
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
            <p className="">Card No</p>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <p className="t">Customer</p>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <p className="">Terminal</p>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <p className="">Amount</p>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <p className="t">Type</p>
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <p className="t">Transaction Time</p>
          </div>
        </div>
        {transactionLists.length > 0 ? (
          transactionLists.map((transaction, index) => {
            const colors = ["red", "blue", "green"];
            const randomColor =
              colors[Math.floor(Math.random() * colors.length)];
            return (
              <div
                key={transaction.id}
                className="w-full h-[5rem] bg-white border mt-2 border-gray-500 p-3 rounded grid grid-cols-7"
              >
                <div className="w-full h-full flex items-center justify-start px-4">
                  <p className="font-bold">{index + 1}.</p>
                </div>
                <div className="w-full h-full flex flex-row gap-2">
                  {/* <div
                    className={clsx(
                      "h-full w-2/5 border border-gray-400 rounded-lg",
                      {
                        "bg-blue-400": randomColor === "blue",
                        "bg-red-400": randomColor === "red",
                        "bg-green-400": randomColor === "green",
                      }
                    )}
                  ></div> */}

                  <div className="flex flex-col items-center justify-center">
                    {/* <h2 className="font-bold">Card No</h2> */}
                    <p className="">{transaction.card.card_number}</p>
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
                  className={clsx(
                    "w-full h-full flex items-center justify-center font-semibold",
                    {
                      "text-red-700":
                        transaction.card_transaction_type === "purchase",
                      "text-green-500":
                        transaction.card_transaction_type === "cash in",
                    }
                  )}
                >
                  <p>
                    {transaction.card_transaction_type === "purchase"
                      ? "cash out"
                      : transaction.card_transaction_type}
                  </p>
                </div>
                <div className="w-full h-full flex items-center justify-center">
                  <p>{new Date(transaction.created_at).toLocaleTimeString()}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            No transaction today.
          </div>
        )}
      </div>
    </>
  );
};

export default CustomTransctionList;
