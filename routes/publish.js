const express = require('express');
const fs = require('fs');
const path = require('path');
const Template = require('../models/Template');
const Portfolio = require('../models/Portfolio');
const router = express.Router();

// Create a new portfolio
router.post('/', async (req, res) => {
    const { userId, templateId, customizations } = req.body;

    try {
        // Fetch the template by ID
        const template = await Template.findById(templateId);
        if (!template) {
            return res.status(404).json({ error: 'Template not found' });
        }

        // Generate the HTML content
        let htmlContent = template.code
            .replace('{{title}}', customizations.title || 'Default Title')
            .replace('{{subtitle}}', customizations.subtitle || 'Default Subtitle')
            .replace('{{name}}', customizations.name || 'Your Name')
            .replace('{{designation}}', customizations.designation || 'Your Designation')
            .replace('{{skills}}', customizations.skills || 'Skill 1, Skill 2')
            .replace('{{experience}}', customizations.experience || 'Experience 1, Experience 2');

        // Define the file name and path
        const fileName = `portfolio_${userId}_${Date.now()}.html`;
        const filePath = path.join(__dirname, '..', 'public', 'portfolios', fileName);

        // Ensure the directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Save the HTML file
        fs.writeFileSync(filePath, htmlContent, 'utf-8');

        // Save the portfolio details in the database
        const newPortfolio = new Portfolio({
            userId,
            templateId,
            url: `/portfolios/${fileName}`,
            customizations,
            publishedAt: new Date()
        });

        let saveData = await newPortfolio.save();

        saveData.url = newPortfolio.url;

        // Respond with the URL of the published portfolio
        res.json({ url: `/portfolios/${fileName}` });

    } catch (err) {
        console.error('Error publishing portfolio:', err);
        res.status(500).json({ error: 'Server error', err });
    }
});

// Retrieve all portfolios
router.get('/all', async (req, res) => {
    try {
        const portfolios = await Portfolio.find();
        res.json(portfolios);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Update a portfolio by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { customizations } = req.body;

    if (!customizations) {
        return res.status(400).send('Customizations are required');
    }

    try {
        // Find the portfolio by ID
        const portfolio = await Portfolio.findById(id);

        if (!portfolio) {
            return res.status(404).send('Portfolio not found');
        }

        // Update the portfolio's customizations
        portfolio.customizations = customizations;
        portfolio.publishedAt = new Date(); // Update the published date if needed

        await portfolio.save();

        res.status(200).send('Portfolio updated successfully');
    } catch (err) {
        console.error('Error updating portfolio:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
