import Ingredient from "./ingredient.tsx";
import Potion,{Antidote, Poison, Elixir, Venom, Essence, Stench, FailedPotion } from "./potion.tsx";
import { essence_ingredients_number, essence_ingridient_multipliers } from "./constants.tsx";
import { Effect } from "./potionsInterface.tsx";

export default class Cauldron {
    ingredients: Ingredient[];

    constructor(ingredients: Ingredient[]) {
        this.ingredients = ingredients;
    }

    // Ahora recibe directamente un array de Ingredient
    createPotion(ingredients: Ingredient[]): Potion {

        console.log("Ingredientes insertados:");
        console.log(ingredients);
        
        
        if (ingredients.length < 2) {
            throw new Error("At least two ingredients are required");
        }

        // Encuentra efectos comunes
        const allEffects = ingredients.map(ing => ing.effects).flat();
        const commonEffects = this.findCommonEffects(ingredients);

        console.log("ALL EFFECTS:"); 
        console.log(allEffects);
        
        console.log("COMMON EFFECTS");
        console.log(commonEffects);
        
        // Si no hay efectos comunes
        if (!commonEffects) {

            console.log("NO HAY EFECTOS COMUNES");
            return this.createNonCommonPotion(allEffects);
        }
        else
        {
            const hitPointsEffects = allEffects.filter(effect => effect.includes("hit_points"));


            console.log("HITPOINT EFFECTS");
            console.log(hitPointsEffects);
    
    
            if (hitPointsEffects.length > 0) {
                console.log("HAY EFECTOS COMUNES HITPOINTS");
                return this.createHitPointsPotion(hitPointsEffects, ingredients);
            }
    
            // Si los efectos son iguales
            console.log("HAY EFECTOS COMUNES QUE NO SON HITPOINTS");
            return this.createPotionFromEqualEffects(allEffects, ingredients);
        }
       
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

    private createHitPointsPotion(hitPointsEffects: string[], ingredients: Ingredient[]): Potion {

        console.log("SE VA A CREAR UN HITPOINT POTION");

        const minimumEffect = this.findMinimumEffect(ingredients);
        console.log("MINIMUM EFFECT");
        console.log(minimumEffect);

        const hasIncrease = hitPointsEffects.some(effect => effect.includes("increase"));
        const hasDecrease = hitPointsEffects.some(effect => effect.includes("decrease"));

        if (hasIncrease) {
            return new Essence("Essence", 0, 1);
        }
        if (hasDecrease) {
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

    private findCommonEffects(ingredients: Ingredient[]): boolean {
        const [firstIngredient, ...restIngredients] = ingredients;
    
        console.log("INGREDIENTES EN FINDCOMMONEFFECTS");
        console.log(ingredients);
    
        // Función auxiliar para extraer el tipo de efecto
        const getEffectType = (effect: string): string => {
            const parts = effect.split('_');
            return parts.slice(-2).join('_'); // Retorna la parte final como "hit_points", "dexterity", etc.
        };
    
        // Extraemos los tipos de efecto del primer ingrediente
        const firstIngredientEffectTypes = firstIngredient.effects.map(getEffectType);
    
        // Comprobamos si al menos un efecto se repite en todos los ingredientes
        return firstIngredientEffectTypes.some(effectType =>
            restIngredients.every(ingredient =>
                ingredient.effects.some(effect => getEffectType(effect) === effectType)
            )
        );
    }
    
    private findMinimumEffect(ingredients: Ingredient[]): { minimumEffect: string, allAreMinimum: boolean } {
        // Definimos el orden de los efectos
        const effectOrder: string[] = [ "least", "lesser", "normal", "greater"];
    
        // Función para extraer el tipo de rareza
        const getEffectRarity = (effect: string): string => {
            if (effect.includes("least")) return "least";
            if (effect.includes("lesser")) return "lesser";
            if (effect.includes("greater")) return "greater";
            return "normal"; // Si no se encuentra, se considera "nada"
        };
    
        // Extraemos los rarities de todos los ingredientes
        const allEffects = ingredients.flatMap(ingredient => ingredient.effects.map(effect => getEffectRarity(effect)));
    
        console.log("ALL EFFECTS");
        console.log(allEffects);
        
        

        // Encontrar el efecto mínimo en base al orden
        const uniqueEffects = [...new Set(allEffects)]; // Para eliminar duplicados
        const minimumEffect = uniqueEffects.reduce((min, effect) => {
            return effectOrder.indexOf(effect) < effectOrder.indexOf(min) ? effect : min;
        }, "normal");
    
        // Verificamos si todos los efectos son el mínimo encontrado
        const allAreMinimum = allEffects.every(effect => getEffectRarity(effect) === minimumEffect);
    
        return { minimumEffect, allAreMinimum };
    }
    
    
}
