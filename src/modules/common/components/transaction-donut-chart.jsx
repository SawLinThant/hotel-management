import { useQuery } from "@apollo/client";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { GET_CARDS_TRANSACTION } from "../../../graphql/query/card-transaction-query";
import { useEffect, useState } from "react";

Chart.register(ArcElement, Tooltip, Legend);

const TrasnactionDoughnutChart = () => {
    const {data:cardTransactionList,loading:fetchTransaction, error:transactionError} = useQuery(GET_CARDS_TRANSACTION);
    const transactions = cardTransactionList? cardTransactionList.card_transactions: [];
    const summary = transactions .reduce(
        (acc,transaction) => {
            if(transaction.card_transaction_type === 'cash in'){
                acc.cashIn +=  transaction.amount
            }else if(transaction.card_transaction_type === 'purchase'){
                acc.purchase = transaction.amount
            }
            return acc
        },
        {cashIn:0,purchase:0}
    )
  const data = {
    labels: ['Cash In','Cash Out'],
    datasets:[
        {
            label: "Transaction Amount",
            data: [summary.cashIn,summary.purchase],
            backgroundColor: ['rgba(255, 195, 0)', 'rgba(249, 4, 4)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(81, 141, 232)'],
            borderWidth: 1,
        },
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    cutout: '50%', 
  };

  if(fetchTransaction) return <div>Loading</div>
  if(transactionError) return <div>Error</div>

  return <div className="w-full h-full">
    <Doughnut data={data} options={options}/>
  </div>;
};
export default TrasnactionDoughnutChart;
