const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
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
    published: { type: Boolean, default: false }, // Indicates if the portfolio is published
    url: { type: String, unique: true, sparse: true }, // Unique identifier for the published URL
    publishDate: { type: Date }, // Date when the portfolio was published
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

module.exports = mongoose.model('Portfolio', portfolioSchema);
