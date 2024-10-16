interface Modifiers{
    hit_points: number;
    intelligence: number;
    dexterity: number;
    insanity: number;
    charisma: number;
    constitution: number;
    sterngth: number;
}

export default class Curse {
    modifiers: Modifiers;
    _id: string;
    name: string;
    description: string;
    type: string;
    antidote_effects: string[];
    poison_effects: string[];


    constructor( modifiers: Modifiers, _id: string, name: string, description: string, type: string, antidote_effects: string[], poison_effects: string[]) {

        this.modifiers = modifiers;
        this._id = _id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.antidote_effects = antidote_effects;
        this.poison_effects = poison_effects;
    }

    static from({modifiers, _id, name, description, type, antidote_effects, poison_effects} : 
                {modifiers: Modifiers, _id: string, name: string, description: string, type: string, antidote_effects: string[], poison_effects: string[]}) {
        return new Curse(
            modifiers,
            _id,
            name,
            description,
            type,
            antidote_effects,
            poison_effects,
        );
    }

}