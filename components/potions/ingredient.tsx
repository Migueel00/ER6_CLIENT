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

    constructor(_id: string, name: string, description: string,  value: number, effects: string[], image: string, type: string) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.effects = effects;
        this.value = value;
        this.image = image;
        this.type = type;
        this.key = "";
    }

    static from({ _id, name, description, value, effects, image, type }: {_id: string, name: string; description:string; value: number; effects: string[]; image: string; type: string }) {
        return new Ingredient(
            _id,
            name,
            description,
            value,
            effects,
            image,
            type
        );
    }
}
