import Curse from '../components/potions/curse';

export interface Player {
  _id: string,
  socketId: string,
  email: string,
  nickname: string,
  isInsideLab: boolean,
  isInsideTower: boolean,
  isInsideHall: boolean,
  isBetrayer: boolean,
  isCaptured: boolean,
  isArrested: boolean,
  avatar: string,
  id: string,
  role: string,
  location: string,
  putridPlague: boolean,
  epicWeakness: boolean,
  medularApocalypse: boolean,
  ethazium: boolean,
  attributes: {
    insanity: number,
    strength: number,
    dexterity: number,
    resistence: number,
    charisma: number,
    intelligence: number,
    constitution: number
  },
  modifiedAttributes: {
    insanity: number,
    strength: number,
    dexterity: number,
    charisma: number,
    intelligence: number,
    constitution: number,
    resistence: number
  }
  curses: Curse[]
}
