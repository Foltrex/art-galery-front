import UIStore from './UIStore';
import React from "react";
import {isServer} from "../utils/isServer";

let clientSideStores: { uiStore: UIStore; };

// TODO: ADD OTHER STORES OR MAYBE MADE IT WITH ROOT STORE
export function getStores(initialData = {uiStoreInitialData: {}}) {
    if (isServer) {
        return {
            uiStore: new UIStore(initialData.uiStoreInitialData),
        };
    }
    if (!clientSideStores) {
        clientSideStores = {
            uiStore: new UIStore(initialData.uiStoreInitialData),
        };
    }

    return clientSideStores
}

// TODO: ADD OTHER STORES OR MAYBE MADE IT WITH ROOT STORE
type InterfaceStore = {
    uiStore: UIStore
}

const StoreContext = React.createContext<InterfaceStore>({} as InterfaceStore);

export function StoreProvider(props: { value: any, children: any }) {
    return <StoreContext.Provider value={props.value}> {props.children} </StoreContext.Provider>;
}

export function useMobxStores() {
    return React.useContext(StoreContext);
}
