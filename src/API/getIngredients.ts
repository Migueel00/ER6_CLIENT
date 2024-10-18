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
                    console.log("HA ENTRADO EN ACOLYTE");
                    
                    return ingredient.effects.some(effect => effect.includes('restore') || effect.includes('increase') || effect.includes('calm') || effect.includes('boost') || effect.includes('frenzy'));
    
                case 'VILLAIN':
                    console.log("HA ENTRADO EN VILLAIN");
                    return ingredient.effects.some(effect => effect.includes('damage') || effect.includes('decrease') || effect.includes('setback') || effect.includes('frenzy'));
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