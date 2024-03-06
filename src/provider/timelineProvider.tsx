import React, { createContext, useContext, useState } from "react";

const TimelineContext = createContext({});

export function TimelineProvider({ children }: any) {

    const [timeline, setTimeline] =
        useState(null);

    return (
        <TimelineContext.Provider value={{ timeline,setTimeline }}>
            {children}
        </TimelineContext.Provider>
    );

}

export const useTimeline:any = () => useContext(TimelineContext);