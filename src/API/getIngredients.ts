import Ingredient from "../../components/potions/ingredient";

// Función para obtener ingredientes
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
                    // Retorna true si se cumple alguna condición para ACOLYTE
                    return ingredient.effects.some(effect => 
                        effect.includes('restore') || 
                        effect.includes('increase') || 
                        effect.includes('calm') || 
                        effect.includes('boost') || 
                        effect.includes('frenzy')
                    );
        
                case 'VILLAIN':
                    // Retorna true si se cumple alguna condición para VILLAIN
                    return ingredient.effects.some(effect => 
                        effect.includes('damage') || 
                        effect.includes('decrease') || 
                        effect.includes('setback') || 
                        effect.includes('frenzy')
                    );
        
                default:
                    return false; // Maneja cualquier otro rol de usuario
            }
        });
        
        // Retorna los ingredientes filtrados
        return filteredIngredients;
        
    }
    catch (error){
        console.log(error);
    }
};

export default getIngredientsAndFilter;