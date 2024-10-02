import { FaUserGroup } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { CiCreditCard1 } from "react-icons/ci";
import { GrServicePlay } from "react-icons/gr";
import { BsFillTerminalFill } from "react-icons/bs";
import { SiCashapp } from "react-icons/si";
import { IoHome } from "react-icons/io5";

export const SidebarRoutes = [
    {
        id: 'home',
        label: 'Home',
        path: 'home',
        icon: <IoHome size={20}/>
    },
    {
        id: 'customer',
        label: 'Customer',
        path: 'user',
        icon: <FaUserGroup size={20}/>
    },
    {
        id: 'terminal',
        label: 'Terminal',
        path: 'terminal',
        icon: <BsFillTerminalFill size={20}/>
    },
    {
        id: 'transaction',
        label: 'Transaction',
        path: 'cardtransaction',
        icon: <GrTransaction size={20}/>
    },
    {
        id: 'card',
        label: 'Card',
        path: 'card',
        icon: <CiCreditCard1 size={20}/>
    },
    {
        id: 'facility',
        label: 'Business Unit',
        path: 'facility',
        icon: <GrServicePlay size={20}/>
    },
    {
        id: 'facilityservice',
        label: 'Service Package',
        path: 'facilityservice',
        icon: <GrServicePlay size={20}/>
    },
    {
        id: 'cashinamount',
        label: 'Cash In Amount',
        path: 'cashinamount',
        icon: <SiCashapp size={20}/>
    },
]

export const customerFilterOptions = [
    {
        value: "all",
        label: "All"
    },
    {
        value: 'disable',
        label: "Disable"
    },
    {
        value: 'enable',
        label: "Enable"
    },
]

export const cardFilterOptions = [
    {
        value: "all",
        label: "All"
    },
    {
        value: 'disable',
        label: "Disable"
    },
    {
        value: 'enable',
        label: "Enable"
    },
]

export const transactionFilterOptions = [
    {
        value: "all",
        label: "All"
    },
    {
        value: 'cash in',
        label: "Cash In"
    },
    {
        value: 'purchase',
        label: "Cash Out"
    },
]

export const terminalFilterOptions = [
    {
        value: "all",
        label: "All"
    },
    {
        value: 'disable',
        label: "Disable"
    },
    {
        value: 'enable',
        label: "Enable"
    },
]