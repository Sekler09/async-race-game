export interface CarType {
  name: string
  color: string
  id: number
}

export type animationType = {
  [id : number] : number
}

export interface fetchCarsType {
  cars: CarType[]
  count: number
}

export interface IState {
  view: 'garage' | 'winners'
  cars: CarType[]
  carsCount: number
  selectedCarId: number | null
  garagePage: number
  winnersPage : number
  winnersCount : number
  winners : winnerType[]
  animation : animationType
  newCarName: string
  newCarColor: string
}

export type newCar = {
  name: string
  color: string
}


export type fetchWinnersType = {
  winners : winnerType[],
  count : number
}

export type winnerType = {
  id : number,
  wins : number,
  time : number,
}

export type engineType = {
  velocity: number,
  distance: number,
}