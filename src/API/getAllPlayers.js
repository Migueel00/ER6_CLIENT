import { URL } from "./urls";

export const getAllPlayers = async () => {
    try {
        const res = await fetch(URL.GET_ALL_PLAYERS);

        // Validar si la respuesta es exitosa
        if (!res.ok) {
            console.error("UN ERROR INESPERADO A OCURRIDO");
            return []; // Devuelve un array vacío en caso de error
        }

        // Verifica que la respuesta contiene datos válidos
        const players = await res.json();

        // console.log('GET ALL PLAYERS RESPONSE');
        //console.log(players.data);
        
        // if (!players || !Array.isArray(players)) {
        //     console.error("La respuesta del servidor no es un array válido.");
        //     return []; // Devuelve un array vacío si los datos no son válidos
        // }

        // Filtrar el jugador cuyo email sea 'asier.arguinchona.fake@ikasle.aeg.eus'
        const filteredPlayers = players.data.filter(
            player => player.email !== 'asier.arguinchona.fake@ikasle.aeg.eus'
        );

        // console.log('ALL PLAYERS FILTERED');
        // console.log(filteredPlayers);
        
        

        return filteredPlayers;

    } catch (error) {
        console.error("Error general: ", error);
        return []; // Devuelve un array vacío en caso de excepción
    }
};