const express = require('express')

const app = express()
const port = 5001

app.get('/', async(req, res) => {
    res.send('Hello, world!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})