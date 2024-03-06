import React, { createContext, useContext, useState } from "react";
import Crouton from '@/lib/crouton/crouton';
import CroutonLib from "@/lib/crouton/crouton";

const CroutonContext = createContext({});

export function CroutonProvider({ children }: any) {

    const [crouton, setCrouton] =
        useState<Crouton>(new Crouton());

    return (
        <CroutonContext.Provider value={ {crouton} }>
            {children}
        </CroutonContext.Provider>
    );

}

export const useCrouton:any = () => useContext(CroutonContext);