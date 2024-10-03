import AcolyteScreens from "./acolyteScreens";
import MortimerScreens from "./mortimerScreen/mortimerScreens";
import React from 'react';
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
}

const MainScreens: React.FC<MainScreenProps> = ({ userRole, profileAttributes, userEmail, socketID, player, players, setPlayers }) => {
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
                />
            );
        case 'MORTIMER':
            return (
                <MortimerScreens
                userRole={userRole}
                profileAttributes={profileAttributes}
                players={players}
                setPlayers={setPlayers}
                />
            );
        default:
            return <Text>No role assigned</Text>;
    }
};

export default MainScreens;