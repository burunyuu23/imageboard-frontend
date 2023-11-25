"use client"
import React, {createContext} from 'react';
import {useFetch} from "@/shared/hooks/useFetch";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type LoadingPanelProps<T> = {
    fetcher: ReturnType<typeof useFetch<T>>;
    children: React.ReactNode;
    count?: number
};

export const LoadingContext = createContext<any>(undefined)
const LoadingPanel = <T, >({fetcher, children, count}: LoadingPanelProps<T>) => {

    console.log(fetcher)

    // TODO: Придумать что-нибудь с цветами (использовать theme.useToken())
    // TODO: Придумать что-нибудь с размером скелетона
    return <LoadingContext.Provider value={fetcher.data}>
        {fetcher.loading ? <Skeleton height="100px"
                                     baseColor={"#2a689d"}
                                     highlightColor={"#020D71"}
                                     borderRadius="0.5rem"
                                     count={count || 1}
                                     duration={2}/> :
            fetcher.error ? <Skeleton height="100px"
                                      baseColor={"#9d2a2a"}
                                      highlightColor={"#710202"}
                                      borderRadius="0.5rem"
                                      count={count || 1}
                                      duration={2}/> : fetcher.data && children}
    </LoadingContext.Provider>;
};

export default LoadingPanel;
