import { useNavigate } from "react-router-dom";
import { SidebarRoutes } from "../../../lib/config";

const Sidebar = () => {
    const navigate = useNavigate();
    return(
        <aside className="fixed top-0 left-0 lg:h-screen lg:w-[17vw] z-10 bg-gradient-to-b from-primary to-primarybold  text-white md:hidden lg:block">
            <div className="w-full h-full flex flex-col pl-5 pr-5 pt0">
                <div className="w-full h-24 border-b border-white flex flex-col">
                    <div className="w-full h-4"></div>
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="flex flex-row justify-around h-full w-full items-center gap-2">
                            <div className="flex justify-center items-center w-14 h-14 rounded-full border overflow-hidden border-white">
                                <img className="object-cover max-w-full max-h-full" src="/gr-logo.png" alt="logo" />
                                </div>
                        <h2 className="text-xl font-semibold">Hotel Yangon</h2>
                        </div>
                       
                    </div>
                </div>
                <div className="w-full flex flex-col gap-2 pt-4 pb-4">
                    {SidebarRoutes.map((route) => {
                        return(
                            <div 
                            onClick={() => navigate(route.path,{ state: { refetch: true } })}
                            className="w-full h-12 flex flex-row items-center gap-4 pl-6 duration-10 hover:border hover:cursor-pointer hover:rounded-lg hover:border-white">
                                <div className="">{route.icon}</div>
                                <p className="">{route.label}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </aside>
    )
}
export default Sidebar;