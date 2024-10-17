import React, { createContext } from "react";

interface AcolyteContextType {
    isMenuLoaded: boolean;
    setIsMenuLoaded: (loaded: boolean) => void;
    isMenuLabLoaded: boolean;
    setIsMenuLabLoaded: (loaded: boolean) => void;
    isMenuInsideLabLoaded: boolean;
    setIsMenuInsideLabLoaded: (loaded: boolean) => void;
}

const AcolyteContext = createContext<AcolyteContextType | null>(null);

export default AcolyteContext