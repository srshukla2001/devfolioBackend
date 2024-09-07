const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const templateRoutes = require('./routes/templates');
const portfolioRoutes = require('./routes/portfolios');
const publishRoutes = require('./routes/publish'); // Import the publish routes
const userRoutes = require('./routes/auth');
const dbConfig = require('./config/db');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(dbConfig.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/publish', publishRoutes); // Add the publish routes
app.use('/portfolios', express.static(path.join(__dirname, 'public', 'portfolios')));
app.use('/api/user', userRoutes); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
