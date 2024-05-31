const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/users', require('./routes/api/users'));


app.get('/', (req, res) => {
  res.send('Welcome to the Social Media Dashboard API');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
