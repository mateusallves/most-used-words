const { ipcMain } = require('electron')

const pathsToRows = require('./pathsToRows')
const prepareData = require('./prepareData')
const groupedWords = require('./groupedWords')

ipcMain.on('process-subtitles', (event, paths) => {
    pathsToRows(paths)
        .then(rows => prepareData(rows))
        .then(words => groupedWords(words))
        .then(groupWords => {
            event.reply('process-subtitles', groupWords)
        })
})