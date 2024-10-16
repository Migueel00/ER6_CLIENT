import Cauldron from "./cauldron";
import Ingredient from "./ingredient";
import Potion from "./potion";

export default class PotionBag {
    
    potions: Potion[];

    constructor(potions: Potion[]){
        this.potions = potions;
    }

    // static create(ingredients: Ingredient[], cauldron: Cauldron){

    //     let potions = [];

    //     for(let i = 0; i < ingredients.length; i++)
    //     {     
    //         for(let j = i + 1; j < ingredients.length; j++)
    //         {
    //             potions.push(cauldron.createPotion(ingredients[i], ingredients[j]));
    //         }
    //     }

    //     return new PotionBag(potions);
    // }
}