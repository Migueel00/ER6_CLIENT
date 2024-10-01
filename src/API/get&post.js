import { URL } from "./urls";

export const searchAndIfDontExistPost = async (playerData) => {

    //IP DE CLASE IKAS A3: 10.70.0.58
    //IP ASIER: 192.168.1.89
    //IP LANDER: 192.168.1.150
    
    const email = playerData.email;

    console.log("El email recibido es: " + email);

    try {
        const response = await fetch(`${URL.API_PLAYERS}/${email}`);

        // console.log("Respuesta del primer fetch: " + JSON.stringify(response));
        

        if(response.ok){

            const existingPlayer = await response.json();

            if(existingPlayer){

                console.log(`El correo ${email} ya está registrado`);
            }

        }else if(response.status === 400){

            console.log("PlayerData: " +  JSON.stringify(playerData));
            

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

export const searchAndChangeIsInsideLabState = async (qrValue) => {

    const userEmail = qrValue.userEmail;
    const userID = qrValue.playerID;

    console.log("El id recibido es: " + userID);
    console.log("El email recibido es: " + userEmail);

    try {

        const insideLabState = await getPlayerInsideLabState(userEmail);
 
        // Cambiamos el estado de isInsideLab
        const json = {
            "isInsideLab": !insideLabState
        };

        // Ahora hacemos la petición PATCH para actualizar el estado
        const updateResponse = await fetch(`${URL.API_PLAYERS}/${userID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        });

        console.log('Update Response:', JSON.stringify(updateResponse));

        if (updateResponse.ok) {
            const updatedPlayer = await updateResponse.json();
            console.log('Player updated:', updatedPlayer);
        } else {
            console.log('Failed to update player. Status:', updateResponse.status);
        }

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
        console.log('Failed to fetch player. Status:', playerResponse.status);
        return;
    }

    const playerData = await playerResponse.json();
    console.log('Player data fetched:', playerData);

    console.log("IS THE PLAYER INSIDE LAB? " + playerData.data.isInsideLab);

    return playerData.data.isInsideLab;
}

module.exports = {
    searchAndIfDontExistPost,
    searchAndChangeIsInsideLabState
} 