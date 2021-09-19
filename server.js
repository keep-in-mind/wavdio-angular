const express = require('express')
const path = require('path')
const proxy = require('express-http-proxy')

const port = process.env.PORT || 8080
const backend = process.env.BACKEND || 'http://localhost:3000/'

const app = express()

app.use(express.static('./dist/'))

const proxyOptions = {
    forwardPath: function (req, res) {
        return req.originalUrl
    }
}

app.use('/api', proxy(backend, proxyOptions))
app.use('/upload', proxy(backend, proxyOptions))
app.use('/uploads', proxy(backend, proxyOptions))

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/de/index.html'))
})

app.listen(port)
