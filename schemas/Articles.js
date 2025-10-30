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
}, { timestamps: true, toJSON: { transform: (doc, ret) => {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
} } });

articleSchema.methods.publier = function() {
  this.publie = true;
  return this.save();
};
articleSchema.methods.despublier = function() {
  this.publie = false;
  return this.save();
};
articleSchema.methods.incrementVues = function() {
  this.vues++;
  return this.save();
};

// static methods
articleSchema.statics.findAll = async function() {
  return this.find().sort({ createdAt: -1 });
};
articleSchema.statics.findByCategorie = async function(categorie) {
  return this.find({ categorie }).sort({ createdAt: -1 });
};
articleSchema.statics.findPublie = async function() {
  return this.find({ publie: true }).sort({ createdAt: -1 });
};
articleSchema.statics.findArticleById = async function(id) {
  return this.findById(id);
};
articleSchema.statics.updateArticleById = async function(id, data) {
  return this.findByIdAndUpdate(id, data, { new: true });
};
articleSchema.statics.deleteArticleById = async function(id) {
  return this.findByIdAndDelete(id);
};



// virtuals
articleSchema.virtual('resume').get(function() {
    if (this.contenu.length > 100) return this.contenu; 

  return this.contenu.substring(0, 100) + '...';
});
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;