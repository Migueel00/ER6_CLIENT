interface showingAttributes {
    charisma: number,
    strength: number,
    insanity: number,
    intelligence: number,
    dexterity: number,
    constitution: number,
}

export const reduceAllStats = (showingAttributes : showingAttributes) => {
    showingAttributes.charisma -= Math.floor(showingAttributes.charisma * 0.4);
    showingAttributes.strength -= Math.floor(showingAttributes.strength * 0.4);
    showingAttributes.insanity -= Math.floor(showingAttributes.insanity * 0.4);
    showingAttributes.intelligence -= Math.floor(showingAttributes.intelligence * 0.4);
    showingAttributes.dexterity -= Math.floor(showingAttributes.dexterity * 0.4);
    showingAttributes.constitution -= Math.floor(showingAttributes.constitution * 0.4);
}