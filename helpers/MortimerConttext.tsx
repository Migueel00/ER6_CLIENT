import { createContext } from "react";

interface MortimerContextType {
    isMenuLoaded: boolean;
    setIsMenuLoaded: (loaded: boolean) => void;
    isMenuConnectionLoaded: boolean;
    setIsMenuConnectionLoaded: (loaded: boolean) => void;
}

const MortimerContext = createContext<MortimerContextType | null>(null);

export default MortimerContext;