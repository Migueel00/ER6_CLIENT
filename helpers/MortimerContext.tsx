import { createContext } from "react";

interface MortimerContextType {
    isMenuLoaded: boolean;
    setIsMenuLoaded: (loaded: boolean) => void;
    isMenuConnectionLoaded: boolean;
    setIsMenuConnectionLoaded: (loaded: boolean) => void;
    isMenuTowerLoaded: boolean;
    setIsMenuTowerLoaded: (loaded: boolean) => void;
    isMenuSwampLoaded: boolean;
    setIsMenuSwampLoaded:  (loaded: boolean) => void;
    isMenuOldSchoolLoaded: boolean;
    setIsMenuOldSchoolLoaded:  (loaded: boolean) => void;
    isMenuHallOfSagesLoaded: boolean;
    setIsMenuHallOfSagesLoaded:  (loaded: boolean) => void;
    isMenuObituaryLoaded: boolean;
    setIsMenuObituaryLoaded: (loaded: boolean) => void;
    showAlertButton: boolean;
    setShowAlertButton:  (loaded: boolean) => void;
}

const MortimerContext = createContext<MortimerContextType | null>(null);

export default MortimerContext;