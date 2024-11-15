
import { URL } from "./urls";

export const updateArtifact = async (id : string, isRetrieved: boolean ) => {
    const objectToSend = {
        "isRetrieved" : isRetrieved
    }

    const response = await fetch(`${URL.UPDATE_ARTIFACT}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objectToSend)
    }); 

    const json = await response.json();
    console.log("RESPUESTA DE FETCH " + JSON.stringify(json));
}