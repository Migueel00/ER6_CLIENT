export default class PotionBag {
    constructor(potions){
        this.potions = potions;
    }

    static create(ingredients, cauldron){

        let potions = [];

        for(let i = 0; i < ingredients.length; i++)
        {     
            for(let j = i + 1; j < ingredients.length; j++)
            {
                potions.push(cauldron.createPotion(ingredients[i], ingredients[j]));
            }
        }

        return new PotionBag(potions);
    }
}