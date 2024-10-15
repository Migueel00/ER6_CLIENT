export default class Character{
    constructor(name, characterClass, health, magick, stamina, potions)
    {
        this.fullName = name + " the " + characterClass;
        this.health = health;
        this.magick = magick;
        this.stamina = stamina;
        this.potions = potions;
    }

    static from(playerData, potions){
        return new Character(playerData.name, playerData.class, playerData.health, playerData.magick, playerData.stamina, potions);
    }

    drinkEmAll()
    {
        let josephWon = false;

        for(let i = 0; i < this.potions.length; i++)
        {
            let josephLost = this.checkIfDrinkingOver();
            
            if(!josephLost)
            {
                const potionName = this.potions[i].name;
                let potionValue = this.potions[i].value;
                let infoText = "gains";
    
                if(potionName.startsWith("Poison")){
                    potionValue = -potionValue;
                    infoText = "loses";
                }
    
                switch(true){
                    case potionName.includes("Health"):
                        this.changeHealth(potionValue);
                        this.printDrinkingMessageAndStats(potionName, infoText, potionValue, "health");
                        break;
    
                    case potionName.includes("Magicka"):
                        this.changeMagick(potionValue);
                        this.printDrinkingMessageAndStats(potionName, infoText, potionValue, "magick");
                        break;
    
                    case potionName.includes("Stamina"):
                        this.printDrinkingMessageAndStats(potionName, infoText, potionValue, "stamina");
                        this.changeStamina(potionValue);
                        break;
    
                    case potionName.includes("Sanity"):
                        console.log(this.fullName + " has found the Potion of Sanity. His mind is healed. Well done!");
                        i = this.potions.length;
                        josephWon = true;
                        break;
    
                    case potionName.includes("Failed"):
                        console.log(potionName + ". " + this.fullName + " cannot drink.");
                        break;

                    default:
                        this.drinkAnotherPotion(potionName);
                        break;
                }
            }
            else
            {
                i = this.potions.length;
            }

            if(!josephWon)
            {
                this.showCharacterStats();
                josephLost = this.checkIfDrinkingOver();
            }

        }
    }

    changeHealth(value)
    {
        this.health += value;
    }

    changeMagick(value)
    {
        this.magick += value;
    }

    changeStamina(value)
    {
        this.stamina += value;
    }

    checkIfDrinkingOver()
    {
        if(this.health <= 0){
            console.log(this.fullName + " has died.");
            return true;
        }

        if(this.magick <= 0){
            console.log(this.fullName + "'s magick was completely drained. X.G Erudite's Chaotic spell has finished Joseph off.");
            return true;
        }

        if(this.stamina <= 0){
            console.log(this.fullName + " has lost all his stamina. He feels completely exhausted.");
            return true;
        }

        return false;
    }

    drinkAnotherPotion(potionName)
    {
        console.log(this.fullName + " drinks " + potionName + " and gains 1 point of health, magick & stamina.");
    }

    printDrinkingMessageAndStats(potionName, infoText, value, changedAttribute)
    {
        console.log(this.fullName + " drinks " + potionName + " and " + infoText + " " + value + " points of " + changedAttribute + ".");
    }

    showCharacterStats()
    {
        console.log(`Health:        ${this.health}`);
        console.log(`Magick:        ${this.magick}`);
        console.log(`Stamina:       ${this.stamina}`);
        console.log(`--------------------------------`);
    }
}