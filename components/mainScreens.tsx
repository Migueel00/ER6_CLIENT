import AcolyteScreens from "./acolyteScreens";
import MortimerScreens from "./mortimerScreen/mortimerScreens";
import IstvanScreens from "./istvanScreens";
import React from "react";
import { Text } from 'react-native';
import AppContext from "../helpers/context";

interface Player {
    socketId:     string,
    email:        string,
    nickname:     string,
    isInsideLab:  boolean,
    avatar:       string,
    id:           string,
    role:         string
}

interface MainScreenProps {
    userRole: string;
    profileAttributes: any;
    userEmail: string;
    socketID: string;
    player: any;
    players:  Player[];
    setPlayers: (players: Player[]) => void;
    setIsLoggedIn: any
}

const MainScreens: React.FC<MainScreenProps> = ({ userRole, profileAttributes, userEmail, socketID, player, players, setPlayers, setIsLoggedIn }) => {

    return (
        <AppContext.Provider value={{ userRole, profileAttributes, setIsLoggedIn, players, setPlayers, userEmail, player,}}>
            {userRole === 'ACOLYTE' ? (
                <AcolyteScreens
                    userRole={userRole}
                    profileAttributes={profileAttributes}
                    userEmail={userEmail}
                    socketID={socketID}
                    player={player}
                    players={players}
                    setPlayers={setPlayers}
                    setIsLoggedIn={setIsLoggedIn}
                />
            ) : userRole === 'MORTIMER' ? (
                <MortimerScreens
                    userRole={userRole}
                    profileAttributes={profileAttributes}
                    players={players}
                    
                    setPlayers={setPlayers}
                    setIsLoggedIn={setIsLoggedIn}
                />
            ) : userRole === 'ISTVAN' ? (
                <IstvanScreens
                    userRole={userRole}
                    profileAttributes={profileAttributes}
                    setIsLoggedIn={setIsLoggedIn}
                />
            ) : (
                <Text>No role assigned</Text>
            )}
        </AppContext.Provider>
    );
}

export default MainScreens;