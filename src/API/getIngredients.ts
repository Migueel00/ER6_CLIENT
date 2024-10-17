import Ingredient from "../../components/potions/ingredient";

const getIngredientsAndFilter = async (userRole: string) => {
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

        const filteredIngredients: Ingredient[] = ingredientsData.filter((ingredient: Ingredient) => {
            switch (userRole) {
                case 'ACOLYTE':
                    return ingredient.effects.some(effect => effect.includes('restore') || effect.includes('increase'));
    
                case 'VILLAIN':
                    return ingredient.effects.some(effect => effect.includes('damage') || effect.includes('decrease'));
                default:
                    return false; // Optional: handle any other user roles
            }
        });

        return filteredIngredients;
    }
    catch (error){
        console.log(error);
    }
}

export default getIngredientsAndFilter;