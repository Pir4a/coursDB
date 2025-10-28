const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
    minlength: [3, 'Le titre doit contenir au moins 3 caractères'],
    maxlength: [200, 'Le titre doit contenir au plus 100 caractères'],
  },
  contenu: {
    type: String,
    required: [true, 'Le contenu est requis'],
    trim: true,
    minlength: [10, 'Le contenu doit contenir au moins 10 caractères'],
  },
  auteur: {
    type: String,
    required: [true, 'L\'auteur est requis'],
    trim: true,
    maxlength: [100, 'L\'auteur doit contenir au plus 100 caractères'],
  },
  publie: {
    type: Boolean,
    default: false,
  },
  categorie: {
    type: String,
    enum: {
        values: ['politique', 'economie', 'sport', 'culture', 'technologie'],
        message: 'La catégorie doit être soit politique, économie, sport, culture ou technologie',
    },
  },
  vues: {
    type: Number,
    default: 0,
  },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;