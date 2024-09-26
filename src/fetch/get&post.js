const searchAndIfDontExistPost = async (playerData) => {

    const email    = playerData.email;

    try {
        const response = await fetch(`http://192.168.1.134:3000/api/players/${email}`);

        if(response.ok){

            const existingPlayer = await response.json();

            if(existingPlayer){

                console.log(`El correo ${email} ya está registrado`);
            }

        }else if(response.status === 400){

            const res   = await fetch('http://192.168.1.134:3000/api/players', {
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