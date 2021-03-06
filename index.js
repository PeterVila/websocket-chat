const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.get('/', (request, response) => {
    response.json({
        info: 'Our app is up and running'
    })
})
app.listen(port, () => {
    console.log(`App running on ${port}.`)
})

app.get("/messages", db.getMessages);
app.post("/messages", db.createMessage);