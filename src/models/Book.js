const mongoose = require('mongoose');
const { Types } = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  grade: { type: Number, required: true, min: 0, max: 5 }
});

const bookSchema = new mongoose.Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  title: {type: String, required: true},
  author: {type: String, required: true},
  imageUrl: {type: String, required: true},
  year: {type: Number, required: true},
  genre: {type: String, required: true},
  ratings: [ratingSchema],
  averageRating: {type: Number, required: true}
})

module.exports = mongoose.model('Book', bookSchema)