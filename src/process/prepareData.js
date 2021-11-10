
module.exports = rows => {
    return new Promise((resolver, reject) => {
        try {
            const words= rows
                .filter(filterRows)
                .map(removeCharacters)
                .map(removeTag)
                .reduce(mergeRows)
                .split(' ')
                .map(word=> word.toLowerCase())
                .map(word=> word.replace('"', ''))
            resolver(words)
        } catch (e) {
            reject(e)
        }
    })
}

function filterRows(row){
    const notANumber = !parseInt(row.trim())
    const isntEmpty = !!row.trim()
    const isntIntervall= !row.includes('-->')
    return notANumber && isntEmpty && isntIntervall
}


const removeCharacters = row => row.replace(/[,!?.-]/g,'')
const removeTag = row => row.replace(/(<[^>]+>)/g,'').trim()
const mergeRows = (fullText, row) => `${fullText} ${row}`