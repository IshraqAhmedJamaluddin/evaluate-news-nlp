var path = require('path')
const express = require('express')

var cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('dist'))

const dotenv = require('dotenv');
dotenv.config();

console.log(__dirname)

const api_key= process.env.API_KEY

app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/key', function (req, res) {
    res.json({api_key: api_key})
})

// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
})
