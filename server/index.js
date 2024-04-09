require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models.js')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json()) //для парсинга json формата
app.use('/api', router)

//Обработка ошибок всегда в конце, последний Middleware
app.use(errorHandler)

app.get('/',(req, res)=>{
    res.status(200).json({message: 'Congrats! It is working!'}) //в случае, если все работает, это пойдет на экран
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Listening on ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()