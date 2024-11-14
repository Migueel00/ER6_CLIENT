
import { URL } from "./urls";

export const updateArtifact = async (id : string, isRetrieved: boolean ) => {
    await fetch(`${URL.UPDATE_ARTIFACT}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(isRetrieved)
    });
}