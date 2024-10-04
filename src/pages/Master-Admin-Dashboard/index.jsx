import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../modules/common/components/sidebar";
import { useEffect,useState } from "react";
import nProgress from "nprogress";
import 'nprogress/nprogress.css';
import { SlLogout } from "react-icons/sl";
import MobileNav from "../../modules/common/components/mobile-nav";
import { VscThreeBars } from "react-icons/vsc";
import AdminUserList from "../../modules/master-admin/customer";
import CustomerDetail from "./customerDetail/[customerId]";
import CreateUser from "../../modules/master-admin/customer/create-user-form";
import CardList from "../../modules/master-admin/card";
import CreateCard from "../../modules/master-admin/card/create-card";
import CardDetail from "./cardDetail/[cardId]";
import CashinList from "../../modules/master-admin/cashin-amount";
import CashinDetail from "./cashinDetail/[cashinId]";
import CreateCashinAmount from "../../modules/master-admin/cashin-amount/create-cashin-form";
import FacilityList from "../../modules/master-admin/facility";
import FacilityDetail from "./facilityDetail/[facilityId]";
import CreateFacility from "../../modules/master-admin/facility/create-facility-form";
import FacilityServiceList from "../../modules/master-admin/facility-service";
import CreateFacilityService from "../../modules/master-admin/facility-service/create-facility-service-form";
import FacilityServiceDetail from "./facilityServiceDetail/[facilityServiceid]";
import TerminalList from "../../modules/master-admin/terminal";
import TerminalDetail from "./terminalDetail/[terminalId]";
import CreateTerminal from "../../modules/master-admin/terminal/create-terminal";
import CardTransactionList from "../../modules/master-admin/card-transaction";
import CardTransactionDetail from "./cardTransactionDetail/[cardTransactionId]";

const MasterAdminDashboard = () => {
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
              <Route path="customer" element={<AdminUserList/>} />
              <Route path="customer/customerdetail/:customerId" element={<CustomerDetail/>} />
              <Route path="customer/createcustomer" element={<CreateUser/>} />

              <Route path="card" element={<CardList/>} />
              <Route path="card/createcard" element={<CreateCard/>} />
              <Route path="card/carddetail/:cardId" element={<CardDetail/>} />

              <Route path="cashinamount" element={<CashinList/>} />
              <Route path="cashinamount/cashindetail/:cashinId" element={<CashinDetail/>} />
              <Route path="cashinamount/createcashin" element={<CreateCashinAmount/>} />

              <Route path="facility" element={<FacilityList/>} />
              <Route path="facility/facilitydetail/:facilityId" element={<FacilityDetail/>} />
              <Route path="facility/createfacility" element={<CreateFacility/>} />

              <Route path="facilityservice" element={<FacilityServiceList/>} />
              <Route path="facilityservice/facilityservicedetail/:facilityServiceId" element={<FacilityServiceDetail/>} />
              <Route path="facilityservice/createfacilityservice" element={<CreateFacilityService/>} />

              <Route path="terminal" element={<TerminalList/>} />
              <Route path="terminal/terminaldetail/:terminalId" element={<TerminalDetail/>} />
              <Route path="terminal/createterminal" element={<CreateTerminal/>} />

              
              <Route path="*" element={<CardTransactionList/>} />
              <Route path="cardtransaction/cardtransactiodetail/:cardTransactioId" element={<CardTransactionDetail/>} />
            </Routes>
          </div>
        </div>
      </div>
    )
}

export default MasterAdminDashboard;