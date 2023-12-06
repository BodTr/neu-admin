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
app.use(require('./routes/trans_programs'))
app.use(require('./routes/decisions'))
app.use(require('./routes/documents'))
app.use(require('./routes/partners'))
app.use(require('./routes/agencies'))
app.use(require('./routes/goals'))
app.use(require('./routes/plans'))
app.use(require('./routes/edu_quality_processes'))
app.use(require('./routes/curriculums'))
app.use(require('./routes/enrollment'))
app.use(require('./routes/lecturers'))
app.use(require('./routes/units'))
app.use(require('./routes/subjects'))

app.listen(process.env.PORT || 3000, () => {
    if (process.env.PORT) {
        console.log(`Server up at ${process.env.PORT}`)
    } else {
        console.log('Server up at 3000')
    }
})