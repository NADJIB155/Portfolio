const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB(); 

const app = express();

app.use(express.json());
app.use(cors({
  origin: [
  'http://localhost:5173', 
  'https://portfolio-five-lilac-110d71rqne.vercel.app', // Ton lien Vercel exact
  'https://portfolio-jjoih4fht-hanadjib70-8010s-projects.vercel.app' // Ajoute aussi celui-là pour être sûr
],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));

app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/users', require('./routes/userRoutes')); 
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));