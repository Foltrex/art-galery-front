import { createContext, ReactNode, useContext } from "react";
import { RootStore } from "../stores/rootStore";

let store: RootStore;
const StoreContext = createContext<RootStore | undefined>(undefined);

export const RootStoreProvider = ({children} : { children: ReactNode }) => {
    const root = store ?? new RootStore();
    return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
}

export const useRootStore = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useRootStore must be used within RootStoreProvider');
    }

    return context;
}