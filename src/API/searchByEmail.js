import { URL } from "./urls";

export const searchByEmail = async (playerEmail) => {

    try {
        const response = await fetch(`${URL.API_PLAYERS}/${playerEmail}`);

        if(!response.ok){
    
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const player = await response.json();
        
        return player.data;
    }
    catch (error){

        throw error;
    }
}

