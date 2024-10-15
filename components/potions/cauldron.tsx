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

    private createNonCommonPotion(allEffects: string[]): Potion {
        const hasRestore = allEffects.some(effect => effect.includes("restore"));
        const hasDamage = allEffects.some(effect => effect.includes("damage"));

        if (hasRestore) {
            return new Antidote();
        }
        if (hasDamage) {
            return new Poison();
        }

        return new FailedPotion("Failed Potion", 0, 0);
    }

    private createHitPointsPotion(hitPointsEffects: string[]): Potion {
        const hasRestore = hitPointsEffects.some(effect => effect.includes("restore"));
        const hasDamage = hitPointsEffects.some(effect => effect.includes("damage"));

        if (hasRestore) {
            return new Essence();
        }
        if (hasDamage) {
            return new Stench();
        }

        return new FailedPotion("Failed Potion", 0, 0);
    }

    private createPotionFromEqualEffects(effects: string[], ingredients: Ingredient[]): Potion {
        const effect = effects[0]; // Asumimos que todos son iguales en este caso
        const isRestore = effect.includes("restore");
        const isDamage = effect.includes("damage");

        const attributes = ["constitution", "charisma", "insanity", "dexterity", "strength"];
        const matchingAttribute = attributes.find(attr => effect.includes(attr));

        if (!matchingAttribute) {
            return new FailedPotion("Failed Potion", 0, 0);
        }

        const modifier = this.determineModifier(effects);
        const combinedValue = this.calculateCombinedValue(ingredients);
        const modifierValue = this.determineModifierValue(combinedValue);
        const duration = this.determineDuration(modifier);

        const potionType = isRestore ? "Elixir" : "Venom";
        const potionName = `${modifier} ${matchingAttribute} ${potionType}`;

        return isRestore
            ? new Elixir(potionName, modifierValue, duration)
            : new Venom(potionName, modifierValue, duration);
    }

    private determineModifier(effects: string[]): string {
        if (effects.some(effect => effect.includes("least"))) {
            return "Least";
        } else if (effects.some(effect => effect.includes("lesser"))) {
            return "Lesser";
        } else if (effects.some(effect => effect.includes("greater"))) {
            return "Greater";
        }
        return ""; // Sin prefijo
    }

    private calculateCombinedValue(ingredients: Ingredient[]): number {
        const totalValue = ingredients.reduce((sum, ingredient) => sum + ingredient.value, 0);
        const averageValue = totalValue / ingredients.length;
        return Math.floor(averageValue / 5) * 5;
    }

    private determineModifierValue(averageValue: number): number {
        if (averageValue <= 5) {
            return 5;
        } else if (averageValue <= 10) {
            return 10;
        } else if (averageValue <= 15) {
            return 15;
        } else {
            return 20;
        }
    }

    private determineDuration(modifier: string): number {
        if (modifier === "Least" || modifier === "Lesser") {
            return 1;
        } else if (modifier === "Greater") {
            return 2;
        } else {
            return 2;
        }
    }

    private findCommonEffects(ingredients: Ingredient[]): string[] {
        const [firstIngredient, ...restIngredients] = ingredients;
        return firstIngredient.effects.filter(effect =>
            restIngredients.every(ingredient => ingredient.effects.includes(effect))
        );
    }
}
