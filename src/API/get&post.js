import { URL } from "./urls";

export const searchAndIfDontExistPost = async (playerData) => {

    //IP DE CLASE IKAS A3: 10.70.0.58
    //IP ASIER: 192.168.1.89
    //IP LANDER: 192.168.1.150

    
    const email = playerData.email;

    const playerInsideLab = await getPlayerInsideLabState(email);

    playerData.isInsideLab = playerInsideLab;

    console.log("El email recibido es: " + email);

    try {
        const response = await fetch(`${URL.API_PLAYERS}/${email}`);
        
        if(response.ok){

            const existingPlayer = await response.json();

            if(existingPlayer){
                console.log(`El correo ${email} ya está registrado`);
                await updatePlayerByEmail(playerData);
            }

        }else if(response.status === 400){

            

            const res   = await fetch(`${URL.API_PLAYERS}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(playerData)
            });
        
            if(!res.ok){
        
                throw new Error('Error al insertar el player');
            }else{
                
                console.log("Player insertado correctamente");
            }

        }else {

            throw new Error("Error al comprobar el correo");
        }

    } 
    catch (error){

        console.error(error.message);
    }

}

export const updatePlayerByEmail = async (data) => {
    const email = data.email;

    const { _id, ...updateData } = data;

    try {
        const response = await fetch(`${URL.UPDATE_PLAYER_BY_EMAIL}/${email}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updateData)
        });

        if (!response.ok) {
            const errorText = await response.text(); // Obtener la respuesta como texto
            throw new Error(`Error ${response.status}: ${errorText}`); // Lanzar un error con el código y texto de la respuesta
        }

        // Parsear la respuesta JSON solo si fue exitosa
        const jsonResponse  = await response.json();
        const player        = jsonResponse.data;

        console.log("PLAYER UPDATEADO: " + JSON.stringify(player));
        

    } catch (error) {
        
        console.error("Error al actualizar el player", error);
        throw error;
    }
}

export const searchAndChangeIsInsideLabState = async (qrValue) => {

    const userEmail = qrValue.userEmail;
    const userID = qrValue.playerID;

    try {

        const insideLabState = await getPlayerInsideLabState(userEmail);

        // Cambiamos el estado de isInsideLab
        const json = {
            "isInsideLab": !insideLabState
        };

        await patchPlayerWithUserID(userID, json);

    } catch (error) {
        console.error(error.message);
    }
}

export const getPlayerInsideLabState = async (userEmail) => {
        // Primero, obtenemos los datos del jugador para saber el estado actual de isInsideLab
        const playerResponse = await fetch(`${URL.API_PLAYERS}/${userEmail}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!playerResponse.ok) {

        return;
    }

    const playerData = await playerResponse.json();

    return playerData.data.isInsideLab;
}

export const patchPlayerWithUserID = async (userID, patchJSON) => {
    // Ahora hacemos la petición PATCH para actualizar el estado
    const updateResponse = await fetch(`${URL.API_PLAYERS}/${userID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patchJSON),
    });
}

module.exports = {
    searchAndIfDontExistPost,
    searchAndChangeIsInsideLabState,
    patchPlayerWithUserID,
    getPlayerInsideLabState,
} 