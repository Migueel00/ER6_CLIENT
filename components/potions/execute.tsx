import { getCharactersData, getIngredientsData } from "./service.tsx";
import Ingredients from "./ingredients.js";
import Cauldron from "./cauldron.js";
import { log } from "console";
import PotionBag from "./PotionBag.js";
import Character from "./character.js";
import Potion from "./potion.js";

const execute = async () => {
    try
    {
        const ingredientsData = await getIngredientsData();
        const playersData = await getCharactersData();

        //DIFFERENT POUCHES, YOU ARE ABLE TO INSERT THE POUCH YOU WANT FROM THESE 4 TO GET DIFFERENT RESULTS
        const yellowPouch =  playersData.players[0].pouch_yellow;
        const redPouch =  playersData.players[0].pouch_red;
        const greenPouch =  playersData.players[0].pouch_green;
        const agedPouch =  playersData.players[0].pouch_aged;
        
        const ingredients = Ingredients.load(ingredientsData);
        
        // const cauldron = new Cauldron(ingredients);

        // //CHANGE POUCH HERE TO CREATE DIFFERENT POTIONS
        // const potionBag = PotionBag.create(yellowPouch, cauldron);

        // const josephCharacter = Character.from(playersData.players[0], potionBag.potions);
        
        // console.log("POTIONS OF THE BAG");
        // console.log(`--------------------------------`);
        // showPotions(potionBag.potions)
        
        // console.log('NEW CONTESTANT APPEARS');
        // console.log(`--------------------------------`);
        // showCharacter(josephCharacter);
        // josephCharacter.drinkEmAll();

    }
    catch
    {
        //ERROR
    }
}



function showPotionsNames(potions: Potion[])
{
    for(let i = 0; i < potions.length; i++)
    {
        console.log("Potion " + (i+1) + ": " + potions[i].name);
        
    }
}

function showPotions(potions: Potion[])
{
    for(let i = 0; i < potions.length; i++)
    {
        showPotion(potions[i])
    }
}

function showPotion(potion: Potion){
    //console.log("CREATED POTION"); 
    console.log(`${potion.name}`);
    console.log(`Value:         ${potion.value}`);
    console.log(`Time:          ${potion.time}`);
    console.log(`--------------------------------`);
}

execute();