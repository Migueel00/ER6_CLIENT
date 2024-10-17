import AcolyteScreens from "./acolyteScreens";
import MortimerScreens from "./mortimerScreen/mortimerScreens";
import IstvanScreens from "./istvanScreens";
import AcolyteScreens2 from "./acolyteScreens2";
import React, { useContext } from "react";
import { Text } from 'react-native';
import AppContext from "../helpers/context";

const MainScreens = () => {
    const userRole = useContext(AppContext)?.userRole;

    return (
        <>
            {userRole === 'ACOLYTE' ? (
                <AcolyteScreens2 />
            ) : userRole === 'MORTIMER' ? (
                <MortimerScreens />
            ) : userRole === 'ISTVAN' ? (
                <IstvanScreens />
            ) : (
                <Text>No role assigned</Text>
            )}
        </>
    );
}

export default MainScreens;