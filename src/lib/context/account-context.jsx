import { createContext, useContext, useState } from "react";

const AccountContext = createContext();

export const AccountProvider = ({children}) => {
   const [userType,setUserType] = useState("GR");

   const SetUserType = ((userType) => {
    setUserType(userType);
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