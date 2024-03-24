const express = require('express')
const cors = require('cors')
const uuid = require('uuid')
const _ = require('lodash')

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

app.post('/settings', (req, res) => {
    const userSettings = req.body.userSettings
    // Mocking in a user object that would typically be
    // retrieved from the DB
    const user = {
        id: uuid.v4(),
        userSettings: {
            dark: true
        }
    }

    const updatedSettings = _.merge(user.userSettings, userSettings)
    res.status(200).send('Your settings wer successfully updated')
})

app.get('/admin', (req, res) => {
    // Mocking in a user object that would typically be
    // retrieved from the DB
    const user = {
        id: uuid.v4(),
        userSettings: {
            dark: true
        }
    }

    if (user.admin) {
        res.status(200).send('FLAG:f10c4$7$3rv3rpr0707yp3p011u73d')
    } else {
        res.sendStatus(403)
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})