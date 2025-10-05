const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middlewares/UploadFileMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const bookController = require('../controllers/BookController');

router.get('/', bookController.getBookList);
router.get('/bestrating', bookController.getBestRatedBooks);
router.get('/:id', bookController.getBookById);

router.post('/', authMiddleware, uploadMiddleware.single("image"), bookController.publishBook);
router.put('/:id', authMiddleware, uploadMiddleware.single("image"), bookController.updateBookDataById);
router.delete('/:id', authMiddleware, bookController.deleteBookById);
router.post('/:id/rating', authMiddleware, bookController.postRatingById); // todo


module.exports = router;
/*router.post('/',
  authMiddlewares,
  uploadMiddlewares.single("image"),
  bookController.publishBook
);*/