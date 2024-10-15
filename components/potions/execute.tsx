import { getCharactersData, getIngredientsData } from "./service.tsx";
import Ingredients from "./ingredients.tsx";
import Cauldron from "./cauldron.tsx";
import { log } from "console";
import PotionBag from "./PotionBag.tsx";
import Potion from "./potion.tsx";

const executePotionCreation = async() => {
    try {
        console.log("ENTRA A LA FUNCION");
        
        const fakeIngredients = require('./../../fakedata/fake-ingredients.json');

        console.log(fakeIngredients);
        
        const ingredients = Ingredients.load(fakeIngredients).ingredients;

        //console.log("INGREDIENTS: " + ingredients);
        
        //console.log("FIRST INGREDIENT: " +  ingredients[0].name);
        
        const ingredientsArray = [ingredients[0], ingredients[0], ingredients[0]]

        const cauldron = new Cauldron(ingredients);

        //console.log("CAULDRON INGREDIENTS: " + cauldron.ingredients);
        
        const potion = cauldron.createPotion(ingredientsArray)

        console.log("Created potion");
        console.log(potion);
        


    } catch (error) {
        console.error("Error loading ingredients:", error);
    }
};

function showPotionsNames(potions: Potion[]) {
    for (let i = 0; i < potions.length; i++) {
        console.log("Potion " + (i + 1) + ": " + potions[i].name);
    }
}

// function showPotions(potions: Potion[]) {
//     for (let i = 0; i < potions.length; i++) {
//         showPotion(potions[i]);
//     }
// }

// function showPotion(potion: Potion) {
//     console.log(`${potion.name}`);
//     console.log(`Value:         ${potion.value}`);
//     console.log(`Time:          ${potion.time}`);
//     console.log(`--------------------------------`);
// }

// Export the execute function without calling it
export default executePotionCreation;
