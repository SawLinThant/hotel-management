import { useEffect, useState } from "react";
import CustomTable from "../../common/components/custom-table";
import { masterAdminUserColumn, userColumn } from "../../common/components/custom-table/columns";
import CustomFilter from "../../common/components/custom-filter";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery,useLazyQuery } from "@apollo/client";
import nProgress from "nprogress";
import { customerFilterOptions } from "../../../lib/config";
import { GET_CUSTOMERS, GET_CUSTOMERS_BY_STATUS } from "../../../graphql/query/customer-query";

const AdminUserList = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();
  const [getCustomers,{
    data: customerList,
    loading: fetchCustomerList,
    error: fetchCustomerError,
    refetch: customerRefetch
  }] = useLazyQuery(GET_CUSTOMERS);
  const [pagination, setPagination] = useState(1);
  const itemsPerPage = 5;


  useEffect(() => {
    if (location.state?.refetch) {
      customerRefetch();
    }
  }, [location.state, customerRefetch]);


  const [getCustomersByStatus,{data:customerListByStatus,loading:fetchCustomerListByStatus}] = useLazyQuery(GET_CUSTOMERS_BY_STATUS)
  const customerLists = customerList ? customerList.customers : [];

  const column = masterAdminUserColumn(navigate,pagination,itemsPerPage);
  
  useEffect(() => {
    if(filter === '' || filter === 'all'){
        getCustomers();
    }else if(filter === 'enable'){
       getCustomersByStatus({
        variables:{disabled:false}
       })
    }
    else{
        getCustomersByStatus({
            variables:{disabled:true}
           })
    }
  },[filter,getCustomers,getCustomersByStatus])

  const tableData = filter === '' || filter === 'all' ?(customerList? customerList.customers: []):(customerListByStatus? customerListByStatus.customers:[])

  useEffect(() => {
    if (fetchCustomerList) {
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
  }, [fetchCustomerList, fetchCustomerError]);

  return (
    <div className="w-full flex flex-col gap-4 pr-5 pl-5">
      <div className="w-full h-20 flex flex-row items-center justify-between">
        {/* <div className="flex flex-row items-center gap-4">
          <input
            className="w-[15vw] p-2 rounded border border-purple-800"
            type="text"
          />
          <button className="border border-purple-800">Search</button>
        </div> */}
        <div className="flex flex-row items-center gap-8">
          <div className="">
            <CustomFilter setOptions={setFilter} option={customerFilterOptions} filter={filter}/>
          </div>
          <div className="h-12">
            <button
              className="bg-primary hover:border-green-500 text-white duration-500  hover:bg-primarybold hover:text-white"
              onClick={() => navigate("/masteradmindashboard/customer/createcustomer")}
            >
              New
            </button>
          </div>
        </div>
      </div>
      <CustomTable column={column} tableData={tableData} setPaginationProps={setPagination} />
    </div>
  );
};
export default AdminUserList;
