const bookRepository = require('../repositories/BookRepository')
const ImageFileManager = require('../utils/ImageFileManager')
const BookValidator = require('../utils/BookValidator')
const bookDataUpdate = require('../utils/boodDataUpdate')
const calculateAverage = require('../utils/calculateAverage')
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

    bookData.imageUrl = ImageFileManager.createImageUrl(imageFile)

    const createdBook = await bookRepository.createBook(bookData)
    return createdBook
  }
  
  async updateBookDataById(bookId, updateData, imageFile) {
    const book = await bookRepository.findBookById(bookId);
    if (!book) throw new Error('Livre introuvable');

    bookDataUpdate(book, updateData)
    BookValidator.validateUpdateData(book)
    
    if (imageFile) {
      updateData.imageUrl = ImageFileManager.createImageUrl(imageFile)
      const deletedFile = await ImageFileManager.deleteImageByUrl(book.imageUrl)
      console.log('fichier complet supprimé :', deletedFile);
    }
    
    const updatedBook = await bookRepository.updateBookById(bookId, updateData);

    console.log('Updated book :', updatedBook)

    return updatedBook;
  }

  async deleteBookById(bookId) {
    const book = await bookRepository.findBookById(bookId);
    if (!book) throw new Error('Livre introuvable');

    await bookRepository.deleteBookById(bookId);

    const deletedFile = await ImageFileManager.deleteImageByUrl(book.imageUrl)
    console.log('fichier complet supprimé :', deletedFile);

    return book;
  }

  async postRatingById(bookId, userId, rating) {
    const book = await bookRepository.findBookById(bookId);
    if (!book) throw new Error('Livre introuvable');

    const grade = Number.parseInt(rating);
    if (Number.isNaN(grade)) throw new Error('La note doit être un nombre');

    if (book.ratings.some(rating => rating.userId.toString() === userId.toString())) {
      throw new Error('Cet utilisateur a déjà noté ce livre');
    }

    const newRating = { userId, grade };

    const updatedRatings = [...book.ratings, newRating];
    const newAverageRating = calculateAverage(updatedRatings.map(rating => rating.grade));

    const updateData = {
      ratings: updatedRatings,
      averageRating: newAverageRating,
    };

    const updatedBook = await bookRepository.updateBookById(bookId, updateData);

    console.log(`
      Rating added by ${userId} for "${book.title}" 
      => averageRating : ${newAverageRating.toFixed(2)}
    `);

    return updatedBook;
  }

}

module.exports = new BookService();