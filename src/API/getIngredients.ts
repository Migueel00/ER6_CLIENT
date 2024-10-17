import Ingredient from "../../components/potions/ingredient";


const getIngredients = async () => {
    try {
        const response = await fetch('https://kaotika-server.fly.dev/ingredients');
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        
        const jsonData = await response.json();
        const ingredientsData: Ingredient[] = jsonData.data.map(({ _id, name, description, value, effects, type }: Ingredient) => ({
            id: _id,
            name,
            description,
            value,
            effects,
            type,
        }));

        return ingredientsData;
    }
    catch (error){
        console.log(error);
    }
}

export default getIngredients;