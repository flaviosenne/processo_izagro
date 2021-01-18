const routes = require('express').Router()

const User = require('./controllers/User')
routes.get('/', (req, res) => {
    res.send('oi')
})

routes.post('/email/send', User.storage)

module.exports = routes