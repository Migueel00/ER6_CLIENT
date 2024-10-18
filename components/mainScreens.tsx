import MortimerScreens from "./mortimerScreen/mortimerScreens";
import IstvanScreens from "./istvanScreens";
import AcolyteScreens2 from "./acolyteScreen/acolyteScreens2";
import React, { useContext, useState } from "react";
import { Text } from 'react-native';
import AppContext from "../helpers/context";
import VillainScreens from "./villainScreen/VillainScreens";



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
            ) : userRole === 'VILLAIN' ?(
                <VillainScreens/>
            ) :
                <Text>No role assigned</Text>}
        </>
    );
}

export default MainScreens;