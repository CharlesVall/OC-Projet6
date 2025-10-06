const bookService = require('../services/BookService')

class BookController {
  async getBookList(req, res) {
    try {
      const bookList = await bookService.getBookList()

      res.status(200).json(
        bookList
      )
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  }

  async getBookById(req, res) {
    try {
      const book = await bookService.getBookById(req.params.id)

      res.status(200).json(
        book
      )
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  }

  async getBestRatedBooks(req, res) {
    try {
      const bestRatedBookList = await bookService.getBestRatedBooks()

      res.status(200).json(
        bestRatedBookList
      )
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  }

  async publishBook(req, res) {
    try {
      const bookData = JSON.parse(req.body.book);
      const imageFile = req.file;

      console.log("Image info:", imageFile?.originalname);
      
      const createdBook = await bookService.publishBook(bookData, imageFile)

      console.log("Created Book data:", createdBook.title);

      res.status(201).json({
        message: "Book created"
      });
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  }
  
  async updateBookDataById(req, res) {
    try {
      const updateData = req.body.book ? JSON.parse(req.body.book) : req.body;

      const imageFile = req.file;

      const modifiedBook = await bookService.updateBookDataById(req.params.id, updateData, imageFile)

      console.log("Modified book :", modifiedBook)

      res.status(201).json({
        message: "Book have been modified",
      });
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  }

  async deleteBookById(req, res) {
    try {
      const deletedBook = await bookService.deleteBookById(req.params.id)
      console.log("Deleted book :", deletedBook)

      res.status(204).json({
        message: "Book deleted",
      });
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  }

  async postRatingById(req, res) {
    try {
      const { userId, rating } = req.body
      const bookWithNewRating = await bookService.postRatingById(req.params.id, userId, rating)

      res.status(200).json(
        bookWithNewRating
      );
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  }
}

module.exports = new BookController();