const express = require('express');
const router = express.Router();
const Template = require('../models/Template');

// Get all templates
router.get('/', async (req, res) => {
    try {
        const templates = await Template.find();
        res.json(templates);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get template by ID
router.get('/:id', async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);
        if (!template) {
            return res.status(404).send('Template not found');
        }
        res.json(template);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new template
router.post('/', async (req, res) => {
    const { name, code } = req.body;
    try {
        const newTemplate = new Template({ name, code });
        await newTemplate.save();
        res.status(201).send('Template added');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
