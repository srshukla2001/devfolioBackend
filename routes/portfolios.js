const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Portfolio = require('../models/Portfolio');

// Save customizations
router.post('/', async (req, res) => {
    const { userId, templateId, customizations, url } = req.body;

    if (!userId || !templateId || !customizations) {
        return res.status(400).send('Missing required fields');
    }

    try {
        // Convert userId and templateId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const templateObjectId = new mongoose.Types.ObjectId(templateId);

        const newPortfolio = new Portfolio({
            userId: userObjectId,
            templateId: templateObjectId,
            customizations,
            url // Store the published URL if provided
        });
        await newPortfolio.save();
        res.status(201).send('Portfolio saved');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:slug', async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ slug: req.params.slug });
        console.log(portfolio);
        if (!portfolio) {
            return res.status(404).send('Portfolio not found');
        }
        res.send(portfolio);
    } catch (err) {
        res.status(500).send('Server error', err.message);
    }
});


module.exports = router;
