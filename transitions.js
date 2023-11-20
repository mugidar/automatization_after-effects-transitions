const robot = require('robotjs')
const { GlobalKeyboardListener } = require('node-global-key-listener')

const listener = new GlobalKeyboardListener()

<<<<<<< HEAD
const timecodes = `
`
//Выпавшие видео
// const missedVideos = []
=======
const timecodes = ``
//Выпавшие видео
const missedVideos = []
>>>>>>> f9b43c6b4c8e8586f00c1e726ba60844f60f93c2
//Координаты переходов
const transitionsCoord = [
	{ x: 1700, y: 512},
	{ x: 1735, y: 512},
	{ x: 1775, y: 512}
]
//Таймкоды без переносов
const timecodesArr = timecodes.split(/\r?\n/)
timecodesArr.shift()
//Таймкоды без выпавших видео
/* const filtered = timecodesArr.filter((item, index) => {
	return missedVideos.indexOf(index+1) === -1
}) */
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
	for (const item of timecodesArr) {
		if (exit) break
		//Случайный переход
		const randomIndex = getRandomIndex()
		const randomTransition = transitionsCoord[randomIndex]
	//Сброс выделения
		robot.moveMouse(110, 700)
		robot.setMouseDelay(500)
		robot.mouseClick()
		robot.setMouseDelay(500)
	//Ввод в таймлайн
		robot.moveMouse(60, 660)
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
 
