import React, { createContext } from "react";

interface AcolyteContextType {
    isMenuLoaded: boolean;
    setIsMenuLoaded: (loaded: boolean) => void;
    isMenuLabLoaded: boolean;
    setIsMenuLabLoaded: (loaded: boolean) => void;
    isMenuInsideLabLoaded: boolean;
    setIsMenuInsideLabLoaded: (loaded: boolean) => void;
    isInsideLab: boolean | null;
}

const AcolyteContext = createContext<AcolyteContextType | null>(null);

export default AcolyteContext