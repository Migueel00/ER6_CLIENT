import Ingredient from "./ingredient.tsx";
import Potion from "./potion.tsx";
import { Effect } from "./potionsInterface.tsx";

export default class Cauldron {
    ingredients: Ingredient[];

    constructor(ingredients: Ingredient[]) {
        this.ingredients = ingredients;
    }

    createPotion(ingredient_name1: string, ingredient_name2: string) {
        const ingredient1 = this.ingredients.find(ingredient => ingredient.hasName(ingredient_name1));
        const ingredient2 = this.ingredients.find(ingredient => ingredient.hasName(ingredient_name2));

        if (!ingredient1 || !ingredient2) {
            throw new Error("One or both ingredients not found");
        }

        // Encuentra efectos comunes
        const common_effects: Effect[] = ingredient1.findCommonEffects(ingredient2);

        if (common_effects.length === 0) {
            return Potion.failed();
        }

        if (isPotionOfSanity(ingredient1, ingredient2)) {
            return Potion.sanity();
        } else {
            return Potion.with(
                common_effects[0],
                ingredient1.value + ingredient2.value // Valor combinado
            );
        }
    }
}

// Define el tipo de los ingredientes en la función
function isPotionOfSanity(i1: Ingredient, i2: Ingredient): boolean {
    return (i1.name === "Nightshade" && i2.name === "Ectoplasm") ||
           (i2.name === "Nightshade" && i1.name === "Ectoplasm");
}
