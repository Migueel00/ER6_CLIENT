import { URL } from "./urls";

export const getALlMissions = async() => {

    try {
        const response = await fetch(URL.GET_MISSIONS);

        const json = await response.json();
    
        const missions = json.data;
    
        return missions;
    }
    catch (error){
        throw error;
    }
}