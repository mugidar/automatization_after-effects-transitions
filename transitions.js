const robot = require('robotjs')
const { GlobalKeyboardListener } = require('node-global-key-listener')

const listener = new GlobalKeyboardListener()

const timecodes = `
00:00:17,18
00:00:29,12
00:00:46,09
00:01:00,18
00:01:11,06
00:01:21,07
00:01:42,07
00:01:49,29
00:02:02,00
00:02:10,04
00:02:18,12
00:02:36,26
00:03:09,27
00:03:40,01
00:03:50,28
00:04:00,28
00:04:08,00
00:04:20,28
00:04:33,15
00:04:40,02
00:04:50,06
00:04:57,06
00:05:12,23
00:05:33,03
00:05:46,21
00:05:55,09
00:06:05,16
00:06:16,13
00:06:23,25
00:06:29,13
00:06:45,14
00:06:48,16
00:06:58,23
00:07:05,05
00:07:19,12
00:07:28,14
00:07:44,11
00:08:17,15
00:08:32,05
00:08:41,02
00:08:46,11
00:08:59,05
00:09:14,02
00:09:37,12
00:09:51,05
00:10:04,13
00:10:32,21
00:10:42,26
00:10:50,02
00:10:55,15
00:11:02,17
00:11:18,04
00:11:24,17
00:11:38,11
00:11:47,28
00:11:55,05
00:12:09,06
00:12:16,14
00:12:27,02
`
//Выпавшие видео
const missedVideos = [31, 40, 48]
//Координаты переходов
const transitionsCoord = [
	{ x: 1750, y: 450 },
	{ x: 1785, y: 450 },
	{ x: 1825, y: 450 }
]
//Таймкоды без переносов
const timecodesArr = timecodes.split(/\r?\n/)
timecodesArr.shift()
//Таймкоды без выпавших видео
const filtered = timecodesArr.filter((item, index) => {
	return missedVideos.indexOf(index) === -1
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
		robot.moveMouse(110, 645)
		robot.setMouseDelay(200)
		robot.mouseClick()
		robot.setMouseDelay(200)
		//Сброс выделения
		robot.moveMouse(60, 600)
		robot.setMouseDelay(200)
		robot.mouseClick()
		robot.setMouseDelay(200)
		typeText(item)
		//Ввод в таймлайн
		robot.moveMouse(randomTransition.x, randomTransition.y)
		robot.setMouseDelay(200)
		robot.mouseClick()
		//Переход

		await new Promise(resolve => setTimeout(resolve, 1))
		if (exit) break
	}
}

processItems().then(() => {
	console.log('Loop completed.')
})
