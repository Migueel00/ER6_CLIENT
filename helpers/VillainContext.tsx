import { createContext } from "react";

interface VillainContexType {
    isMenuLoaded: boolean;
    setIsMenuLoaded: (loaded: boolean) => void;
    isMenuLabLoaded: boolean;
    setIsMenuLabLoaded: (loaded: boolean) => void;
}

const VillainContext = createContext<VillainContexType | null>(null);

export default VillainContext;