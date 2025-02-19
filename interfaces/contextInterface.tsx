import { Dispatch, SetStateAction } from 'react';
import Ingredient from '../components/potions/ingredient';
import Artifact from './ArtifactsInterface';
import { Player } from './Player/Player';
export interface ContextInterface {
  userRole: string,
  userEmail: string,
  profileAttributes: any,
  socketID: string,
  player: Player,
  players: Player[],
  setPlayers: any,
  setIsLoggedIn: any,
  socket: any,
  location: string,
  setLocation: any,
  ingredients: Ingredient[] | null,
  newIngredients: Ingredient[] | undefined,
  setIngredients: any,
  ingredientsUnmodified: Ingredient[] | null,
  setIngredientsUnmodified: any
  cleanse_ingredients: Ingredient[] | null,
  parchment: boolean,
  setParchment: (state: boolean) => void,
  tower_ingredients: boolean,
  setTowerIngredientsState: (state: boolean) => void,
  setPlayer: any,
  isValidating: boolean,
  setIsValidating: (state: boolean) => void,
  artifacts: Artifact[],
  setArtifacts: Dispatch<SetStateAction<Artifact[]>>
  areArtifactsValidated: boolean;
  setAreArtifactsValidated: Dispatch<SetStateAction<boolean>>;
}

