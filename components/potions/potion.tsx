export default class Potion {
    name: string;
    modifier_value: number;
    duration: number;

    constructor(name: string, modifier_value: number, duration: number) {
        this.name = name;
        this.modifier_value = modifier_value;
        this.duration = duration;
    }

    static failed(): Potion {
        return new FailedPotion("Failed Potion", 0, 0);
    }
}

// Poción de Antídoto
export class Antidote extends Potion {
    constructor() {
        super("Antidote", 0, 1);
    }
}

// Poción de Veneno
export class Poison extends Potion {
    constructor() {
        super("Poison", 0, 1);
    }
}

// Poción Elixir
export class Elixir extends Potion {
    constructor(name: string, modifier_value: number, duration: number) {
        super(name, modifier_value, duration);
    }
}

// Poción Veneno
export class Venom extends Potion {
    constructor(name: string, modifier_value: number, duration: number) {
        super(name, modifier_value, duration);
    }
}

// Poción Esencia
export class Essence extends Potion {
    constructor() {
        super("Essence", 0, 1);
    }
}

// Poción Stench
export class Stench extends Potion {
    constructor() {
        super("Stench", 0, 1);
    }
}

// Poción fallida
export class FailedPotion extends Potion {
    constructor(name: string, modifier_value: number, duration: number) {
        super(name, modifier_value, duration);
    }
}
