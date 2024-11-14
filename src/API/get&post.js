import { URL } from "./urls";

export const searchAndIfDontExistPost = async (playerData) => {

    const email = playerData.email;
    const { _id, ...data } = playerData;

    console.log("PLAYERDATA FCM TOKEN");
    console.log(playerData.fcmToken);
    console.log("PLAYERDATA LOCATION");
    console.log(playerData.location);

    try {
        const response = await fetch(`${URL.API_PLAYERS}/${email}`);

        const responseJSON = await response.json();

        console.log("RESPONSE JSON");
        console.log(responseJSON.data.fcmToken);

        
        if(response.ok){
                console.log(`El correo ${email} ya está registrado`);

                console.log("PLAYERDATA FCM TOKEN");
                console.log(playerData.fcmToken);

                const updatedPlayerData = await updateNewAtributtes(responseJSON, playerData)

                console.log("UPDATEDPLAYERDATA IN RESPONSE OK");  
                console.log(updatedPlayerData.data.fcmToken);


                const player = await updatePlayerByEmail(updatedPlayerData.data);

                return player;

        }else if(response.status === 400){

            const res   = await fetch(`${URL.API_PLAYERS}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            
            if(!res.ok) throw new Error(`Error al insertar el player`);

            const { data: player } = await res.json();
            console.log(`Player insertado correctamente ${JSON.stringify(player)}`);

            return player;
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

        if (!response.ok) throw new Error(`Error ${response.status}: ${errorText}`); // Lanzar un error con el código y texto de la respuesta
        

        // Parsear la respuesta JSON solo si fue exitosa
        const { data: player } = await response.json();
        return player;

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

    console.log(updateResponse);
}



export const updateNewAtributtes = async (responseJSON, playerData) => {
    
    const newPlayerData = playerData;

    const newAtributtes = ['isInsideLab', 'isInsideTower', 'fcmToken', 'location', 'isInsideHall'];

    newAtributtes.forEach(attr => {
        if (attr in responseJSON.data) {
            if(attr === 'fcmToken')
            {
                console.log("EXISTE FCM TOKEN");
                console.log(playerData[attr]);
                newPlayerData[attr] = playerData[attr];
            }
            else
            {
                newPlayerData[attr] = responseJSON.data[attr];
            }
        } else {
            if(attr === 'location'){
                newPlayerData[attr] = 'HOME';
            }
            else
            {
                newPlayerData[attr] = false;
            }
        
        }
    });

    console.log('location: ' + newPlayerData.location);
    
    let newObj = {};

    newObj.data = {};

    newObj.data = newPlayerData;

    return newObj;

}

module.exports = {
    searchAndIfDontExistPost,
    searchAndChangeIsInsideLabState,
    patchPlayerWithUserID,
    getPlayerInsideLabState,
} 