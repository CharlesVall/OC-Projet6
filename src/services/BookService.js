const bookRepository = require('../repositories/BookRepository')

class BookService {
  async getAllBook() {
    const bookList = await bookRepository.findAllBook()
    return bookList
  }
}

module.exports = new BookService();