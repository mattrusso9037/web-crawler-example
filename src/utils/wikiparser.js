const cheerio = require('cheerio')

class WikiParser {
    parseTitle(str) {
        let trimmed = str.match(/(?<=class="firstHeading" lang="en".).*?</g)
        let trim2 = trimmed[0].replace('Cookbook:', '')
        let trim3 = trim2.replace('<', '')
        return trim3
    }

    parseInfo(str) {
        const $ = cheerio.load(str)
        const tag = $('tbody').find('a').text()
        const servings = $('tbody').find('td').eq(1).text()
        const time = $('tbody').find('td').eq(2).text()
        const difficulty = $('tbody').find('td').eq(3).find('a').attr('title')
        
        const info = { tag: tag, servings: servings, time: time, difficulty: difficulty }

        return info
    }
}

module.exports = new WikiParser()