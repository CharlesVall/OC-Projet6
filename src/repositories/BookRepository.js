const Book = require('../models/Book');

class BookRepository {
  async createBook(bookData) {
    const book = new Book(bookData);
    return await book.save();
  }

  async findBookById(id) {
    return await Book.findById(id);
  }

  async findAllBook() {
    return await Book.find();
  }

  async updateBookById(id, updateData) {
    return await Book.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteBookById(id) {
    return await Book.findByIdAndDelete(id);
  }
}

module.exports = new BookRepository();
