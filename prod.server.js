const express = require('express')

const config = require('./config/index')

const PORT = process.env.PORT || config.build.port

const app = express()

const router = express.Router()

router.get('/', (req, res, next) => {
    req.url = '/index.html'
    next()
})

app.use(router)

const dataJson = require('./data.json')
const seller = dataJson.seller
const goods = dataJson.goods
const ratings = dataJson.ratings

router.get('/seller', (req, res) => {
  res.send({
    errno: 0,
    data: seller
  })
})

router.get('/goods', (req, res) => {
  res.send({
    errno: 0,
    data: goods
  })
})

router.get('/rating', (req, res) => {
  res.send({
    errno: 0,
    data: ratings
  })
})

app.use('/api', router)

app.use(express.static('./dist'))

app.listen(PORT)