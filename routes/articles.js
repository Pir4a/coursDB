const express = require('express');
const router = express.Router();
const { createArticle, findAll, getPublishedArticles, getArticleById, updateArticle, deleteArticle, publishArticle } = require('../controllers/articleControllers');    

router.post('/', createArticle);
router.get('/', findAll);
router.get('/publies', getPublishedArticles);
router.get('/:id', getArticleById);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);
router.post('/:id/publier', publishArticle);

module.exports = router;