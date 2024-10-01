import { URL } from "./urls";

export const searchByEmail = async (playerEmail) => {

    console.log("PLAYEREMAIL IN SEARCH BY EMAIL: " + playerEmail);
    

    try {
        const response = await fetch(`${URL.API_PLAYERS}/${playerEmail}`);

        if(!response.ok){
    
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const player = await response.json();

        console.log("PLAYER IN SEARCH BY EMAIL: " + JSON.stringify(player.data));
        
        

        
        return player.data;
    }
    catch (error){

        throw error;
    }
}

