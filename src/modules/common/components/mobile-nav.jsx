import clsx from "clsx"
import { RxCross1 } from "react-icons/rx";
import { SidebarRoutes } from "../../../lib/config";
import { useNavigate } from "react-router-dom";
import { SlLogout } from "react-icons/sl";

const MobileNav = ({isCollapse=true,setIsCollapse}) => {
    const navigate = useNavigate();

    return(
        <div className={clsx("md:w-[100vw] md:min-h-[30vh] lg:hidden z-50 absolute transition-all duration-700 top-0  bg-gradient-to-b from-blue-900 to-gray-800 border-b rounded-b-lg p-4 flex flex-col gap-6",{
            "translate-y-[-150%]":isCollapse,
            "translate-y-[0%]":!isCollapse
        })}>
            <div className="w-full h-14 flex flex-row items-center justify-between">
            <button
                onClick={() => {
                  localStorage.clear();
                   navigate('/')
                }}
                className="min-w-12 lg:mr-[17vw] md:mr-0 bg-transparent text-white hover:cursor-pointer border-none hover:text-gray-700 hover:border-none h-full flex flex-row items-center gap-2">
                  <SlLogout size={25}/><p>Logout</p>
                </button>
                <button onClick={() =>setIsCollapse(!isCollapse)} className="bg-transparent text-white"><RxCross1 size={25}/></button>
            </div>
            <div className="w-full h-full p-4 grid grid-cols-6 gap-4">
                <div className="col-span-4 min-h-[15rem] border-2 rounded-md border-white grid grid-cols-2">
                    {SidebarRoutes.map((route) => {
                        return(
                            <div 
                            key={route.id}
                            onClick={() => navigate(route.path,{ state: { refetch: true } })}
                            className="w-full h-12 flex flex-row items-center gap-4 pl-6 duration-10 hover:cursor-pointer hover:rounded-lg">
                                <div className="text-white">{route.icon}</div>
                                <p className="text-white">{route.label}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="col-span-2 rounded-md border-2 border-white grid grid-cols-1 px-4">
                    <div className="w-full h-[10rem] border-b border-white flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden border border-white">
                            <img className="object-cover max-w-full max-h-full" src="/gr-logo.png" alt="" />
                        </div>
                    </div>
                    <div className="w-full h-4 flex items-center justify-center">
                        <h3 className="text-white text-2xl">GR Hotel</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileNav
