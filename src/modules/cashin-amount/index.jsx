import { useEffect, useState } from "react";
import CustomTable from "../common/components/custom-table";
import { cashinColumn } from "../common/components/custom-table/columns";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import nProgress from "nprogress";
import { GET_CASHIN_AMOUNT, GET_CASHIN_AMOUNT_BY_HOTEL_GROUP } from "../../graphql/query/cash-in-query";
import { useAccount } from "../../lib/context/account-context";

const CashinList = () => {
  const navigate = useNavigate();
  const {userType} = useAccount();
  const {
    data: cashinList,
    loading: fetchCashinList,
    error: fetchCashinError,
    refetch: cashinRefetch
  } = useQuery(GET_CASHIN_AMOUNT_BY_HOTEL_GROUP,{
    variables: {
      hotelGroup:userType
    }
  });
  const [pagination, setPagination] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (location.state?.refetch) {
      cashinRefetch();
    }
  }, [location.state, cashinRefetch]);

  const column = cashinColumn(navigate,pagination,itemsPerPage);

  const tableData = cashinList? cashinList.cashin_amounts: []
  console.log(tableData)

  useEffect(() => {
    if (fetchCashinList) {
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
  }, [fetchCashinList, fetchCashinError]);

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
            {/* <CustomFilter setOptions={setFilter} option={cashinFilterOptions} /> */}
          </div>
          <div className="h-12">
            <button
              className="bg-primary hover:border-green-500 text-white duration-500 hover:bg-gray-900 hover:text-white"
              onClick={() => navigate("cashinlists/createcashin")}
            >
              New
            </button>
          </div>
        </div>
      </div>
      <CustomTable column={column} tableData={tableData} setPaginationProps={setPagination}/>
    </div>
  );
};
export default CashinList;
