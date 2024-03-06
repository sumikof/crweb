import React, { createContext, useContext, useState } from "react";
import * as anchor from '@project-serum/anchor';
import { Crouton } from "@/lib/crouton/types/crouton";

const AccountContext = createContext({});

export function UserAccountProvider({ children }: any) {

    const [userAccount, setUserAccount] =
        useState<anchor.Program<Crouton>>(null!);

    return (
    <AccountContext.Provider value={{ userAccount, setUserAccount }}>
        {children}
    </AccountContext.Provider>
    );

}

export const useUserAccount:any = () => useContext(AccountContext);