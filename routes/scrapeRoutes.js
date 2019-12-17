const { Scrapes } = require('../controllers')

module.exports = app => {

  app.get('/scrapes', (req, res) => {
    Scrapes.grabArticles()
    res.sendStatus(200)
  })

}