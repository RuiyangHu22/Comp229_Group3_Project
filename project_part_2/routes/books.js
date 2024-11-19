const express = require('express')
const router = express.Router()
const Book = require('../models/book')



// Getting all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// Getting book by id
router.get('/:id', getBook, (req, res) => {
  res.json(res.book)
})

//Create new product
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    description:req.body.description,
    genre:req.body.genre,
    author: req.body.author,
    isbn:req.body.isbn,
    status:req.body.status,
    category:req.body.category
  })
  try {
    const newBook = await book.save()
    res.status(201).json(newBook)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})



//update book by id
router.put('/:id', getBook, async (req, res) => {
  if (req.body.title != null) {
    res.book.title = req.body.title
  }
  if (req.body.description != null) {
    res.book.description = req.body.description
  }
  if (req.body.genre != null) {
    res.book.genre = req.body.genre
  }
  if (req.body.author != null) {
    res.book.author = req.body.author
  }
  if (req.body.isbn != null) {
    res.book.isbn = req.body.isbn
  }
  if (req.body.status != null) {
    res.book.status = req.body.status
  }
  if (req.body.category != null) {
    res.book.category = req.body.category
  }
  try {
    const updatedBook = await res.book.save()
    res.json(updatedBook)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

//Delete by id
router.delete('/:id', getBook, async (req, res) => {
  try {
    await res.book.remove()
    res.json({ message: 'Deleted Book' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//Delete all
router.delete('/', async (req, res) => {
  try {
    await Book.deleteMany(); 
    res.json({ message: 'All books deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




async function getBook(req, res, next) {
  let book
  try {
    book = await Book.findById(req.params.id)
    if (book == null) {
      return res.status(404).json({ message: 'Cannot find book' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.book = book
  next()
}

module.exports = router