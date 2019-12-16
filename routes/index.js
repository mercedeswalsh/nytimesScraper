// module.exports to bring in routes
module.exports = app => {
    // require routes (app)
    require('./articleRoutes')(app)
    require('./savedRoutes')(app)
}