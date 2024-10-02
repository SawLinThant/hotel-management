import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../modules/common/components/sidebar";
import { FaCircleUser } from "react-icons/fa6";
import UserList from "../../modules/user-lists";
import CreateUser from "../../modules/user-lists/create-user-form";
import { useEffect,useState } from "react";
import nProgress from "nprogress";
import 'nprogress/nprogress.css';
import CustomerDetail from "./customerDetail/[customerId]";
import CardList from "../../modules/card";
import CreateCard from "../../modules/card/create-card-form";
import FacilityList from "../../modules/facilities";
import CreateFacility from "../../modules/facilities/create-facility-form";
import TerminalList from "../../modules/terminal";
import CreateTerminal from "../../modules/terminal/create-terminal-form";
import FacilityServiceList from "../../modules/facility-services";
import CreateFacilityService from "../../modules/facility-services/create-facility-service-form";
import CashinList from "../../modules/cashin-amount";
import CreateCashinAmount from "../../modules/cashin-amount/create-cashin-form";
import TerminalDetail from "./terminalDetail/[terminalId]";
import CardDetail from "./cardDetail/[cardId]";
import CashinDetail from "./cashinDetail/[cashinId]";
import FacilityDetail from "./facilityDetail/[facilityId]";
import FacilityServiceDetail from "./facilityServiceDetail/[facilityServiceid]";
import CardTransactionList from "../../modules/card-transaction";
import CardTransactionDetail from "./cardTransactionDetail/[cardTransactionId]";
import { SlLogout } from "react-icons/sl";
import Home from "./home";
import MobileNav from "../../modules/common/components/mobile-nav";
import { VscThreeBars } from "react-icons/vsc";

const Dashboard = () => {
  const location = useLocation();
  const [isCollapse,setIsCollapse] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      nProgress.configure({
           parent: '#progress-bar-container',
             showSpinner: false
           });
      nProgress.start();
      nProgress.done();
    };

    loadData();
  }, [location]);

  const startProgress = () => nProgress.start();
  const stopProgress = () => nProgress.done();

  const navigate = useNavigate();

    return(
        <div className="flex h-screen w-screen">
        <Sidebar />
        <MobileNav isCollapse={isCollapse} setIsCollapse={setIsCollapse}/>
        <div className="flex-1 flex-col lg:h-screen lg:ml-[17vw] md:ml-0 w-dashboard-main-content overflow-auto lg:-5 lg:pb-5 md:pl-0">
          <div  className="w-full h-24 border-b border-primarybold p-2 bg-gray-100 fixed z-10">
            <div className="w-full h-full flex flex-row items-center justify-between">
              <div className="h-full flex items-center justify-center text-purple-900">
                <h2 className="text-3xl text-primarybold font-bold lg:ml-4 md:ml-4">Dashboard</h2>
              </div>
              <div className="h-full w-full md:hidden lg:flex flex-row items-center justify-end">
                <button
                onClick={() => {
                  localStorage.clear();
                   navigate('/')
                }}
                className="min-w-12 lg:mr-[17vw] md:mr-0 bg-transparent text-primarybold hover:cursor-pointer border-none hover:text-primary hover:border-none h-full flex flex-row items-center gap-2">
                  <SlLogout size={20}/><p>Logout</p>
                </button>
              </div>
              <div className="h-full w-full md:flex lg:hidden flex-row items-center justify-end">
                <button
                onClick={() => {
                  setIsCollapse(false)
                  // localStorage.clear();
                  //  navigate('/')
                }}
                className="min-w-12 lg:mr-[17vw] md:mr-0 bg-transparent hover:cursor-pointer border-none hover:text-gray-700 hover:border-none h-full flex flex-row items-center gap-2">
                  <VscThreeBars size={30}/>
                </button>
              </div>
              
            </div>
          </div>
          <div id="progress-bar-container" className="flex-1 mt-[6rem] h-[calc(100% - 6rem)] overflow-y-auto w-full bg-white relative">
            <Routes>
              <Route path="*" element={<CardTransactionList/>} />
              <Route path="home" element={<Home/>} />
              <Route path="user" element={<UserList/>} />
              <Route path="card" element={<CardList/>} />
              <Route path="facility" element={<FacilityList/>} />
              <Route path="facilityservice" element={<FacilityServiceList/>} />
              <Route path="cashinamount" element={<CashinList/>} />
              <Route path="terminal" element={<TerminalList/>} />
              <Route path="cardtransaction" element={<CardTransactionList/>} />
              <Route path="user/customerlists/createcustomer" element={<CreateUser />} />
              <Route path="card/cardlists/createcard" element={<CreateCard />} />
              <Route path="facility/facilitylists/createfacility" element={<CreateFacility />} />
              <Route path="cashinamount/cashinlists/createcashin" element={<CreateCashinAmount />} />
              <Route path="facilityservice/facilityservicelists/createfacilityservice" element={<CreateFacilityService />} />
              <Route path="terminal/terminallists/createterminal" element={<CreateTerminal />} />
              <Route path="customerlists/customerdetail/:customerId" element={<CustomerDetail/>} />
              <Route path="terminallists/terminaldetail/:terminalId" element={<TerminalDetail/>} />
              <Route path="cashinlists/cashindetail/:cashinId" element={<CashinDetail/>} />
              <Route path="facilitylists/facilitydetail/:facilityId" element={<FacilityDetail/>} />
              <Route path="facilityservicelists/facilityservicedetail/:facilityServiceId" element={<FacilityServiceDetail/>} />
              <Route path="cardlists/carddetail/:cardId" element={<CardDetail/>} />
              <Route path="cardtransactionlists/cardtransactiondetail/:cardTransactionId" element={<CardTransactionDetail/>} />
            </Routes>
          </div>
        </div>
      </div>
    )
}

export default Dashboard;