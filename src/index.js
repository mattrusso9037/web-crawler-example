const Crawler = require("js-crawler");
const WikiParser = require("./utils/wikiparser")
let index = 0


new Crawler().configure({ depth: 2 })
    .crawl("https://en.wikibooks.org/wiki/Category:Gluten-free_recipes", function onSuccess(page) {
        const url = page.url
        const content = page.content.toString()

        if (url.includes('https://en.wikibooks.org/wiki/Cookbook:') && !url.includes('Table_of_Contents')) {
            const title = WikiParser.parseTitle(content)
            const info = WikiParser.parseInfo(content)

            const item = {
                title: title,
                info: info,
                url: url
            }

            console.log('\n' + index)
            console.log(item)
            index++
        }

    }, function (response) {
        console.log('Error: ' + response.status)

    }, function onAllFinished(crawledUrls) {
        console.log('All crawling finished');
    });
