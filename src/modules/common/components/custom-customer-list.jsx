import { useQuery } from "@apollo/client";
import clsx from "clsx";
import { FaUserAlt } from "react-icons/fa";
import { GET_CUSTOMERS_CREATED_LAST_SEVEN_DAYS, GET_CUSTOMERS_CREATED_TODAY } from "../../../graphql/query/customer-query";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const CustomCustomerList = () => { 
  const location = useLocation();
  const { data: dailyCustomer, loading: dailyCustomerLoading, refetch:refetchdailyCustomer } =
    useQuery(GET_CUSTOMERS_CREATED_TODAY);
  const dailyCustomerLists = dailyCustomer
    ? dailyCustomer.customers
    : [];
    useEffect(() => {
      if (location.state?.refetch) {
        refetchdailyCustomer();
      }
    }, [location.state, refetchdailyCustomer]);
  if (dailyCustomerLoading) return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  return (
    <>
      {dailyCustomerLists.length > 0 ? (
        dailyCustomerLists.map((Customer,index) => {
            const colors = ["red", "blue", "green"];
          const randomColor =colors[ Math.floor(Math.random() * colors.length)];
          const date = new Date(Customer.created_at);
          const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
          return (
            <div
              key={Customer.id}
              className="w-full h-[5rem] border mt-2 bg-white border-gray-500 p-3 rounded grid grid-cols-5"
            >
              <div className="w-full h-full flex items-center justify-start px-4">
                  <p>{index + 1}</p>
                </div>
              <div className="w-full h-full flex flex-row gap-2">
                {/* <div
                  className={clsx("h-full w-2/5 rounded-lg flex items-center justify-center")}
                >
                    <FaUserAlt size={25}/>
                </div> */}
                <div className="flex flex-col items-center justify-center">
                  <p className="">{Customer.name}</p>
                </div>
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <p>{Customer.phone}</p>
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <p>{Customer.email}</p>
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <p>{formattedDate}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full h-full flex items-center justify-center">No Customers created today</div>
      )}
    </>
  );
};

export default CustomCustomerList;
