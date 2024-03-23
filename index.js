const express = require('express')
const cors = require('cors')
const uuid = require(uuid)

const app = express()
const port = 5001

app.use(cors())
app.use(express.json())

app.get('/', async(req, res) => {
    res.send('Hello, world!')
})

app.get('/user', (req, res) => {
    // Mocking in a user object that would typically be
    // retrieved from the DB
    res.json({
        id: uuid.v4(),
        userSettings: {
            dark: true
        }
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})