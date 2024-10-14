import AcolyteScreens from "./acolyteScreens";
import MortimerScreens from "./mortimerScreen/mortimerScreens";
import IstvanScreens from "./istvanScreens";
import AcolyteScreens2 from "./acolyteScreens2";
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


const MainScreens = () => {

    return (
            <>
            userRole === 'ACOLYTE' ? (
                <AcolyteScreens2
                />
            ) : userRole === 'MORTIMER' ? (
                <MortimerScreens
                />
            ) : userRole === 'ISTVAN' ? (
                <IstvanScreens
                />
            ) : (
                <Text>No role assigned</Text>
            )
            </>

    );
}

export default MainScreens;