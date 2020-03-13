const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running!'));

// Define routes
app.use('/auth', require('./routes/api/users'));
app.use('/teletext', require('./routes/api/teletext'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));