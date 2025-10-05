function bookDataUpdate(book, updateData) {
  const updatableFields = ['author', 'title', 'genre', 'userId', 'year'];

  updatableFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      book[field] = updateData[field];
    }
  });
  
  return book;
}

module.exports = bookDataUpdate