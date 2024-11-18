import { Modifiers } from "./curse";

export default class Potion {
    name: string;


    constructor(name: string) {
        this.name = name;
    }

    static failed(): Potion {
        return new FailedPotion("Failed Potion", 0);
    }
}

// Poción de Antídoto
export class Antidote extends Potion {
    modifiers: Modifiers;
    _id: string;
    name: string;
    description: string;
    type: string;
    antidote_effects: string[];


    constructor( modifiers: Modifiers, _id: string, name: string, description: string, type: string, antidote_effects: string[]) {
        super(name);
        
        this.modifiers = modifiers;
        this._id = _id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.antidote_effects = antidote_effects;
    }
}

// Poción de Veneno
export class Poison extends Potion {

    modifiers: Modifiers;
    _id: string;
    name: string;
    description: string;
    type: string;
    poisonEffects: string[];


    constructor( modifiers: Modifiers, _id: string, name: string, description: string, type: string, poison_effects: string[]) {
        super(name);
        
        this.modifiers = modifiers;
        this._id = _id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.poisonEffects = poison_effects;
    }
}

// Poción Elixir
export class Elixir extends Potion {

    potionEffect: string;
    duration: number;
    modifier_value: number;
    affected_attr: string;

    constructor(name: string, potionEffect: string, modifier_value: number, duration: number, affected_attr: string) {

        super(name);

        this.potionEffect = potionEffect;
        this.duration = duration;
        this.modifier_value = modifier_value;
        this.affected_attr = affected_attr;
    }
}

// Poción Veneno
export class Venom extends Potion {
    potionEffect: string;
    duration: number;
    modifier_value: number;
    affected_attr: string;

    constructor(name: string, potionEffect: string, modifier_value: number, duration: number, affected_attr: string) {

        super(name);

        this.potionEffect = potionEffect;
        this.duration = duration;
        this.modifier_value = modifier_value;
        this.affected_attr = affected_attr;
    }
}

// Poción Esencia
export class Essence extends Potion {

    modifier_value: number;

    constructor(name: string, modifier_value: number) {
        super(name);
        this.modifier_value = modifier_value;
    }
}

// Poción Stench
export class Stench extends Potion {

    modifier_value: number;

    constructor(name: string, modifier_value: number) {
        super(name);
        this.modifier_value = modifier_value;
    }
}

// Poción fallida
export class FailedPotion extends Potion {

    modifier_value: number
    
    constructor(name: string, modifier_value: number) {
        super(name);
        this.modifier_value = modifier_value;
    }
}

// Poción fallida
export class PurificationPotion extends Potion {

    modifier_value: number
    
    constructor(name: string, modifier_value: number) {
        super(name);
        this.modifier_value = modifier_value;
    }
}
