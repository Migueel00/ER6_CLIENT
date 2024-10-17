import Ingredient from "./ingredient.tsx";
import Potion,{Antidote, Poison, Elixir, Venom, Essence, Stench, FailedPotion } from "./potion.tsx";
import { essence_ingredients_number, essence_ingridient_multipliers } from "./constants.tsx";
import { Effect } from "./potionsInterface.tsx";
import Curse from "./curse.tsx";
import { Modifiers } from "./curse.tsx";

export default class Cauldron {
    ingredients: Ingredient[];
    curses: Curse[];

    constructor(ingredients: Ingredient[], curses: Curse[]) {
        this.ingredients = ingredients;
        this.curses = curses;
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
            return this.createNonCommonPotion(ingredients, allEffects);
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

    private createNonCommonPotion(ingredients: Ingredient[], allEffects: string[]): Potion {

        console.log("SE VA A CREAR UN ANTIDOTE / POISON ");

        const hasRestore = allEffects.some(effect => effect.includes("restore"));
        const hasDamage = allEffects.some(effect => effect.includes("damage"));

        let potionToCreate = null;

        if(hasRestore){
            potionToCreate = this.compareEffectsWithCursesToCreateAntidote(allEffects);
        } else if(hasDamage){
            potionToCreate = this.compareEffectsWithCursesToCreatePoison(allEffects);
        }
       
        console.log("POSION TO CREATE");
        console.log(potionToCreate);
        
        const name = potionToCreate?.name!;
        let modifiers: Modifiers = potionToCreate?.modifiers!;
        const id = potionToCreate?._id!;
        const description = potionToCreate?.description!;
        const type = potionToCreate?.type!;
        const poison_effects = potionToCreate?.poison_effects!;
        const antidote_effects = potionToCreate?.antidote_effects!;
        

        if (hasRestore) {
            const newModifiers = this.invertModifiers(modifiers);
            return new Antidote(newModifiers, id, "Antidote of " + name, description, type, antidote_effects);
        }
        if (hasDamage) {
            return new Poison(modifiers, id, "Poison of " + name, description, type, poison_effects);
        }

        return new FailedPotion("Tonic of Dawnfall", 0);
    }

    private invertModifiers(modifiers: Modifiers): Modifiers {
        // Invert the modifier values and keep 0 as 0
        const inverted = Object.fromEntries(
            Object.entries(modifiers).map(([key, value]) => [key, value === 0 ? 0 : -value])
        ) as unknown as Modifiers;
    
        return inverted;
    }
    
    private compareEffectsWithCursesToCreateAntidote(effectsToCompare: string[])
    {
        for(let i = 0; i < this.curses.length; i++)
        {
            if(this.curses[i].antidote_effects.sort().join(',') === effectsToCompare.sort().join(',')){
                //SAME EFFECTS
                return this.curses[i];
            }
        }

        return null;
    }

    private compareEffectsWithCursesToCreatePoison(effectsToCompare: string[])
    {
        for(let i = 0; i < this.curses.length; i++)
        {
            if(this.curses[i].poison_effects.sort().join(',') === effectsToCompare.sort().join(',')){
                //SAME EFFECTS
                return this.curses[i];
            }
        }

        return null;
    }

    private createHitPointsPotion(hitPointsEffects: string[], ingredients: Ingredient[]): Potion {

        console.log("SE VA A CREAR UN ESSENCE / STENCH POTION");

        const minimumEffect = this.findMinimumEffect(ingredients);
        console.log("MINIMUM EFFECT");
        console.log(minimumEffect);

        const ingredientQuantity = ingredients.length;
        let modifier = 1;
        let potionValue = this.getTotalValue(ingredients);
        let modifierName = minimumEffect.minimumEffect;

        console.log("POTION VALUE");
        console.log(potionValue);

        if(minimumEffect.allAreMinimum){
            switch(ingredientQuantity){
                case 2:
                    modifier = essence_ingridient_multipliers[essence_ingredients_number.TWO];
                    break;
                case 3:
                    modifier = essence_ingridient_multipliers[essence_ingredients_number.THREE];
                    break;
                case 4:
                    modifier = essence_ingridient_multipliers[essence_ingredients_number.FOUR];
                    break;
                default:
                    //Debería ser imposible llegar aquí, ya que no puede haber ni 1 ingrediente ni mas de 4
            }
        }

        if(modifierName === "normal"){
            modifierName = "";
        }
        else{
            modifierName += " ";
        }


        console.log("MODIFIER");
        console.log(modifier);
        
        potionValue = Math.ceil(potionValue * modifier);

        const hasIncrease = hitPointsEffects.some(effect => effect.includes("increase"));
        const hasDecrease = hitPointsEffects.some(effect => effect.includes("decrease"));

        if (hasIncrease) {
            return new Essence("Essence of " + modifierName + "heal", potionValue);
        }
        if (hasDecrease) {
            return new Stench("Stench of " + modifierName + "damage", potionValue);
        }

        return new FailedPotion("Tonic of Downfall", 0);
    }

    private createPotionFromEqualEffects(effects: string[], ingredients: Ingredient[]): Potion {
        const effect = effects[0]; // Asumimos que todos son iguales en este caso
        const isRestore = effect.includes("restore");
        const isDamage = effect.includes("damage");
        let potionName = "";
        let potionEffect = "Boost";

        if(isDamage){
            potionEffect = "Setback"
        }

        const attributes = ["constitution", "charisma", "insanity", "dexterity", "strength"];
        const matchingAttribute = attributes.find(attr => effect.includes(attr));

        // Capitalize the first letter
        const capsMatchingAttribute = matchingAttribute ? matchingAttribute.charAt(0).toUpperCase() + matchingAttribute.slice(1) : '';

        if (!matchingAttribute) {
            return new FailedPotion("Tonic of Downfall", 0);
        }

        let modifierValue = this.getTotalValue(ingredients);
        let modifierValueAverage = Math.floor(modifierValue / ingredients.length);
        let modifierValueAverageRoundedToLowerMultipleOfFive = this.roundDownToMultipleOfFive(modifierValueAverage);
        const modifier = this.determineElixirVenomModifier(modifierValueAverageRoundedToLowerMultipleOfFive);
        //let potionEffect = this.determineElixirVenomEffectName(matchingAttribute);

        let duration = this.getTotalDuration(ingredients);

        duration = Math.floor(duration / ingredients.length)

        const potionType = isRestore ? "Elixir" : "Venom";

        if(modifier === ""){
            potionName = `${capsMatchingAttribute} ${potionType}`;
        }
        else{
            potionName = `${modifier} ${capsMatchingAttribute} ${potionType}`;
        }

        if(isDamage){
            modifierValueAverageRoundedToLowerMultipleOfFive = -modifierValueAverageRoundedToLowerMultipleOfFive;

        }

        if(matchingAttribute === "insanity"){
            modifierValueAverageRoundedToLowerMultipleOfFive = -modifierValueAverageRoundedToLowerMultipleOfFive;
            if(isDamage){
                potionEffect = "Frenzy";
            }
            else{
                potionEffect = "Calm";
            }
        }

        return isRestore
            ? new Elixir(potionName, potionEffect, modifierValueAverageRoundedToLowerMultipleOfFive, duration)
            : new Venom(potionName, potionEffect, modifierValueAverageRoundedToLowerMultipleOfFive, duration);
    }

    private roundDownToMultipleOfFive(num: number): number {
        return num - (num % 5);
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

    private determineElixirVenomModifier(modifierValue: number): string {
        if (modifierValue <= 5) {
            return "Least";
        } else if (modifierValue <= 10) {
            return "Lesser";
        } else if (modifierValue <= 15) {
            return "";
        } else {
            return "Greater";
        }
    }

    private findCommonEffects(ingredients: Ingredient[]): boolean {
        const [firstIngredient, ...restIngredients] = ingredients;
    
        console.log("INGREDIENTES EN FINDCOMMONEFFECTS");
        console.log(ingredients);
    
        // Extract effect type
        const getEffectType = (effect: string): string => {
            const parts = effect.split('_');
            return parts.slice(-2).join('_'); // Returns the last part (dexterity, intelligence, hit_points, etc.)
        };
    
        //Extract effect type of first ingredient
        const firstIngredientEffectTypes = firstIngredient.effects.map(getEffectType);
    
        // Check if effect repeats in the rest of ingredients
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
        
        // Find minimum effect
        const uniqueEffects = [...new Set(allEffects)]; // Eliminate duplicates
        const minimumEffect = uniqueEffects.reduce((min, effect) => {
            return effectOrder.indexOf(effect) < effectOrder.indexOf(min) ? effect : min;
        }, "normal");
    
        // Verify if every effect is the minimum found
        const allAreMinimum = allEffects.every(effect => getEffectRarity(effect) === minimumEffect);
    
        return { minimumEffect, allAreMinimum };
    }
    
    private getTotalValue(ingredients: Ingredient[])
    {
        // Initialize in 0
        let totalValue = 0;

        //Function to obtain the effect of an ingredient and the corresponding value
        const getEffectValue = (effect: string): number => {
            if (effect.includes("least")) return 5;    // Effect "least"
            if (effect.includes("lesser")) return 10;  // Effect "lesser"
            if (effect.includes("greater")) return 20;  // Effect "greater"
            return 15;  // NOrmal effect
        };

        // Loop ingredients
        for (const ingredient of ingredients) {
            for (const effect of ingredient.effects) {
                //Add value depending on found effect
                totalValue += getEffectValue(effect);
            }
        }

        return totalValue;
    }

    private getTotalDuration(ingredients: Ingredient[])
    {
        // Initialize in 0
        let totalDuration = 0;

        //Function to obtain the effect of an ingredient and the corresponding value
        const getEffectDuration = (effect: string): number => {
            if (effect.includes("least" || "lesser")) return 1;    // Effect "least"
            if (effect.includes("greater")) return 3;  // Effect "greater"
            return 2;  // NOrmal effect
        };

        // Loop ingredients
        for (const ingredient of ingredients) {
            for (const effect of ingredient.effects) {
                //Add value depending on found effect
                totalDuration += getEffectDuration(effect);
            }
        }

        return totalDuration;
    }
    
}
