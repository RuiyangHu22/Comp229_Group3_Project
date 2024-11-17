require('dotenv').config()
const cors = require('cors');
const express = require('express')
const app = express()
const mongoose = require('mongoose')    

const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173'  // Adjust the origin to match your frontend's URL
  }));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const booksRouter = require('./routes/books')
app.use('/books', booksRouter)

app.get('/', (req, res) => {
    res.send('Welcome to our library');
});

app.listen(port, () => console.log('Server Started'))
