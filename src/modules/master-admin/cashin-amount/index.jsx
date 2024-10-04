import { useEffect, useState } from "react";
import CustomTable from "../../common/components/custom-table";
import { masterAdminCashinColumn } from "../../common/components/custom-table/columns";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import nProgress from "nprogress";
import { GET_CASHIN_AMOUNT } from "../../../graphql/query/cash-in-query";

const CashinList = () => {
  const navigate = useNavigate();
  const {
    data: cashinList,
    loading: fetchCashinList,
    error: fetchCashinError,
    refetch: cashinRefetch
  } = useQuery(GET_CASHIN_AMOUNT);
  const [pagination, setPagination] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (location.state?.refetch) {
      cashinRefetch();
    }
  }, [location.state, cashinRefetch]);

  const column = masterAdminCashinColumn(navigate,pagination,itemsPerPage);

  const tableData = cashinList? cashinList.cashin_amounts: []

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
              className="bg-primary hover:border-green-500 text-white duration-500 hover:bg-primarybold"
              onClick={() => navigate("createcashin")}
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
