import React, { createContext } from "react";

interface AcolyteContextType {
    isMenuLoaded: boolean;
    setIsMenuLoaded: (loaded: boolean) => void;
    isMenuLabLoaded: boolean;
    setIsMenuLabLoaded: (loaded: boolean) => void;
    isMenuInsideLabLoaded: boolean;
    setIsMenuInsideLabLoaded: (loaded: boolean) => void;
    isMenuTowerLoaded: boolean;
    setIsMenuTowerLoaded: (loaded: boolean) => void;
    isMenuSwampLoaded: boolean;
    setIsMenuSwampLoaded:  (loaded: boolean) => void;
    isMenuOldSchoolLoaded: boolean;
    setIsMenuOldSchoolLoaded:  (loaded: boolean) => void;
    isMenuHallOfSagesLoaded: boolean;
    setIsMenuHallOfSagesLoaded:  (loaded: boolean) => void;
    isInsideLab: boolean | null;
    isInsideTower: boolean | null;
}

const AcolyteContext = createContext<AcolyteContextType | null>(null);

export default AcolyteContext