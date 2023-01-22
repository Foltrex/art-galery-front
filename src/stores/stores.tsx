import UIStore from './UIStore';
import React from "react";
import {isServer} from "../utils/isServer";

let clientSideStores: { uiStore: UIStore; };

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

interface InterfaceStore {
    uiStore: UIStore
}


const StoreContext = React.createContext();

// const StoreContext = React.createContext<RootStore | undefined>(undefined);

export function StoreProvider(props) {
    return <StoreContext.Provider value={props.value}> {props.children} </StoreContext.Provider>;
}

export function useMobxStores() {
    return React.useContext(StoreContext);
}
