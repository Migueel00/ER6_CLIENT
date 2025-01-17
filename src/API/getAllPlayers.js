import axiosInstance from "../../components/utils/axiosInstance";
import { URL } from "./urls";

export const getAllPlayers = async (accessToken) => {
    try {
        const res = await axiosInstance.get(URL.GET_ALL_PLAYERS, {
            headers: {
                'authorization': `Bearer ${accessToken}`,
            }
        })
        console.log('RESPUESTA DE GETALLPLAYERS');
        console.log(res);

        // Validar si la respuesta es exitosa
        if (res.status !== 200) {
            console.error("UN ERROR INESPERADO A OCURRIDO");
            console.log(res);

            return []; // Devuelve un array vacío en caso de error
        }

        // Verifica que la respuesta contiene datos válidos
        const players = res.data;

        // Filtrar el jugador cuyo email sea 'asier.arguinchona.fake@ikasle.aeg.eus'
        const filteredPlayers = players.data.filter(
            player => player.email !== 'asier.arguinchona.fake@ikasle.aeg.eus'
        );

        return filteredPlayers;

    } catch (error) {
        console.error("Error general: ", error);
        return []; // Devuelve un array vacío en caso de excepción
    }
};