const express = require('express')
const todoController = require('./controllers/todoController.js')

const app = express()

// set up template engine (ejs)
app.set('view engine', 'ejs')

// static files
app.use(express.static('./public'))

// fire controllers
todoController(app)

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.listen(3333, () => {
    console.log('Server is running on port 3333')
})