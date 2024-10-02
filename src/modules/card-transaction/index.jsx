import { useEffect, useState } from "react";
import CustomTable from "../common/components/custom-table";
import { cardTransactionColumn } from "../common/components/custom-table/columns";
import { useLocation, useNavigate } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import nProgress from "nprogress";
import { GET_CARDS_TRANSACTION, GET_CARDS_TRANSACTION_BY_CARD_NUMBER, GET_CARDS_TRANSACTION_BY_TYPE } from "../../graphql/query/card-transaction-query";
import CustomFilter from "../common/components/custom-filter";
import { transactionFilterOptions } from "../../lib/config";
import toast, { Toaster } from "react-hot-toast";

const CardTransactionList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState('');
  const [pagination, setPagination] = useState(1);
  const [cardNumberSearch, setCardNumberSearch] = useState('');
  const [tableData, setTableData] = useState([]);
  const itemsPerPage = 5;
  const [getTransactions,{
    data: cardTransactionList,
    loading: fetchCardTransactionList,
    error: fetchCardTransactionError,
    refetch: transactionRefetch
  }] = useLazyQuery(GET_CARDS_TRANSACTION);

  const [getTransactionByCardNumber, {
    data: transactionByCardNumber,
    loading: fetchTransactionByCardNumber,
  }] = useLazyQuery(GET_CARDS_TRANSACTION_BY_CARD_NUMBER);

  const [getTransactionByType,{data:transactionListByType,loading:fetchTransactionListByType}] = useLazyQuery(GET_CARDS_TRANSACTION_BY_TYPE)

  const fetchCardTransaction = () => {
    nProgress.start();
    if(filter === 'all' || filter === ''){
      getTransactions()
      .then((response) => {
        setCardNumberSearch('');
        setTableData(response.data.card_transactions || []);
      })
      .finally(() => {
        nProgress.done()
      })
    }else{
      getTransactionByType({
        variables:{transactionType:filter}
       })
       .then((response) => {
        setCardNumberSearch('');
        setTableData(response.data.card_transactions || [])
       })
       .finally(() => {
        nProgress.done();
      });
    }
  }

  const exportCsv = (tableData) => {
    if(!tableData || tableData.length === 0){
      toast.error()
      return;  
    }

    const filteredData = tableData.map(transaction => ({
      id: transaction.id,
      transaction_number: transaction.transaction_number,
      amount: transaction.amount,
      terminal_number: transaction.terminal.terminal_number,
      name:transaction.card.customer.name,
      card_number: transaction.card.card_number,
      card_transaction_type: transaction.card_transaction_type,
      created_at: transaction.created_at,
      updated_at: transaction.updated_at
    }));
    const headers = Object.keys(filteredData[0]);
    const csvRows = [
      headers.join(','),
      ...filteredData.map(row =>
        headers.map(header => JSON.stringify(row[header] || '')).join(',')
      )
    ];
    const csvString = csvRows.join('\n');

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    // Create a link element and trigger a download
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'card_transactions.csv');
    a.click();
  }

  useEffect(() => {
    fetchCardTransaction();
  }, [filter, getTransactions, getTransactionByType]);

  const handleSearch = () => {
    if (cardNumberSearch.trim()) {
      setFilter("");
      nProgress.start();
      getTransactionByCardNumber({
        variables: { card_number: cardNumberSearch }
      })
        .then((response) => {
          setTableData(response.data.card_transactions || []);
        })
        .finally(() => {
          nProgress.done();
        });
    }
  };

  useEffect(() => {
    if (location.state?.refetch) {
      transactionRefetch();
    }
  }, [location.state, transactionRefetch]);

  const column = cardTransactionColumn(navigate,pagination,itemsPerPage);

  useEffect(() => {
    if (fetchCardTransactionList) {
      nProgress.configure({
        parent: "#progress-bar-container",
        showSpinner: false,
      });
      nProgress.start();
    } else {
        nProgress.done();
    }

    return () => {
        nProgress.done();
    };
  }, [fetchCardTransactionList, fetchCardTransactionError]);

  return (
    <div className="w-full flex flex-col gap-4 pr-5 pl-5">
      <Toaster/>
      <div className="w-full h-20 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <input
          placeholder="Enter card number"
            className="lg:w-[15vw] md:w-[25vw] p-2 rounded border border-primary"
            type="text"
            value={cardNumberSearch}
            onChange={(e) =>setCardNumberSearch(e.target.value)}
          />
          <button onClick={() =>handleSearch()} className="border border-primary hover:border-primarybold">Search</button>
        </div>
        <div className="flex flex-row items-center gap-8">
          <div className="">
            <CustomFilter setOptions={setFilter} option={transactionFilterOptions} selectLabel="Select Type" filter={filter} />
          </div>
          <div className="h-12">
            <button
              className="bg-primary hover:border-green-500 text-white duration-500 hover:bg-gray-900 hover:text-white"
              onClick={() => exportCsv(tableData)}
            >
              Export
            </button>
          </div>
        </div>
      </div>
      <CustomTable column={column} tableData={tableData} isRowColor={true} setPaginationProps={setPagination} />
    </div>
  );
};
export default CardTransactionList;
