import { FaUserGroup } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { useQuery } from "@apollo/client";
import { GET_CARDS } from "../../graphql/query/card-query";
import { GET_CUSTOMERS } from "../../graphql/query/customer-query";
import {
  GET_CARDS_TRANSACTION,
  GET_CARDS_TRANSACTION_BY_TYPE,
  GET_CARDS_TRANSACTION_SEVENDAYS,
} from "../../graphql/query/card-transaction-query";
import TrasnactionDoughnutChart from "../../modules/common/components/transaction-donut-chart";
import { useState } from "react";
import clsx from "clsx";
import CustomTransctionList from "../../modules/common/components/custom-transaction-list";
import CustomCustomerList from "../../modules/common/components/custom-customer-list";

const Home = () => {
  const { data: getCard, loading: fetchCardloading } = useQuery(GET_CARDS);
  const [isTransaction, setIsTransaction] = useState(true);
  const {data:cashInTransaction,loading:fetchCashInTransaction} = useQuery(GET_CARDS_TRANSACTION_BY_TYPE,{
    variables:{
        transactionType:"cash in"
    }
  })
  const {data:cashOutTransaction,loading:fetchCashOutTransaction} = useQuery(GET_CARDS_TRANSACTION_BY_TYPE,{
    variables:{
        transactionType:"purchase"
    }
  })
  const cashInTransactionList = cashInTransaction? cashInTransaction.card_transactions : [];
  const totalCashIn = cashInTransactionList.reduce((sum,transaction) => {
    return sum+transaction.amount
  },0)

  const cashOutTransactionList = cashOutTransaction? cashOutTransaction.card_transactions : [];
  const totalCashOut = cashOutTransactionList.reduce((sum,transaction) => {
    return sum+transaction.amount
  },0)

  const totalCard =
    getCard && getCard.cards.length > 0 ? getCard.cards.length : 0;
  const { data: getTransaction, loading: fetchTransactionloading } = useQuery(
    GET_CARDS_TRANSACTION
  );
  const totalTransaction =
    getTransaction && getTransaction.card_transactions.length > 0
      ? getTransaction.card_transactions.length
      : 0;
  const { data: getCustomer, loading: fetchCustomerloading } =
    useQuery(GET_CUSTOMERS);
  const totalCustomers =
    getCustomer && getCustomer.customers.length > 0
      ? getCustomer.customers.length
      : 0;
  const TOTAL_COUNT = [
    {
      id: "1",
      name: "Total Customers",
      count: totalCustomers,
      icon: <FaUserGroup size={35} />,
    },
    {
      id: "2",
      name: "Total Cash In",
      count: totalCashIn.toLocaleString(),
      icon: <BsFillCreditCard2FrontFill size={35} />,
    },
    {
      id: "3",
      name: "Total Cash Out",
      count: totalCashOut.toLocaleString(),
      icon: <GrTransaction size={35} />,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-8 pr-5 pl-5">
      <div className="w-full min-h-[13rem] grid grid-cols-4  mt-6 gap-3">
        {TOTAL_COUNT.map((category) => (
          <div
            key={category.id}
            className="border-2  border-primarybold p-1 rounded-md h-[16rem]"
          >
            <div className={clsx("w-full h-full rounde text-gray-700 border border-primary p-2 grid grid-cols-1",{
              "bg-yellow-300": category.name ==='Totoal Cash In',
              "bg-blue-300": category.name ==='Totoal Customers',
              "bg-red-300": category.name ==='Totoal Cash Out',
            })}>
              <div className="flex items-center justify-center border-b-2 border-white h-3/5">
              <div className="flex items-center justify-center">
                  <h3 className="font-bold text-xl text-center">
                    {category.name}
                  </h3>
                </div>
              </div>
              <div className="w-full h-full grid grid-cols-1">            
                <div>
                  <h2 className="text-lg font-semibold">{category.count}</h2>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="w-full h-full flex flex-col gap-4">
          <h3 className="font-bold text-primarybold text-2xl text-left">
            Transaction Statisitcs
          </h3>
          <div className="w-full h-full ">
            <TrasnactionDoughnutChart />
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-row justify-between gap-6">
        <div className="w-full h-[100vh] border-2 border-primarybold rounded flex flex-col p-4">
          <div className="w-full h-[5rem] flex flex-row border border-gray-500 bg-green-600 text-white items-center rounded-t">
            <div
              onClick={() => setIsTransaction(true)}
              className={clsx(
                "h-full flex items-center hover:cursor-pointer justify-center p-4 transition-all",
                {
                  "border-b-4 border-gray-100": isTransaction,
                }
              )}
            >
              <p className="">Daily Trasnsactions</p>
            </div>
            <div
              onClick={() => setIsTransaction(false)}
              className={clsx(
                "h-full flex items-center hover:cursor-pointer justify-center p-4 transition-all",
                {
                  "border-b-4 border-gray-100": !isTransaction,
                }
              )}
            >
              Daily Onboarded Customer
            </div>
          </div>
          <div className="w-full h-full overflow-auto border pt-2 bg-gray-100 border-gray-200">
            {isTransaction ? <CustomTransctionList /> : <CustomCustomerList />}
          </div>
        </div>
        {/* <div className="min-w-[20vw] h-[55vh] border-2 border-purple-800 rounded p-8">
                
        </div> */}
      </div>
    </div>
  );
};
export default Home;
