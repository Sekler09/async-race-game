import {createNewCar} from './api'
import { state } from './store'
import {newCar} from './types'

const brands = [
  'Tesla',
  'Mercedes',
  'BMW',
  'Audi',
  'Lamborgini',
  'Rols Roys',
  'Opel',
  'Ford',
  'Mitsubishi',
  'Citroen',
]

const models = [
  'Q7',
  'RS8',
  'AMG 63',
  'Model S',
  'i8',
  'A4',
  'X5',
  'Urus',
  'Mustang',
  'Express',
]

const generateRandomCarName = (): string =>
  brands[Math.floor(Math.random() * 10)] +
  ' ' +
  models[Math.floor(Math.random() * 10)]
const generateRandomCarColor = (): string =>
  '#' +
  Math.floor(Math.random() * 10000000)
    .toString(16)
    .toUpperCase()
    .slice(0, 6)

export const generateCars = (): newCar[] => {
  const res: newCar[] = []
  for (let i = 0; i < 100; i++) {
    res.push({name: generateRandomCarName(), color: generateRandomCarColor()})
  }
  return res
}

export const startAnimation = (car: HTMLElement, distance: number, animationTime: number, id:number):number => {
  const startTime = Date.now()
  let animationId = window.requestAnimationFrame(animate)
  async function animate() {
    const currTime = new Date().getTime()
    const passedDistance = Math.round((currTime - startTime) * (distance / animationTime))

    car.style.transform = `translateX(${Math.min(passedDistance, distance)}px)`
    if (passedDistance < distance) {
      animationId = window.requestAnimationFrame(animate)
      state.animation[id] = animationId
    }
  }
  return animationId
}

export const resetAnimation = (car: HTMLElement):void =>{
  car.style.transform = 'translateX(0px)'
}
