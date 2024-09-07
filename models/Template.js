const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true }
});

module.exports = mongoose.model('Template', TemplateSchema);
