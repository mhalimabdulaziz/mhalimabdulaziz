/**
* Entry Point Aplikasi CRUD
* @module server
*/

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Import routing
const productRoutes = require('./routes/productRoutes');

// Middleware
app.use(express.urlencoded({ extended: true })); // Parsing form data
app.use(express.json()); // Parsing JSON
app.use(express.static(path.join(__dirname, 'public'))); // Static files

// Konfigurasi View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routing utama
app.use('/', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).render('error', { error: err.message });
});

// 404 handler
app.use((req, res) => {
res.status(404).render('404');
});

/**
* Menjalankan server
*/
app.listen(PORT, () => {
console.log(`🚀 Server running at http://localhost:${PORT}`);
console.log(`📊 phpMyAdmin: http://localhost/phpmyadmin`);
console.log(`👨‍💻 Development mode: npm run dev`);
});