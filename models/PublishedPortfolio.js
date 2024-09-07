const mongoose = require('mongoose');

const publishedPortfolioSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    templateId: { type: mongoose.Schema.Types.ObjectId, required: true },
    customizations: {
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        name: { type: String, default: '' },
        designation: { type: String, default: '' },
        skills: { type: String, default: '' },
        experience: { type: String, default: '' }
    },
    url: { type: String, required: true }
});

module.exports = mongoose.model('PublishedPortfolio', publishedPortfolioSchema);
