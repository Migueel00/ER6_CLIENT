import Effect from "./effect.tsx";

export default class Ingredient {

    _id: string;
    name: string;
    description: string;
    value: number;
    effects: string[];
    image: string;
    type: string;
    key: any;
    qty: number

    constructor(_id: string, name: string, description: string, value: number, effects: string[], image: string, type: string, qty: number) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.effects = effects;
        this.value = value;
        this.image = image;
        this.type = type;
        this.key = "";
        this.qty = qty
    }

    static from({ _id, name, description, value, effects, image, type, qty }: { _id: string, name: string; description: string; value: number; effects: string[]; image: string; type: string, qty: number }) {
        return new Ingredient(
            _id,
            name,
            description,
            value,
            effects,
            image,
            type,
            qty
        );
    }
}
