const express = require('express')
const path = require('path')
const proxy = require('express-http-proxy')

const app = express()

app.use(express.static('./dist/'))

const proxyOptions = {
  forwardPath: function(req, res) {
    return req.originalUrl
  }
}

app.use('/api', proxy('http://localhost:3000/', proxyOptions))
app.use('/upload', proxy('http://localhost:3000/', proxyOptions))
app.use('/uploads', proxy('http://localhost:3000/', proxyOptions))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/de/index.html'))
})

app.listen(process.env.PORT || 8080)
