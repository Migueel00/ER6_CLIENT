import Ingredient from "../../components/potions/ingredient";

// Función para obtener ingredientes
const getIngredientsAndFilter = async () => {
    try {
        const response = await fetch('https://kaotika-server.fly.dev/ingredients');
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        
        const jsonData = await response.json();
        return jsonData.data;
    } catch (error) {
        console.error("Error fetching ingredients:", error);
        return []; // Retornar un array vacío en caso de error
    }
};

export default getIngredientsAndFilter;