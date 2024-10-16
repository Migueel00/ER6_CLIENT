import { positive_effect_tokens } from "./constants";

export default class Effect {
    name: string;
    type: string; // Define los tipos específicos para 'type'

    constructor(name: string, type: 'beneficial' | 'harmful') {
        this.name = name;
        this.type = type;
    }

    static from(name: string): Effect {
        return new Effect(
            name,
            positive_effect_tokens.some((token: string) => name.includes(token)) ? 'beneficial' : 'harmful'
        );
    }
}
