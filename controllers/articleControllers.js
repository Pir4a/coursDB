const Article = require('../schemas/Articles');
const QueryFeatures = require('../api/utils/queryFeatures');
// create
async function createArticle(req, res) {
    try {
        // récupération des données du req body
        const { titre, contenu, auteur, categorie } = req.body;

        const article = new Article({ titre, contenu, auteur, categorie });

        // sauvegarde de l'article
        const articleSauvegarder = await article.save();

        // réponse au client
        res.status(201).json({
            success: true,
            message: 'Article créé avec succès',
            data: articleSauvegarder,
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            // réponse au client en cas d'erreur de validation
            return res.status(400).json({
                success: false,
                message: 'Erreur de validation',
                errors: Object.values(error.errors).map(err => err.message),
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Erreur lors de la création de l\'article',
            error: error.message,
        });
    }
}
async function publishArticle(req, res) {
    try {
        const { id } = req.params;
        const article = await Article.findArticleById(id);
        article.publie = true;
        await article.save();
        res.status(200).json({
            success: true,
            message: 'Article publié avec succès',
            data: article,
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Erreur de validation',
                errors: Object.values(error.errors).map(err => err.message),
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Erreur lors de la publication de l\'article',
            error: error.message,
        });
    }
}
// read

async function findAll(req, res) {
    try {

        const totalCount = await Article.countDocuments();

        const features = new QueryFeatures(Article.find(), req.query).filter().search().sort().limitFields().paginate();

        const articles = await features.query;

        const response = {
            success: true,
            count: articles.length,
            total: totalCount,
            data: articles,
        }

        const paginationInfo = features.getPaginationInfo(totalCount);
        if (paginationInfo) {
            response.pagination = paginationInfo;
        }

        res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des articles',
            error: error.message,
        });
    }
}

async function getPublishedArticles(req, res) {
    try {
        const articles = await Article.findPublie().sort({ createdAt: -1 });
        const features = new QueryFeatures(articles, req.query).filter().search().sort().limitFields().paginate();

        res.status(200).json({
            success: true,
            message: 'Articles publiés récupérés avec succès',
            data: features.query,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des articles publiés',
            error: error.message,
        });
    }
}

async function getArticleById(req, res) {
    try {
        const { id } = req.params;
        const article = await Article.findArticleById(id);
        res.status(200).json({
            success: true,
            message: 'Article récupéré avec succès',
            data: article,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération de l\'article',
            error: error.message,
        });
    }
}

// update
async function updateArticle(req, res) {
    try {
        const { id } = req.params;
        const { titre, contenu, auteur, categorie } = req.body;
        const article = await Article.updateArticleById(id, { titre, contenu, auteur, categorie });
        res.status(200).json({
            success: true,
            message: 'Article mis à jour avec succès',
            data: article,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erreur lors de la mise à jour de l\'article',
            error: error.message,
        });
    }
}
// delete
async function deleteArticle(req, res) {
    try {
        const { id } = req.params;
        await Article.deleteArticleById(id);
        res.status(200).json({
            success: true,
            message: 'Article supprimé avec succès',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erreur lors de la suppression de l\'article',
            error: error.message,
        });
    }
}
module.exports = {
    createArticle,
    findAll,
    getPublishedArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    publishArticle,
};