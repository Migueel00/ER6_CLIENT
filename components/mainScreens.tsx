import AcolyteScreens from "./acolyteScreens";
import MortimerScreens from "./mortimerScreen/mortimerScreens";
import IstvanScreens from "./istvanScreens";
import React from "react";
import { Text } from 'react-native';

interface Player {
    socketId:     string,
    email:        string,
    nickname:     string,
    isInsideLab:  boolean,
    avatar:       string,
    id:           string
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
    switch (userRole) {
        case 'ACOLYTE':
            return (
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
            );
        case 'MORTIMER':
            return (
                <MortimerScreens
                userRole={userRole}
                profileAttributes={profileAttributes}
                players={players}
                setPlayers={setPlayers}
                setIsLoggedIn={setIsLoggedIn}
                />
            );

        case 'ISTVAN':
            return (
                <IstvanScreens
                userRole={userRole}
                profileAttributes={profileAttributes}
                setIsLoggedIn={setIsLoggedIn}
                />
            );
        default:
            return <Text>No role assigned</Text>;
    }
};

export default MainScreens;