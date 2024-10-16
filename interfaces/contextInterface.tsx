

export interface ContextInterface {
    userRole: string,
    userEmail: string,
    profileAttributes: any,
    socketID: string,
    player: Player,
    players: Player[],
    setPlayers: any,
    setIsLoggedIn: any,
    socket: any
}

export interface Player {
  _id:          string,
  socketId:     string,
  email:        string,
  nickname:     string,
  isInsideLab:  boolean,
  avatar:       string,
  id:           string,
  role:         string
}
export interface Ingredient {
  id: string,
  name: string,
  description: string,
  value: number,
  effects: string[],
  type: string,
}