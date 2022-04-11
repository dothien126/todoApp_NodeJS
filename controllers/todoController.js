const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const urlencodedParser = bodyParser.urlencoded({extended: false})

// connect to database
mongoose.connect('mongodb:todoapp')

const todoSchema = new mongoose.Schema({
    item: String,
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = (app) => {
    
    // show todo
    app.get('/todo', (req, res) => {
        // get data from database ann pass it to view
        Todo.find({}, (err, data) => {
            if(err) throw err
            res.render('todo', {todos: data})
        })
    })

    // fill todo
    app.post('/todo', urlencodedParser, (req, res) => {
        const newTodo = Todo(req.body).save((err, data) => {
            if(err) throw err
            req.json(data)
        })
    })

    // remove todo
    app.delete('/todo', (req, res) => {
        //delete the req item form database
        Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove((err, data) => {
            if(err) throw err
            res.json(data)
        })
        data = data.filter((todo) => {
            return todo.item.replace(/ /g, '-') !== req.params.item
        })
    })

}