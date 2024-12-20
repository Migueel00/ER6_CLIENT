

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
    ingredientsUnmodified:  Ingredient[] | null,
    setIngredientsUnmodified: any
    cleanse_ingredients: Ingredient[] | null,
    parchment: boolean,
    setParchment: (state: boolean) => void,
    tower_ingredients: boolean,
    setTowerIngredientsState: (state: boolean) => void,
}

export interface Player {
  _id:          string,
  socketId:     string,
  email:        string,
  nickname:     string,
  isInsideLab:  boolean,
  isInsideTower: boolean,
  avatar:       string,
  id:           string,
  role:         string,
  location:     string
}

export interface Ingredient {
  _id: string,
  name: string,
  description: string,
  value: number,
  effects: string[],
  type: string,
  key: string, 
  image: string
}