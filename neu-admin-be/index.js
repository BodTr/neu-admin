// nếu ko phải môi trg production thì dùng file .env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL, {
   
})

const db = mongoose.connection
db.on('error', error => console.error(`MongoDB ERROR: ${error}`))
db.once('open', () => console.log('Connected to Mongoose'))

app.use(require('./routes/programs'))

app.listen(process.env.PORT || 3000, () => {
    if (process.env.PORT) {
        console.log(`Server up at ${process.env.PORT}`)
    } else {
        console.log('Server up at 3000')
    }
})