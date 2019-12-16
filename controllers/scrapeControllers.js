const axios = require('axios')
const cheerio = require('cheerio')
// const db = require('mongojs')('timesdb')
// may need additional statements for heroku deployment

// module.exports statement for axios requests***
// until then,
// node controllers/scrapeControllers.js works***
    // cheerio axios requests
    axios.get('https://www.nytimes.com/')
    .then(({ data: html }) => {
        const $ = cheerio.load(html)
        // what i want to grab from site .each
        $('h2.esl82me0').each((i, elem) => {
            console.log($(elem).text())
            // insert into db
        })
    })
    .catch(e => console.error(e))