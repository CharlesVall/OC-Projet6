const bookRepository = require('../repositories/BookRepository')
const BookValidator = require('../utils/bookValidator')
const fs = require('fs/promises');
const path = require('path');


class BookService {
  async getBookList() {
    const bookList = await bookRepository.findAllBook()
    return bookList
  }

  async getBookById(bookId) {
    const bookData = await bookRepository.findBookById(bookId)
    return bookData
  }

  async getBestRatedBooks() {
    const bookList = await bookRepository.findAllBook()
    const sortedList = bookList.sort((a, b) => b.averageRating - a.averageRating);
    return sortedList.slice(0,3)
  }

  async publishBook(bookData, imageFile) {
    
    bookData.year = Number.parseInt(bookData.year)
    BookValidator.validateBookData(bookData);

    const imageUrl = `http://localhost:4000/uploads/images/${imageFile.filename}`
    bookData.imageUrl = imageUrl

    const createdBook = await bookRepository.createBook(bookData)
    return createdBook
  }

  async deleteBookById(bookId) {
    const book = await bookRepository.findBookById(bookId);
    if (!book) throw new Error('Livre introuvable');

    await bookRepository.deleteBookById(bookId);

    const file = book.imageUrl && path.join(__dirname, `../../uploads/images/${book.imageUrl.split('/').pop()}`);
    console.log('fichier complet supprimé :', file);

    if (file) await fs.unlink(file);

    return book;
  }
}

module.exports = new BookService();

/*
{"message":"Book created",
"book":{
  "userId":"68dd7035f6e44e7c026ad59e",
    "title":"dsfgdfg","author":"fgdsfg",
    "year":"ssdfgsdfg",
    "genre":"sdfgsdg",
    "ratings":[{"userId":"68dd7035f6e44e7c026ad59e","grade":3}],
    "averageRating":3},
  "image":"abajour-tahina.png"}
*/
/*async function deleteBookById(bookId) {
  const book = await bookRepository.getBookById(bookId);
  if (!book) throw new Error('Livre introuvable');

  await bookRepository.deleteBookById(bookId);
  if (book.imageUrl)
    await fs.unlink(path.join(__dirname, '../../uploads/images', book.imageUrl.split('/').pop()));

  return book;
}
*/