import { createContext } from "react";

interface VillainContexType {
    isMenuLoaded: boolean;
    setIsMenuLoaded: (loaded: boolean) => void;
    isMenuLabLoaded: boolean;
    setIsMenuLabLoaded: (loaded: boolean) => void;
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
}

const IstvanContext = createContext<VillainContexType | null>(null);

export default IstvanContext;