import Ingredient from "./ingredient.tsx";
import Potion,{Antidote, Poison, Elixir, Venom, Essence, Stench, FailedPotion, PurificationPotion } from "./potion.tsx";
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

        const attributes = ["hit_points", "constitution", "charisma", "insanity", "dexterity", "strength", "intelligence", "calm", "frenzy", "boost", "setback", "cleanse"];
        const matchingAttribute = attributes.find(attr => 
            allEffects.every(effect => effect.includes(attr))
        );

        console.log("COMMON EFFECT 2");
        console.log(matchingAttribute);
        
        if (ingredients.length === 2 &&
            ingredients.some(ingredient => ingredient.name === "Dragon's Blood Resin") &&
            ingredients.some(ingredient => ingredient.name === "Gloomshade Moss")) {
            console.log("HA ENTRADO A CREAR POCION DE PURIFICACION");
                
            return this.createPurificationPotion();
        }

        console.log(ingredients);
        
        console.log(ingredients.length);
        console.log(ingredients[0].name);
        console.log(ingredients[1].name);
        
        
        
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
            if(matchingAttribute != 'boost' && matchingAttribute != 'setback') {
                return this.createPotionFromEqualEffects(allEffects, ingredients);
            } else {
                return new FailedPotion("Tonic of Dawnfall", 0);
            }

        }
       
    }

    private createNonCommonPotion(ingredients: Ingredient[], allEffects: string[]): Potion {

        console.log("SE VA A CREAR UN ANTIDOTE / POISON ");

        const hasRestore = allEffects.some(effect => effect.includes("restore"));
        const hasDamage = allEffects.some(effect => effect.includes("damage"));

        let potionToCreate = null;

        if(hasRestore){
            console.log("Has restore");        
            potionToCreate = this.compareEffectsWithCursesToCreateAntidote(allEffects);
        } else if(hasDamage){
            console.log("Has damage");  
            potionToCreate = this.compareEffectsWithCursesToCreatePoison(allEffects);
        }
       
        console.log("POSION TO CREATE");
        console.log(potionToCreate);
        
        if(potionToCreate != null)
        {
            const name = potionToCreate?.name!;
            let modifiers: Modifiers = potionToCreate?.modifiers!;
            const id = potionToCreate?._id!;
            const description = potionToCreate?.description!;
            const type = potionToCreate?.type!;
            const poison_effects = potionToCreate?.poison_effects!;
            const antidote_effects = potionToCreate?.antidote_effects!;

            let createdModifier: Modifiers = this.createRandomModifiers(allEffects);

            if (hasRestore) {

                return new Antidote(createdModifier, id, "Antidote of " + name, description, type, antidote_effects);
            }
            if (hasDamage) {
                const newModifiers = this.invertModifiers(modifiers);
                return new Poison(newModifiers, id, "Poison of " + name, description, type, poison_effects);
            }
        }

        return new FailedPotion("Tonic of Dawnfall", 0);
    }
    
    private createRandomModifiers(effects: string[])
    {
        let modifier: Modifiers =   {hit_points: 0, 
                                    intelligence: 0, 
                                    dexterity: 0, 
                                    insanity: 0, 
                                    charisma: 0, 
                                    constitution: 0, 
                                    strength: 0};

        const attributes: (keyof Modifiers)[] = ["constitution", "hit_points", "dexterity", "strength", "charisma", "intelligence", "insanity"];
        const prefixes = ["least", "lesser", "greater"];

        effects.forEach(item => {
            console.log(item);
            
            const affectedAttribute = attributes.find(attribute => item.includes(attribute));
            const rarity = prefixes.find(rarity => item.startsWith(rarity)) || "no prefix";
            
            console.log("ATTR");
            console.log(affectedAttribute);
            
            

            modifier = this.determineAffectedAttributeAndAddToModifier(modifier, affectedAttribute!, rarity);

        })
        
        return modifier;
                                    
    }

    private determineAffectedAttributeAndAddToModifier(modifier: Modifiers, attribute: string, rarity: string)
    {
        switch(attribute)
        {

            case "constitution" || "dexterity" || "strength" || "charisma" || "intelligence":

                console.log("CHANGED NORMAL ATTR");
                

                let value = 0;

                if (rarity === "least") {
                    value = this.getRandomModifierNumber(1, 5);
                  } else if (rarity === "lesser") {
                    value = this.getRandomModifierNumber(6, 9);
                  } else if (rarity === "greater") {
                    value = this.getRandomModifierNumber(14, 15);
                  } else { // Sin prefijo
                    value = this.getRandomModifierNumber(10, 13);;
                  }

                  modifier[attribute] += value;

                break;

            case "hit_points":

                console.log("CHANGED HITPOINT ATTR");

                let valueHitPoints = 0;

                if (rarity === "least") {
                    valueHitPoints = this.getRandomModifierNumber(20, 35);
                } else if (rarity === "lesser") {                 
                    valueHitPoints = this.getRandomModifierNumber(40, 50);
                } else if (rarity === "greater") {
                    valueHitPoints = 65;
                } else { // Sin prefijo
                    valueHitPoints = this.getRandomModifierNumber(50, 65);
                }

                modifier.hit_points += valueHitPoints;

                break;
    
            case "insanity":

                let valueInsanity = 0;

                if (rarity === "least") {
                    valueInsanity = this.getRandomModifierNumber(1, 5);
                } else if (rarity === "lesser") {
                    valueInsanity = this.getRandomModifierNumber(6, 12);
                } else if (rarity === "greater") {
                    valueInsanity = this.getRandomModifierNumber(21, 25);
                } else { // Sin prefijo
                    valueInsanity = this.getRandomModifierNumber(13, 20);
                }

                modifier[attribute] += valueInsanity;

                break;

            default:
                //MODIFIACDOR NO ENCONTRADO
                
        }

        console.log("MODIFIER NOW");
        console.log(modifier);

        return modifier;
    }

    private getRandomModifierNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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
            console.log("POISON EFFECTS");
            console.log(this.curses[i].poison_effects.sort().join(','));
    
            console.log("ANTIDOTE EFFECTS");
            console.log(this.curses[i].antidote_effects.sort().join(','));

            if(this.curses[i].antidote_effects.sort().join(',') === effectsToCompare.sort().join(',')){
                //SAME EFFECTS
                return this.curses[i];
            }
        }

        return null;
    }

    private compareEffectsWithCursesToCreatePoison(effectsToCompare: string[])
    {
        let isPoison = false;
        let isAntidote = false;
        for(let i = 0; i < this.curses.length; i++)
        {
            console.log("POISON EFFECTS");
            console.log(this.curses[i].poison_effects.sort().join(','));

            console.log("ANTIDOTE EFFECTS");
            console.log(this.curses[i].antidote_effects.sort().join(','));
            
            if(this.curses[i].poison_effects.sort().join(',') === effectsToCompare.sort().join(',')){
                //SAME EFFECTS
                isPoison = true;
                console.log("CREADO POISON");
                
            }

            if (this.curses[i].antidote_effects.sort().join(',') === effectsToCompare.sort().join(',')){
                isAntidote = true;
                console.log("CREADO ANTIDOTE");     
            }

            if(isPoison || isAntidote) {
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

        const isFailed = hitPointsEffects.some(effect => effect.includes("calm")) ||
                         hitPointsEffects.some(effect => effect.includes("frenzy")) || 
                         hitPointsEffects.some(effect => effect.includes("boost")) ||
                         hitPointsEffects.some(effect => effect.includes("setback")) ||
                         hitPointsEffects.some(effect => effect.includes("restore")) ||
                         hitPointsEffects.some(effect => effect.includes("damage")) ;


        console.log("hasIncrease: " + hasIncrease);
        console.log("hasDecrease: " + hasDecrease);
        console.log("isFailed: " + isFailed);
        
        if(isFailed){

            return new FailedPotion("Tonic of Downfall", 0);
        }

        if (hasIncrease) {
            return new Essence("Essence of " + modifierName + "Heal", potionValue);
        }
        if (hasDecrease) {
            return new Stench("Stench of " + modifierName + "Damage", potionValue);
        }

        return new FailedPotion("Tonic of Downfall", 0);
    }

    private createPotionFromEqualEffects(effects: string[], ingredients: Ingredient[]): Potion {
        const effect = effects[0]; // Asumimos que todos son iguales en este caso
        const isRestore = effect.includes("boost") || 
                          effect.includes("calm");

        console.log("EFFECT IS: " + effect);
        
        
        const isDamage = effect.includes("setback") || 
                         effect.includes("frenzy");

        const isFailed = effect.includes("increase") || 
                         effect.includes("decrease") || 
                         effect.includes("restore") || 
                         effect.includes("damage");

        console.log("HA CREADO UNA POCION DE IGUALES EFECTOS");
        console.log("isFailed: " + isFailed);
        console.log("isRestore: " + isRestore);
        console.log("isDamage: " + isDamage);
        
        if(isFailed)
        {
            console.log("ES FAILED ");
            
            return new FailedPotion("Tonic of Downfall", 0);
        }


        let potionName = "";
        let potionEffect = "Boost";

        if(isDamage){
            potionEffect = "Setback"
        }

        const attributes = ["constitution", "charisma", "insanity", "dexterity", "strength", "intelligence", "calm", "frenzy", "boost", "setback"];
        const matchingAttribute = attributes.find(attr => effect.includes(attr));

        console.log("Matching Attribute in create from equal: " + matchingAttribute);
        console.log(matchingAttribute);
        

        // Capitalize the first letter
        const capsMatchingAttribute = matchingAttribute ? matchingAttribute.charAt(0).toUpperCase() + matchingAttribute.slice(1) : '';

        let affectedAttribute = capsMatchingAttribute;

        // if (!matchingAttribute) {
        //     return new FailedPotion("Tonic of Downfall", 0);
        // }

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

        console.log("MATCHING ATTR");
        console.log(matchingAttribute);

        switch(matchingAttribute) {
            case 'calm':
                affectedAttribute = 'Insanity';
                modifierValueAverageRoundedToLowerMultipleOfFive = -modifierValueAverageRoundedToLowerMultipleOfFive;
                break;
            case 'frenzy':
                affectedAttribute = 'Insanity';
                modifierValueAverageRoundedToLowerMultipleOfFive = -modifierValueAverageRoundedToLowerMultipleOfFive;
                break;
        }

        console.log("MODIFIER VALUE BEFORE RETURNING POTION");
        console.log(modifierValueAverageRoundedToLowerMultipleOfFive);

        

        if(isRestore){
            console.log("SE VA A CREAR ELIXIR PORQUE ISRESTORE ES TRUE");
            
            return new Elixir(potionName, potionEffect, modifierValueAverageRoundedToLowerMultipleOfFive, duration, affectedAttribute!)
        }
        else if(isDamage)
        {
           return new Venom(potionName, potionEffect, modifierValueAverageRoundedToLowerMultipleOfFive, duration, affectedAttribute!);
        }
        else
        {
            console.log("SE HA CREADO UN FAILED POTION AL FINAL DE LA FUNCION");
            
            return new FailedPotion("Tonic of Downfall", 0);
        }

    }

    private roundDownToMultipleOfFive(num: number): number {
        return num - (num % 5);
    }

    private determineSingleEffectModifier(effect: string): string {
        if (effect.includes("least")) {
            return "Least";
        } else if (effect.includes("lesser")) {
            return "Lesser";
        } else if (effect.includes("greater")) {
            return "Greater";
        }
        return ""; // Sin prefijo
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
        const attributes = ["points", "constitution", "charisma", "insanity", "dexterity", "strength", "intelligence", "calm", "frenzy", "boost", "setback", "cleanse"];
    
        // Check if any attribute is present in the effects array of every ingredient
        return attributes.some(attribute =>
            ingredients.every(ingredient =>
                ingredient.effects.some(effect => effect.includes(attribute))
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
            if (effect.includes("least")) return 1;    // Effect "least"
            if (effect.includes("lesser")) return 1;
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
    
    private createPurificationPotion(){
        return new PurificationPotion("Potion of Purification", 0);
    }
}
