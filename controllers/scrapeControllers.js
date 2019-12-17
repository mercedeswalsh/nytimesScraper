const axios = require('axios')
const cheerio = require('cheerio')
// may need additional statements for heroku deployment

// module.exports statement for axios requests
module.exports = {
    
    // cheerio axios requests
    grabArticles() {
        axios.get('https://www.nytimes.com/')
            .then(({ data: html }) => {
                const $ = cheerio.load(html)
                console.log('hello')
                $('div.css-1yjtett').each((i, elem) => {
                    console.log(i)
                    console.log($(elem).text())
                })
                // $('h2.css1w0yruz').each((i, elem) => {
                //     console.log(i)
                //     console.log($(elem).text())
                // })
            })
            .catch(e => console.log(e))
    }

}