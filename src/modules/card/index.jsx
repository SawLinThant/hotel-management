import { useEffect, useState } from "react";
import CustomTable from "../common/components/custom-table";
import {cardColumn } from "../common/components/custom-table/columns";
import CustomFilter from "../common/components/custom-filter";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery,useLazyQuery } from "@apollo/client";
import { GET_CARDS} from "../../graphql/query/card-query";
import nProgress from "nprogress";
import { cardFilterOptions } from "../../lib/config";
import { GET_CARDS_BY_STATUS } from "../../graphql/query/card-query";

const CardList = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();
  const [getCards,{
    data: cardList,
    loading: fetchCardList,
    error: fetchCardError,
    refetch: cardRefetch
  }] = useLazyQuery(GET_CARDS);
  const [pagination, setPagination] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (location.state?.refetch) {
      cardRefetch().then(() => {
        navigate('/dashboard/card', { state: {} });
      });
    }
  }, [location.state, cardRefetch]);

  console.log(filter)

  const [getCardsByStatus,{data:cardListByStatus,loading:fetchCardListByStatus}] = useLazyQuery(GET_CARDS_BY_STATUS)
  const cardLists = cardList ? cardList.cards : [];
  console.log(cardLists)

  const column = cardColumn(navigate,pagination,itemsPerPage);
  
  useEffect(() => {
    if(filter === '' || filter === 'all'){
        getCards();
    }else if(filter === 'enable'){
       getCardsByStatus({
        variables:{disabled:false}
       })
    }
    else{
        getCardsByStatus({
            variables:{disabled:true}
           })
    }
  },[filter,getCards,getCardsByStatus])

  const tableData = filter === '' || filter === 'all' ?(cardList? cardList.cards: []):(cardListByStatus? cardListByStatus.cards:[])

  useEffect(() => {
    if (fetchCardList) {
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
  }, [fetchCardList, fetchCardError]);

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
            <CustomFilter setOptions={setFilter} option={cardFilterOptions} filter={filter}/>
          </div>
          <div className="h-12">
            <button
              className="bg-primary hover:border-green-500 text-white duration-500 hover:bg-gray-900 hover:text-white"
              onClick={() => navigate("cardlists/createcard")}
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
export default CardList;
