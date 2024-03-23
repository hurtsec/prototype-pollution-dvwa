const express = require('express')
const cors = require('cors')

const app = express()
const port = 5001

app.use(cors())
app.use(express.json())

app.get('/', async(req, res) => {
    res.send('Hello, world!')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})