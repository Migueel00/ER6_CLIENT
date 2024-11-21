
import { URL } from "./urls";

export const updateArtifact = async (id : string, isRetrieved: boolean, avatar: string ) => {
    const objectToSend = {
        "isRetrieved" : isRetrieved,
        "avatar" : avatar
    }

    const response = await fetch(`${URL.UPDATE_ARTIFACT}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objectToSend)
    }); 

    const json = await response.json();
    console.log("RESPUESTA DE FETCH DE UPDATE ARTIFACT" + JSON.stringify(json));
}