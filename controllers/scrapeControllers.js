const axios = require('axios')
const cheerio = require('cheerio')
// const db = require('mongojs')('timesdb')
// may need additional statements for heroku deployment

// module.exports statement for axios requests***
// until then,
// node controllers/scrapeControllers.js works***
module.exports = {

    async scrapeArticles() {
        const response = new Promise((resolve, reject) => {
            axios.get('https://www.nytimes.com/')
                .then(({ data: html }) => {
                    const $ = cheerio.load(html)
                    // what i want to grab from site .each
                    // $('h2.esl82me0').each((i, elem) => {
                    //     console.log($(elem).text())
                    //     // insert into db
                    // })

                    $('a').each((i, elem) => {
                        const href = $(elem).attr('href')
                        const category = href.split('/').filter((str, i, arr) => i === arr.length-2)[0]
                        const unique_name = 
                            href.split('/')
                                .filter((str, i, arr) => i === arr.length-1)[0]
                                .slice(0, -5)
                        const url = `https://www.nytimes.com${$(elem).attr('href')}`
                        const title = $(elem).children('div.esl82me1').children('h2.esl82me0').text()
                        const summary = $(elem).children('p.e1n8kpyg0').text()
                        // Make sure the article has a title and summary
                        if (title && summary) {
                            console.log(`
                            -----------------------------------------------------------
                            ${title}
                            -----------------------------------------------------------
                            ${summary}
                            -----------------------------------------------------------
                            ${url}
                            -----------------------------------------------------------
                            ${category}
                            -----------------------------------------------------------
                            ${unique_name}
                            -----------------------------------------------------------
                            -----------------------------------------------------------
                            `)
                        }
                    })
                    resolve('hello')
                })
                .catch(e => reject(e))
        })

        return response
    }

}
    // cheerio axios requests

