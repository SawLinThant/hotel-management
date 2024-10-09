import { createContext, useContext, useState } from "react";

const AccountContext = createContext();

export const AccountProvider = ({children}) => {
   const [userType,setUserType] = useState(() => {
    const savedUserType = localStorage.getItem("userType");
    return savedUserType || "admin"
   });

   const SetUserType = ((userType) => {
    setUserType(userType);
    localStorage.setItem("userType",userType)
   })

   return(
    <AccountContext.Provider
    value={{
        userType:userType,
        SetUserType:SetUserType
    }}
    >
        {children}
    </AccountContext.Provider>
   )
}

export const useAccount = () => {
    const context = useContext(AccountContext);

    if (context === null) {
        throw new Error("useAccount must be used within a AccountProvider");
      }
    return context;
}