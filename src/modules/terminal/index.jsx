import { useEffect, useState } from "react";
import CustomTable from "../common/components/custom-table";
import { terminalColumn } from "../common/components/custom-table/columns";
import CustomFilter from "../common/components/custom-filter";
import { useNavigate } from "react-router-dom";
import { useQuery,useLazyQuery } from "@apollo/client";
import { GET_TERMINAL_BY_STATUS, GET_TERMINAL_BY_STATUS_AND_HOTEL_GROUP, GET_TERMINALS, GET_TERMINALS_BY_HOTEL_GROUP } from "../../graphql/query/terminal-query";
import nProgress from "nprogress";
import { terminalFilterOptions } from "../../lib/config";
import { useAccount } from "../../lib/context/account-context";

const TerminalList = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const {userType} = useAccount();
  const [pagination, setPagination] = useState(1);
  const itemsPerPage = 10;

  const [getTerminals,{
    data: terminalList,
    loading: fetchTerminalList,
    error: fetchTerminalError,
    refetch: terminalRefetch
  }] = useLazyQuery(GET_TERMINALS_BY_HOTEL_GROUP,{
    variables: {
      hotelGroup:userType
    }
  });

  useEffect(() => {
    if (location.state?.refetch) {
      terminalRefetch();
    }
  }, [location.state, terminalRefetch]);

  const [getTerminalsByStatus,{data:terminalListByStatus,loading:fetchTerminalListByStatus}] = useLazyQuery(GET_TERMINAL_BY_STATUS_AND_HOTEL_GROUP)
  const terminalLists = terminalList ? terminalList.terminals : [];
  console.log(terminalLists)

  const column = terminalColumn(navigate,pagination,itemsPerPage);
  
  useEffect(() => {
    if(filter === '' || filter === 'all'){
        getTerminals();
    }else if(filter === 'enable'){
       getTerminalsByStatus({
        variables:{
          disabled:false,
          hotelGroup:userType
        }
       })
    }
    else{
        getTerminalsByStatus({
          variables:{
            disabled: true,
            hotelGroup:userType
          }
           })
    }
  },[filter,getTerminals,getTerminalsByStatus])

  const tableData = filter === '' || filter === 'all' ?(terminalList? terminalList.terminals: []):(terminalListByStatus? terminalListByStatus.terminals:[])

  useEffect(() => {
    if (fetchTerminalList) {
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
  }, [fetchTerminalList, fetchTerminalError]);

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
            <CustomFilter setOptions={setFilter} option={terminalFilterOptions} filter={filter} />
          </div>
          <div className="h-12">
            <button
              className="bg-primary hover:border-green-500 text-white duration-500 hover:bg-gray-900 hover:text-white"
              onClick={() => navigate("terminallists/createterminal")}
            >
              New
            </button>
          </div>
        </div>
      </div>
      <CustomTable column={column} tableData={tableData} setPaginationProps={setPagination} itemInPage={10}/>
    </div>
  );
};
export default TerminalList;
