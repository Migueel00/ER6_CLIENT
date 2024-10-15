import Ingredient from "./ingredient.tsx";
import Potion, { Antidote, Poison, Elixir, Venom, Essence, Stench, FailedPotion } from "./potion.tsx";
import { Effect } from "./potionsInterface.tsx";

export default class Cauldron {
    ingredients: Ingredient[];

    constructor(ingredients: Ingredient[]) {
        this.ingredients = ingredients;
    }

    createPotion(ingredient_names: string[]): Potion {
        const selectedIngredients = this.ingredients.filter(ingredient =>
            ingredient_names.includes(ingredient.name)
        );

        if (selectedIngredients.length < 2) {
            throw new Error("At least two ingredients are required.");
        }

        // Encuentra efectos comunes
        const allEffects = selectedIngredients.map(ing => ing.effects).flat();
        const commonEffects = this.findCommonEffects(selectedIngredients);

        // Si no hay efectos comunes
        if (commonEffects.length === 0) {
            return this.createNonCommonPotion(allEffects);
        }

        // Si hay efectos comunes
        const hitPointsEffects = commonEffects.filter(effect => effect.includes("hit_points"));
        if (hitPointsEffects.length > 0) {
            return this.createHitPointsPotion(hitPointsEffects);
        }

        // Si los efectos son iguales
        return this.createPotionFromEqualEffects(commonEffects, selectedIngredients);
    }


}
