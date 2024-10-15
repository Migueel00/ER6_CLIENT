import Ingredient from "./ingredient.js";

export default class Ingredients {

    ingredients: Ingredient[];

    constructor(ingredients: any){
        this.ingredients = ingredients;
    }

    static load(data: any) {
        return new Ingredients(data.ingredients.map(Ingredient.from))
    }

    find(name: string)
    {
        const ingredient = this.ingredients.find(element => element.hasName(name));
        if(ingredient === undefined)
        {
            throw new Error (`Uknknown ingredient ${name}`);
        }

        return ingredient;
    }
}