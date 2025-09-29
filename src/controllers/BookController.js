const bookService = require('../services/BookService')

class BookController {
  async getBookList(req, res) {
    try {
      const bookList = await bookService.getUserList()

      res.status(201).json({
        bookList
      })
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  }
}

module.exports = new BookController();