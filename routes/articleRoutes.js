// initialize with models
const { Article } = require('../models')

// module.exports with routes pushing to index
module.exports = app => {

    // GET saved or unsaved articles 
    app.get('/articles/:isSaved', (req, res) => {
        Article.find({ isSaved: req.params.isSaved === 'true' })
            .then(articles => res.json(articles))
            .catch(e => console.log(e))
    })

    // POST one article
    app.post('/articles', (req, res) => {
        Article.create(req.body)
            .then(() => res.sendStatus(200))
            .catch(e => console.log(e))
    })

    // PUT one article
    app.put('/articles/:id', (req, res) => {
        Article.udpateOne({ _id: req.params.id }, req.body)
            .then(() => res.sendStatus(200))
            .catch(e => console.log(e))
    })

    // DELETE saved or unsaved articles
    app.delete('/articles', (req, res) => {
        Article.deleteMany({ isSaved: req.body.isSaved })
            .then(() => res.sendStatus(200))
            .catch(e => console.log(e))
    })

    // DELETE one article
    app.delete('/articles/:id', (req, res) => {
        Article.deleteOne({ _id: req.params.id })
            .then(() => res.sendStatus(200))
            .catchh(e => console.log(e))
    })

}