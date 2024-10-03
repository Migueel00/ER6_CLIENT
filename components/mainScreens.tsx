import React from "react";
import AcolyteScreens from "./acolyteScreens";
import MortimerScreens from "./mortimerScreen/mortimerScreens";

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
    userEmail: String;
    socketID: String;
    player: any;
    players:  Player[];
    setPlayers: (players: Player[]) => void;
}