import Effect from "./effect.tsx";

export default class Ingredient {
    name: string;
    effects: Effect[];  // Asumo que los efectos son de tipo Effect, no string
    value: number;
    weight: number;

    constructor(name: string, effects: Effect[], value: number, weight: number) {
        this.name = name;
        this.effects = effects;
        this.value = value;
        this.weight = weight;
    }

    static from({ name, effects, value, weight }: { name: string; effects: any[]; value: number; weight: number }) {
        return new Ingredient(
            name,
            effects.map(effect => Effect.from(effect)), // Asumo que Effect.from devuelve instancias de Effect
            value,
            weight
        );
    }

    hasName(name: string) {
        return this.name === name;
    }

    findCommonEffects(otherIngredient: Ingredient) {
        return this.effects.filter(effect => otherIngredient.hasEffect(effect));
    }

    hasEffect(effect: Effect) {
        return this.effects.some(candidate => candidate.name === effect.name);
    }
}
