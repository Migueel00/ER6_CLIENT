import { Effect } from "./potionsInterface";

export default class Potion {

    name: string;
    value: number;
    time: number;

    constructor(name: string, value: number, time: number){
        this.name = name;
        this.value = value;
        this.time = time;
    }

    static with(effect: Effect, value: number) {
        const type = effect.type === 'beneficial' ? "Potion" : "Poison";
        const potion_name = `${type} of ${effect.name}`;
        const time = 10;
        return new Potion(potion_name, value, time);
    }

    static failed() {
        return new FailedPotion();
    }

    static sanity() {
        return new PotionOfSanity();
    }
}

class PotionOfSanity extends Potion {
    constructor() {
        super("Potion of Sanity", 1000, 50);
    }
}

class FailedPotion extends Potion {
    constructor() {
        super("Failed potion",  0, 0)
    }
}