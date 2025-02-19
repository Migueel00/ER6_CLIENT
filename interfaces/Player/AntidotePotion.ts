import Curse from '../../components/potions/curse';

export interface AntidotePotion {
	_id: string,
	name: string,
	description: string,
	image: string,
	type: string,
	value: number,
	recovery_effect: Curse,
	min_lvl: number,
}
