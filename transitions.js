const robot = require('robotjs')
const { GlobalKeyboardListener } = require('node-global-key-listener')

const listener = new GlobalKeyboardListener()

const timecodes = ``
//Выпавшие видео
const missedVideos = []
//Координаты переходов
const transitionsCoord = [
	{ x: 1600, y: 512},
	{ x: 1650, y: 512},
	{ x: 1690, y: 512}
]
//Таймкоды без переносов
const timecodesArr = timecodes.split(/\r?\n/)
timecodesArr.shift()
//Таймкоды без выпавших видео
const filtered = timecodesArr.filter((item, index) => {
	return missedVideos.indexOf(index+1) === -1
})
///////////////SETTINGS///////////////////
function getRandomIndex() {
	return Math.floor(Math.random() * transitionsCoord.length)
}
//////////////FUNC///////////////////////

const typeText = text => {
	robot.typeString(text)
	robot.keyTap('enter')
}

let exit = 0

listener.addListener(function (e, down) {
	if (e.name == 'K') exit = 1

})



async function processItems() {
	for (const item of filtered) {
		if (exit) break
		//Случайный переход
		const randomIndex = getRandomIndex()
		const randomTransition = transitionsCoord[randomIndex]
	//Сброс выделения
		robot.moveMouse(110, 645)
		robot.setMouseDelay(500)
		robot.mouseClick()
		robot.setMouseDelay(500)
	//Ввод в таймлайн
		robot.moveMouse(60, 600)
		robot.setMouseDelay(500)
		robot.mouseClick()
		robot.setMouseDelay(500)
		typeText(item)
	//Переход
		robot.moveMouse(randomTransition.x, randomTransition.y)
		robot.setMouseDelay(500)
		robot.mouseClick()
		

		await new Promise(resolve => setTimeout(resolve, 1))
		if (exit) break
	}
}

processItems().then(() => {
	console.log('Loop completed.')
})
 
