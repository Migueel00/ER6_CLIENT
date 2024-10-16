export default class Potion {
    name: string;
    modifier_value: number;

    constructor(name: string, modifier_value: number) {
        this.name = name;
        this.modifier_value = modifier_value;
    }

    static failed(): Potion {
        return new FailedPotion("Failed Potion", 0);
    }
}

// Poción de Antídoto
export class Antidote extends Potion {
    constructor() {
        super("Antidote", 0);
    }
}

// Poción de Veneno
export class Poison extends Potion {
    constructor() {
        super("Poison", 0);
    }
}

// Poción Elixir
export class Elixir extends Potion {

    potionEffect: string;
    duration: number;

    constructor(name: string, potionEffect: string, modifier_value: number, duration: number) {

        super(name, modifier_value);

        this.potionEffect = potionEffect;
        this.duration = duration;

    }
}

// Poción Veneno
export class Venom extends Potion {
    potionEffect: string;
    duration: number;

    constructor(name: string, potionEffect: string, modifier_value: number, duration: number) {

        super(name, modifier_value);

        this.potionEffect = potionEffect;
        this.duration = duration;

    }
}

// Poción Esencia
export class Essence extends Potion {
    constructor(name: string, modifier_value: number) {
        super(name, modifier_value);
    }
}

// Poción Stench
export class Stench extends Potion {
    constructor(name: string, modifier_value: number) {
        super(name, modifier_value);
    }
}

// Poción fallida
export class FailedPotion extends Potion {
    constructor(name: string, modifier_value: number) {
        super(name, modifier_value);
    }
}
