import { URL } from "./urls";

export const searchAndIfDontExistPost = async (playerData) => {

    //IP DE CLASE IKAS A3: 10.70.0.58
    //IP ASIER: 192.168.1.89
    
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

module.exports = {
    searchAndIfDontExistPost
} 