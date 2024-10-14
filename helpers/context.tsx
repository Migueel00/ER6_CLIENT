import React from "react";
import { ContextInterface } from "../interfaces/contextInterface";

const AppContext = React.createContext<ContextInterface | null>(null);

export default AppContext;