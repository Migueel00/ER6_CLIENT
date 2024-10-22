import { URL } from "./urls";

export const getAllPlayers = async () => {
    
    try {
        const res = await fetch(URL.GET_ALL_PLAYERS);

        if(!res.ok) console.log("UN ERROR INESPERADO A OCURRIDO");
        

        const players = res.json();

        return players;
    }

    catch (error){

        console.error(error)
    }
}
