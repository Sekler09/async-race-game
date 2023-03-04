import { state } from './store'
import { CarType } from './types'
import flagImg from './assets/flag.png'
import {
  handleCreateNewCar,
  handleDeleteCar,
  handleGenerateNewCars,
  handleNextPage,
  handlePrevPage,
  handleRace,
  handleReset,
  handleSelectCar,
  handleStartEngine,
  handleStop,
  handleToGarage,
  handleToWinners,
  handleUpdateCar,
} from './listeners'
import {getCar} from './api'

const renderCarImage = (car: CarType): HTMLElement => {
  const imageCont = document.createElement('div')
  imageCont.classList.add(`car-image`, `road-car-${car.id}`)
  imageCont.innerHTML = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="40" height="40" enable-background="new 0 0 300 300" version="1.1" fill=${car.color} viewBox="0 0 268.07 268.07" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><metadata><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata>
  <path d="m103.16 26.4c-17.027 0.29956-32.425 12.051-36.569 29.352-1.6871 7.0429-2.0567 12.786-1.0851 17.685 0.9716 4.8995 3.4479 8.873 6.7334 11.665 6.5709 5.5847 15.462 7.0717 24.466 9.2285 9.0367 2.1647 17.686 4.7526 26.059 2.6928 4.1868-1.0299 8.177-3.4499 11.257-7.3528 1.3557-1.718 2.5449-3.7138 3.6028-5.9812 0.32494-0.69646 0.63741-1.4193 0.93651-2.1715 0.0105-0.0259 0.0216-0.0509 0.0318-0.0769 5e-3 -0.0116 8e-3 -0.0235 0.0133-0.0345 0.19055-0.48298 0.37678-0.97794 0.55713-1.4844 0.11441-0.31918 0.22653-0.64102 0.33693-0.96968 0.23639-0.70812 0.46201-1.4411 0.6805-2.1941 0.0453-0.15532 0.0947-0.30297 0.13929-0.46029 0.24698-0.87627 0.48511-1.7779 0.70968-2.7154 0.14941-0.62378 0.27992-1.2467 0.39663-1.8704 0.0442-0.23512 0.0771-0.47067 0.11673-0.70569 0.0618-0.36809 0.12578-0.73599 0.17642-1.1037 0.0559-0.40389 0.0979-0.80659 0.14062-1.2098 0.0205-0.19533 0.0462-0.39118 0.0636-0.58632 0.0414-0.45686 0.0682-0.91216 0.0929-1.3676 8e-3 -0.14395 0.0179-0.28866 0.0239-0.43245 0.0204-0.47766 0.0281-0.95305 0.0305-1.4286 4.9e-4 -0.11839 4e-3 -0.23726 2e-3 -0.35551-2e-3 -0.51869-0.0164-1.0351-0.0399-1.5507-2e-3 -0.05791-6e-3 -0.11593-8e-3 -0.17378-0.0275-0.55142-0.0668-1.1004-0.11806-1.6475-2e-3 -0.02843-6e-3 -0.05651-8e-3 -0.08494-0.0542-0.56512-0.12117-1.1275-0.2003-1.6873-6.8e-4 -0.0058-6.6e-4 -0.0093-1e-3 -0.01456-2.1419-15.112-13.265-28.152-28.972-31.915-3.2039-0.76746-6.4123-1.1047-9.5655-1.0493zm0.1207 8.7722c2.4348-0.03787 4.9156 0.22648 7.398 0.82112 10.959 2.6251 18.983 10.982 21.659 21.129l-11.627-2.7857c-6.6077-1.5828-13.246 2.4921-14.829 9.0999-1.5828 6.6077 2.4895 13.246 9.0972 14.829l13.861 3.3203c-0.56033 1.0159-1.134 1.9029-1.7165 2.6411-1.9827 2.5127-3.9452 3.6481-6.4574 4.2661-5.0245 1.2359-12.755-0.51342-21.914-2.7074-9.192-2.2019-16.919-4.0592-20.824-7.378-1.9524-1.6594-3.1792-3.5261-3.8044-6.679s-0.48573-7.6767 1.0121-13.93c3.211-13.405 14.997-22.422 28.145-22.626zm103.56 56.314c-0.43005-0.0105-0.86861 0.0221-1.3093 0.10078-3.5252 0.62922-5.8557 3.9748-5.2264 7.5001l2.8016 15.694c-66.435 20.102-83.748 5.3156-114.78-12.098-6.322-3.5479-12.45-3.0788-17.105 2.0826-4.8554 5.3833-3.7126 10.752 2.3904 14.665 35.542 22.786 67.539 31.525 129.52-4.465l3.2672 18.307c0.62923 3.5252 3.9735 5.857 7.4988 5.2278 1.3627-0.24323 2.5437-0.89576 3.4476-1.8041l7.0531 37.556c4.4355-1.6407 9.1504-2.5243 13.881-2.5244 4.8475-1.7e-4 9.6774 0.93027 14.208 2.6504l-35.634-56.106-3.8296-21.458c-0.55056-3.0846-3.1804-5.2557-6.1908-5.3286zm-86.91 62.792c-22.023 0.18642-40.807 11.062-59.115 24.286-6.9114 4.9922-9.6042 9.9752-4.5791 16.863 4.8179 6.6035 13.121 9.8702 19.756 4.5154 31.229-25.205 55.724-49.007 128.61 0.14062-34.117-34.089-61.231-46.003-84.675-45.804zm-90.143 27.829a29.786 29.786 0 0 0-29.787 29.786 29.786 29.786 0 0 0 29.787 29.785 29.786 29.786 0 0 0 29.785-29.785 29.786 29.786 0 0 0-29.785-29.786zm208.5 0a29.786 29.786 0 0 0-29.785 29.786 29.786 29.786 0 0 0 29.785 29.785 29.786 29.786 0 0 0 29.787-29.785 29.786 29.786 0 0 0-29.787-29.786z" color=${car.color} color-rendering="auto" dominant-baseline="auto" enable-background="accumulate" fill-opacity=".99608" fill-rule="evenodd" image-rendering="auto" shape-rendering="auto" solid-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;isolation:auto;mix-blend-mode:normal;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/></svg>
  `
  return imageCont
}

const renderSmallCarImage = (color: string): HTMLElement => {
  const imageCont = document.createElement('div')
  //imageCont.classList.add(`car-image`, `road-car-${car.id}`)
  imageCont.innerHTML = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="20" height="20" enable-background="new 0 0 300 300" version="1.1" fill=${color} viewBox="0 0 268.07 268.07" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><metadata><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata>
  <path d="m103.16 26.4c-17.027 0.29956-32.425 12.051-36.569 29.352-1.6871 7.0429-2.0567 12.786-1.0851 17.685 0.9716 4.8995 3.4479 8.873 6.7334 11.665 6.5709 5.5847 15.462 7.0717 24.466 9.2285 9.0367 2.1647 17.686 4.7526 26.059 2.6928 4.1868-1.0299 8.177-3.4499 11.257-7.3528 1.3557-1.718 2.5449-3.7138 3.6028-5.9812 0.32494-0.69646 0.63741-1.4193 0.93651-2.1715 0.0105-0.0259 0.0216-0.0509 0.0318-0.0769 5e-3 -0.0116 8e-3 -0.0235 0.0133-0.0345 0.19055-0.48298 0.37678-0.97794 0.55713-1.4844 0.11441-0.31918 0.22653-0.64102 0.33693-0.96968 0.23639-0.70812 0.46201-1.4411 0.6805-2.1941 0.0453-0.15532 0.0947-0.30297 0.13929-0.46029 0.24698-0.87627 0.48511-1.7779 0.70968-2.7154 0.14941-0.62378 0.27992-1.2467 0.39663-1.8704 0.0442-0.23512 0.0771-0.47067 0.11673-0.70569 0.0618-0.36809 0.12578-0.73599 0.17642-1.1037 0.0559-0.40389 0.0979-0.80659 0.14062-1.2098 0.0205-0.19533 0.0462-0.39118 0.0636-0.58632 0.0414-0.45686 0.0682-0.91216 0.0929-1.3676 8e-3 -0.14395 0.0179-0.28866 0.0239-0.43245 0.0204-0.47766 0.0281-0.95305 0.0305-1.4286 4.9e-4 -0.11839 4e-3 -0.23726 2e-3 -0.35551-2e-3 -0.51869-0.0164-1.0351-0.0399-1.5507-2e-3 -0.05791-6e-3 -0.11593-8e-3 -0.17378-0.0275-0.55142-0.0668-1.1004-0.11806-1.6475-2e-3 -0.02843-6e-3 -0.05651-8e-3 -0.08494-0.0542-0.56512-0.12117-1.1275-0.2003-1.6873-6.8e-4 -0.0058-6.6e-4 -0.0093-1e-3 -0.01456-2.1419-15.112-13.265-28.152-28.972-31.915-3.2039-0.76746-6.4123-1.1047-9.5655-1.0493zm0.1207 8.7722c2.4348-0.03787 4.9156 0.22648 7.398 0.82112 10.959 2.6251 18.983 10.982 21.659 21.129l-11.627-2.7857c-6.6077-1.5828-13.246 2.4921-14.829 9.0999-1.5828 6.6077 2.4895 13.246 9.0972 14.829l13.861 3.3203c-0.56033 1.0159-1.134 1.9029-1.7165 2.6411-1.9827 2.5127-3.9452 3.6481-6.4574 4.2661-5.0245 1.2359-12.755-0.51342-21.914-2.7074-9.192-2.2019-16.919-4.0592-20.824-7.378-1.9524-1.6594-3.1792-3.5261-3.8044-6.679s-0.48573-7.6767 1.0121-13.93c3.211-13.405 14.997-22.422 28.145-22.626zm103.56 56.314c-0.43005-0.0105-0.86861 0.0221-1.3093 0.10078-3.5252 0.62922-5.8557 3.9748-5.2264 7.5001l2.8016 15.694c-66.435 20.102-83.748 5.3156-114.78-12.098-6.322-3.5479-12.45-3.0788-17.105 2.0826-4.8554 5.3833-3.7126 10.752 2.3904 14.665 35.542 22.786 67.539 31.525 129.52-4.465l3.2672 18.307c0.62923 3.5252 3.9735 5.857 7.4988 5.2278 1.3627-0.24323 2.5437-0.89576 3.4476-1.8041l7.0531 37.556c4.4355-1.6407 9.1504-2.5243 13.881-2.5244 4.8475-1.7e-4 9.6774 0.93027 14.208 2.6504l-35.634-56.106-3.8296-21.458c-0.55056-3.0846-3.1804-5.2557-6.1908-5.3286zm-86.91 62.792c-22.023 0.18642-40.807 11.062-59.115 24.286-6.9114 4.9922-9.6042 9.9752-4.5791 16.863 4.8179 6.6035 13.121 9.8702 19.756 4.5154 31.229-25.205 55.724-49.007 128.61 0.14062-34.117-34.089-61.231-46.003-84.675-45.804zm-90.143 27.829a29.786 29.786 0 0 0-29.787 29.786 29.786 29.786 0 0 0 29.787 29.785 29.786 29.786 0 0 0 29.785-29.785 29.786 29.786 0 0 0-29.785-29.786zm208.5 0a29.786 29.786 0 0 0-29.785 29.786 29.786 29.786 0 0 0 29.785 29.785 29.786 29.786 0 0 0 29.787-29.785 29.786 29.786 0 0 0-29.787-29.786z" color=${color} color-rendering="auto" dominant-baseline="auto" enable-background="accumulate" fill-opacity=".99608" fill-rule="evenodd" image-rendering="auto" shape-rendering="auto" solid-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;isolation:auto;mix-blend-mode:normal;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/></svg>
  `
  return imageCont
}

const renderCarsAmount = (): HTMLElement => {
  const h1 = document.createElement('h1')
  h1.innerText = `Garage(${state.carsCount})`
  return h1
}

const renderCarButtons = (id: number): HTMLButtonElement[] => {
  const deleteBtn = document.createElement('button')
  deleteBtn.addEventListener('click', async () => {
    await handleDeleteCar(id)
  })
  deleteBtn.innerHTML = 'delete'
  const selectBtn = document.createElement('button')
  selectBtn.addEventListener('click', () => {
    handleSelectCar(id)
  })
  selectBtn.innerHTML = 'select'
  return [deleteBtn, selectBtn]
}

const renderCarEngineButtons = (id: number): HTMLButtonElement[] => {
  const startBtn = document.createElement('button')

  startBtn.innerHTML = 'start'
  startBtn.classList.add(`start-engine-${id}`)
  startBtn.addEventListener('click', async () => {
    await handleStartEngine(id)
  })
  const stopBtn = document.createElement('button')
  stopBtn.classList.add(`stop-engine-${id}`)
  stopBtn.addEventListener('click', () => { 
    handleStop(id)
   })
  stopBtn.innerHTML = 'stop'
  stopBtn.disabled = true
  return [startBtn, stopBtn]
}

const renderFlag = (id: number): HTMLImageElement => {
  const flag = document.createElement('img')
  flag.src = flagImg
  flag.classList.add(`road-flag-${id}`, 'flag')
  return flag
}

const renedrCarContainer = (car: CarType): HTMLElement => {
  const cont = document.createElement('div')
  cont.classList.add('car-container')
  const carInfo = document.createElement('div')
  carInfo.classList.add('car-container__info')
  renderCarButtons(car.id).forEach((button) => carInfo.append(button))
  carInfo.append(car.name)
  const carEngineControls = document.createElement('div')
  carEngineControls.classList.add('car-container__engine')
  renderCarEngineButtons(car.id).forEach((button) =>
    carEngineControls.append(button)
  )
  const road = document.createElement('div')
  const boom = document.createElement('div')
  boom.innerHTML = `Boom! ${car.name} is out of road`
  boom.classList.add(`boom-${car.id}`, 'boom')
  road.append(boom)
  road.classList.add('car-container__road')
  road.append(renderCarImage(car), renderFlag(car.id))
  cont.append(carInfo, carEngineControls, road)
  return cont
}

const renderSwitchViewButtons = (): HTMLElement => {
  const btnToGarage = document.createElement('button')
  const nav = document.createElement('nav')
  btnToGarage.addEventListener('click', handleToGarage)
  btnToGarage.innerHTML = 'To Garage'
  const btnToWinners = document.createElement('button')
  btnToWinners.innerHTML = 'To Winners'
  btnToWinners.addEventListener('click', handleToWinners)
  nav.append(btnToGarage, btnToWinners)
  return nav
}

const renderNewCarInputs = (): HTMLElement => {
  const cont = document.createElement('div')
  cont.style.display = 'flex'
  const nameInput = document.createElement('input')
  nameInput.value = state.newCarName
  nameInput.addEventListener('chanрe', ()=> {
    state.newCarName = nameInput.value
  })
  const colorInput = document.createElement('input')
  colorInput.value = state.newCarColor
  colorInput.type = 'color'
  colorInput.addEventListener('change', ()=> {
    state.newCarColor = colorInput.value
  })
  const createBtn = document.createElement('button')
  createBtn.innerText = 'create'
  createBtn.addEventListener('click', async () => {
    state.newCarColor = '#000000'
    state.newCarName = ''
    await handleCreateNewCar(nameInput, colorInput)
  })
  cont.append(nameInput, colorInput, createBtn)
  return cont
}

const renderSelectedCarInputs = (): HTMLElement => {
  const cont = document.createElement('div')
  cont.style.display = 'flex'
  const nameInput = document.createElement('input')
  nameInput.classList.add('selectedCar-name-input')
  nameInput.disabled = true
  const colorInput = document.createElement('input')
  colorInput.classList.add('selectedCar-color-input')
  colorInput.disabled = true
  colorInput.type = 'color'
  const updateBtn = document.createElement('button')
  updateBtn.classList.add('selectedCar-update-button')
  updateBtn.innerText = 'update'
  updateBtn.disabled = true
  updateBtn.addEventListener('click', async () => {
    await handleUpdateCar(nameInput, colorInput)
  })
  cont.append(nameInput, colorInput, updateBtn)
  return cont
}

const renderControlButtons = (): HTMLElement => {
  const cont = document.createElement('div')
  cont.style.display = 'flex'
  const resetBtn = document.createElement('button')
  resetBtn.addEventListener('click', handleReset)
  resetBtn.innerText = 'reset'
  const raceBtn = document.createElement('button')
  raceBtn.addEventListener('click', handleRace)
  raceBtn.innerText = 'race'
  const generateBtn = document.createElement('button')
  generateBtn.addEventListener('click', async () => {
    await handleGenerateNewCars()
  })
  generateBtn.innerText = 'generate 100 cars'
  cont.append(resetBtn, raceBtn, generateBtn)
  return cont
}

const renderSwitchPageButtons = (): HTMLElement => {
  const cont = document.createElement('div')
  const nextBtn = document.createElement('button')
  nextBtn.addEventListener('click', async () => {
    await handleNextPage()
  })
  nextBtn.innerText = 'next'
  const prevBtn = document.createElement('button')
  prevBtn.addEventListener('click', async () => {
    await handlePrevPage()
  })
  prevBtn.innerText = 'prev'
  cont.append(prevBtn, nextBtn)
  return cont
}

const renderGaragePageNumber = (): HTMLElement => {
  const pageNumber = document.createElement('h2')
  pageNumber.innerHTML = `Page #${state.garagePage}`
  return pageNumber
}

const renderGarage = (): HTMLElement => {
  const gar = document.createElement('div')
  gar.setAttribute('id', 'garage')
  gar.append(
    renderNewCarInputs(),
    renderSelectedCarInputs(),
    renderControlButtons()
  )
  gar.append(renderCarsAmount(), renderGaragePageNumber())
  state.cars.forEach((car) => {
    gar.append(renedrCarContainer(car))
  })
  return gar
}

const renderWinnersAmount = (): HTMLElement => {
  const h1 = document.createElement('h1')
  h1.innerText = `Winners(${state.winnersCount})`
  return h1
}

const renderWinnersPageNumber = (): HTMLElement => {
  const pageNumber = document.createElement('h2')
  pageNumber.innerHTML = `Page #${state.winnersPage}`
  return pageNumber
}

const renderWinnersTableHead = (): HTMLElement[] => {
  const number = document.createElement('div')
  number.innerHTML = 'Number'
  const car = document.createElement('div')
  car.innerHTML = 'Car'
  const name = document.createElement('div')
  name.innerHTML = 'Name'
  const wins = document.createElement('div')
  wins.innerHTML = 'Wins'
  const time = document.createElement('div')
  time.innerHTML = 'Best time'
  const res = [number, car, name, wins, time]
  res.forEach(div => div.classList.add('winners-table-head'))
  return res 
}

const renderOneWinner = async (id: number, index: number): Promise<HTMLElement[]> => {
  const number = document.createElement('div')
  number.innerHTML = `${index + 1}`;
  const car = await getCar(id)
  const carImage = renderSmallCarImage(car.color)
  const name = document.createElement('div')
  name.innerHTML = car.name
  const wins = document.createElement('div')
  wins.innerHTML = `${state.winners.find((winner) => winner.id === id)?.wins}`
  const time = document.createElement('div')
  time.innerHTML = `${state.winners.find((winner) => winner.id === id)?.time}`
  return [number, carImage, name, wins, time]
}

const renderWinnersTable = async (): Promise<HTMLElement> => {
  const table = document.createElement('div')
  table.classList.add('winners-table')
  renderWinnersTableHead().forEach((div) => table.append(div))
  state.winners.forEach(async (winner, index) => {
    (await renderOneWinner(winner.id, index)).forEach((div) => table.append(div))
  })
  return table
}

const renderWinners = async (): Promise<HTMLElement> => {
  const winners = document.createElement('div')
  winners.setAttribute('id', 'winners')
  winners.append(renderWinnersAmount())
  winners.append(renderWinnersPageNumber())
  winners.append(await renderWinnersTable())
  winners.style.display = 'none'
  return winners
}

export const renderView = async (): Promise<void> => {
  const root = document.createElement('div')
  root.setAttribute('id', 'root')
  root.append(renderSwitchViewButtons())
  root.append(renderGarage())
  root.append(await renderWinners())
  root.append(renderSwitchPageButtons())
  document.body.appendChild(root)
}

