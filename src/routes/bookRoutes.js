const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middlewares/UploadFileMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const bookController = require('../controllers/BookController');

router.get('/', bookController.getBookList);
router.get('/bestrating', bookController.getBestRatedBooks);
router.get('/:id', bookController.getBookById);

router.post('/', authMiddleware, uploadMiddleware.single("image"), bookController.publishBook);
router.delete('/:id', bookController.deleteBookById);
router.post('/:id/rating', bookController.postRatingById);


module.exports = router;
/*router.post('/',
  authMiddlewares,
  uploadMiddlewares.single("image"),
  bookController.publishBook
);*/