const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongoDB');
const dotenv = require('dotenv');
const router = require('./routes/form.routes');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
connectDB();

// Basic route for testing
app.get('/healthcheck', (req, res) => {
    res.json('Form Builder server is running and healthy');
});

app.use('/api/forms', router);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
