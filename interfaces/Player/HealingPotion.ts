import { PotionModifier } from './PotionModifier';

export interface HealingPotion {
	_id: string,
	name: string,
	description: string,
	image: string,
	type: string,
	value: number,
	modifiers: PotionModifier,
	min_lvl: number
}
