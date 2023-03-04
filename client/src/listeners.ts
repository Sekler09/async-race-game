import {
  createNewCar,
  deleteCar,
  deleteWinner,
  startEngine,
  stopEngine,
  switchEngineToDrive,
  updateCar,
} from './api'
import {state, updateCars, updateWinners} from './store'
import {CarType} from './types'
import {generateCars, resetAnimation, startAnimation} from './utils'
import {renderView} from './view'

export const handleDeleteCar = async (id: number): Promise<void> => {
  await deleteCar(id)
  await deleteWinner(id)
  await updateWinners()
  if (
    state.carsCount % 7 === 1 &&
    state.carsCount !== 1 &&
    state.garagePage === Math.ceil(state.carsCount / 7)
  ) {
    await handlePrevPage()
  } else {
    await updateCars()
    document.body.innerHTML = ''
    await renderView()
  }
}

export const handleSelectCar = (id: number): void => {
  const colorInput = <HTMLInputElement>(
    document.querySelector('.selectedCar-color-input')
  )
  const nameInput = <HTMLInputElement>(
    document.querySelector('.selectedCar-name-input')
  )
  const updateBtn = <HTMLInputElement>(
    document.querySelector('.selectedCar-update-button')
  )
  nameInput.value = (<CarType>state.cars.find((car) => car.id === id)).name
  colorInput.value = (<CarType>state.cars.find((car) => car.id === id)).color
  nameInput.disabled = false
  colorInput.disabled = false
  updateBtn.disabled = false
  state.selectedCarId = id
}

export const handleToGarage = async (): Promise<void> => {
  state.view = 'garage'
  const garage = <HTMLElement>document.getElementById('garage')
  garage.style.display = 'block'
  const winners = <HTMLElement>document.getElementById('winners')
  winners.style.display = 'none'
}

export const handleToWinners = (): void => {
  state.view = 'winners'
  const garage = <HTMLElement>document.getElementById('garage')
  garage.style.display = 'none'
  const winners = <HTMLElement>document.getElementById('winners')
  winners.style.display = 'block'
}

export const handleCreateNewCar = async (
  name: HTMLInputElement,
  color: HTMLInputElement
): Promise<void> => {
  await createNewCar({name: name.value, color: color.value})
  await updateCars()
  document.body.innerHTML = ''
  await renderView()
}

export const handleUpdateCar = async (
  name: HTMLInputElement,
  color: HTMLInputElement
): Promise<void> => {
  await updateCar({
    name: name.value,
    color: color.value,
    id: <number>state.selectedCarId,
  })
  state.selectedCarId = null
  await updateCars()
  await updateWinners()
  document.body.innerHTML = ''
  await renderView()
}

export const handleGenerateNewCars = async (): Promise<void> => {
  await Promise.all(
    generateCars().map(async (newCar) => await createNewCar(newCar))
  )
  await updateCars()
  document.body.innerHTML = ''
  await renderView()
}

export const handleNextPage = async (): Promise<void> => {
  if (state.view === 'garage') {
    if (state.carsCount - state.garagePage * 7 > 0) {
      state.garagePage += 1
      await updateCars()
      document.body.innerHTML = ''
      await renderView()
    }
  } else {
    console.log('nothing')
  }
}

export const handlePrevPage = async (): Promise<void> => {
  if (state.view === 'garage') {
    if (state.garagePage > 1) {
      state.garagePage -= 1
      await updateCars()
      document.body.innerHTML = ''
      await renderView()
    }
  } else {
    console.log('hui')
  }
}

export const handleStartEngine = async (id: number): Promise<void> => {
  const car = <HTMLElement>document.querySelector(`.road-car-${id}`)
  const flag = <HTMLElement>document.querySelector(`.road-flag-${id}`)
  const startBtn = <HTMLButtonElement>document.querySelector(`.start-engine-${id}`)
  const stopBtn = <HTMLButtonElement>document.querySelector(`.stop-engine-${id}`)
  startBtn.disabled = true
  stopBtn.disabled = false
  const race = await startEngine(id)
  const time = race.distance / race.velocity
  const distance =
    flag.getBoundingClientRect().x + flag.getBoundingClientRect().width
  startAnimation(car, distance, time, id)
  if (await switchEngineToDrive(id)){
    setTimeout(()=> stopEngine(id), time)
  } else {
    stopEngine(id)
    handleBrakeEngine(id)
  }
}

export const handleRace = async (): Promise<void> => {
  await Promise.allSettled(
    state.cars.map(async (car) => await handleStartEngine(car.id))
  )
  console.log(state.animation)
}

export const handleBrakeEngine = (id: number): void => {
  window.cancelAnimationFrame(state.animation[id])
  const boom = <HTMLElement>document.querySelector(`.boom-${id}`)
  boom.style.display = 'flex'
}

export const handleStop = (id: number): void => {
  window.cancelAnimationFrame(state.animation[id])
  const car = <HTMLElement>document.querySelector(`.road-car-${id}`)
  const startBtn = <HTMLButtonElement>document.querySelector(`.start-engine-${id}`)
  const stopBtn = <HTMLButtonElement>document.querySelector(`.stop-engine-${id}`)
  const boom = <HTMLElement>document.querySelector(`.boom-${id}`)
  boom.style.display = 'none'
  startBtn.disabled = false
  stopBtn.disabled = true
  resetAnimation(car)
  delete state.animation[id]
}

export const handleReset = (): void => {
  Object.values(state.animation).map(animationId => window.cancelAnimationFrame(animationId))
  Object.keys(state.animation).map(id => {
    const car = <HTMLElement>document.querySelector(`.road-car-${id}`)
    const startBtn = <HTMLButtonElement>document.querySelector(`.start-engine-${id}`)
    const stopBtn = <HTMLButtonElement>document.querySelector(`.stop-engine-${id}`)
    const boom = <HTMLElement>document.querySelector(`.boom-${id}`)
    boom.style.display = 'none'
    startBtn.disabled = false
    stopBtn.disabled = true
    resetAnimation(car)
    delete state.animation[+id]
  })
}
