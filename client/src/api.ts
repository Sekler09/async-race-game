import {CarType, engineType, fetchCarsType, fetchWinnersType, newCar} from './types'

const baseUrl = 'http://127.0.0.1:3000'

const garage = `${baseUrl}/garage`
const winners = `${baseUrl}/winners`
const engine = `${baseUrl}/engine`

export const fetchCars = async (
  page: number,
  limit = 7
): Promise<fetchCarsType> => {
  const res = await fetch(`${garage}?_page=${page}&_limit=${limit}`)
  return {
    cars: await res.json(),
    count: Number(res.headers.get('X-Total-Count')),
  }
}

export const getCar = async (id: number): Promise<CarType> => {
  return await fetch(`${garage}/${id}`).then(r => r.json())
}
export const deleteCar = async (id: number): Promise<void> => {
  await fetch(`${garage}/${id}`, {method: 'DELETE'})
}

export const createNewCar = async (newCar: newCar): Promise<void> => {
  await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(newCar),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const updateCar = async (car: CarType): Promise<void> => {
  await fetch(`${garage}/${car.id}`, {
    method: 'PUT',
    body: JSON.stringify({name: car.name, color: car.color}),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const fetchWinners = async (
  page: number,
  sort: 'id' | 'wins' | 'time' = 'wins',
  order: 'ASC' | 'DESC' = 'ASC'
): Promise<fetchWinnersType> => {
  const res = await fetch(
    `${winners}?_page=${page}&_limit=10&_sort=${sort}&_order=${order}}`
  )
  return {
    winners: await res.json(),
    count: Number(res.headers.get('X-Total-Count')),
  }
}

export const deleteWinner = async (id: number): Promise<void> => {
  await fetch(`${winners}/${id}`, {method : 'DELETE'})
}

export const startEngine = async (id: number): Promise<engineType> => {
  return await fetch(`${engine}?id=${id}&status=started`, {
    method: "PATCH"
  }).then(r => r.json())
}

export const stopEngine = async (id: number): Promise<engineType> => {
  return await fetch(`${engine}?id=${id}&status=stopped`, {
    method: "PATCH"
  }).then(r => r.json())
}

export const switchEngineToDrive = async (id: number): Promise<boolean> => {
  return await fetch(`${engine}?id=${id}&status=drive`, {
    method: "PATCH"
  }).then(r => r.status !== 500)
}