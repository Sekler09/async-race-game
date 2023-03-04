import { fetchCars, fetchWinners } from './api'
import { IState } from './types'

const { cars, count: carsCount } = await fetchCars(1)
const { winners, count: winnersCount } = await fetchWinners(1)
export const state: IState = {
  view: 'garage',
  cars,
  carsCount,
  selectedCarId: null,
  garagePage: 1,
  winners,
  winnersPage : 1,
  winnersCount,
  animation: {},
  newCarName: '',
  newCarColor: '#000000'
}

export const updateCars = async (): Promise<void> => {
  const res = await fetchCars(state.garagePage)
  state.cars = res.cars
  state.carsCount = res.count
}

export const updateWinners = async (): Promise<void> => {
  const res = await fetchWinners(state.winnersPage)
  state.winners = res.winners
  state.winnersCount = res.count
}
