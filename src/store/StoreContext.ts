import { userStore } from "./userStore";
import React from "react";

export const StoreContext = React.createContext({ userStore });
export const useStores = () => React.useContext(StoreContext);
