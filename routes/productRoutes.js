/**
* Routing untuk Product CRUD Operations
* @module routes/productRoutes
*/

const express = require('express');
const router = express.Router();
const connection = require('../config/database');

/**
* READ - Menampilkan semua produk
* @route GET /
*/
router.get('/', (req, res) => {
const query = 'SELECT * FROM products ORDER BY created_at DESC';

connection.query(query, (err, results) => {
if (err) {
console.error('Database error:', err);
return res.status(500).send('Server error');
}
res.render('index', {
title: 'Daftar Produk',
products: results,
success: req.query.success
});
});
});

/**
* CREATE - Form tambah produk baru
* @route GET /add
*/
router.get('/add', (req, res) => {
res.render('add-product', {
title: 'Tambah Produk Baru'
});
});

/**
* CREATE - Proses penyimpanan produk baru
* @route POST /add
*/
router.post('/add', (req, res) => {
const { name, price, description } = req.body;

// Validasi input
if (!name || !price) {
return res.status(400).send('Nama dan harga harus diisi');
}

const query = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
const values = [name, parseFloat(price), description];

connection.query(query, values, (err, result) => {
if (err) {
console.error('Insert error:', err);
return res.status(500).send('Gagal menyimpan produk');
}
res.redirect('/?success=Produk berhasil ditambahkan');
});
});

/**
* UPDATE - Form edit produk
* @route GET /edit/:id
*/
router.get('/edit/:id', (req, res) => {
const productId = req.params.id;

// Validasi ID
if (!productId || isNaN(productId)) {
return res.status(400).send('ID produk tidak valid');
}

const query = 'SELECT * FROM products WHERE id = ?';

connection.query(query, [productId], (err, results) => {
if (err) {

console.error('Select error:', err);
return res.status(500).send('Server error');
}

if (results.length === 0) {
return res.status(404).send('Produk tidak ditemukan');
}

res.render('edit-product', {
title: 'Edit Produk',
product: results[0]
});
});
});

/**
* UPDATE - Proses update produk
* @route POST /edit/:id
*/
router.post('/edit/:id', (req, res) => {
const productId = req.params.id;
const { name, price, description } = req.body;

// Validasi input
if (!name || !price) {

return res.status(400).send('Nama dan harga harus diisi');
}

const query = 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?';
const values = [name, parseFloat(price), description, productId];

connection.query(query, values, (err, result) => {
if (err) {
console.error('Update error:', err);
return res.status(500).send('Gagal mengupdate produk');
}

if (result.affectedRows === 0) {
return res.status(404).send('Produk tidak ditemukan');
}

res.redirect('/?success=Produk berhasil diupdate');
});
});

/**
* DELETE - Hapus produk
* @route GET /delete/:id
*/
router.get('/delete/:id', (req, res) => {

const productId = req.params.id;

// Validasi ID
if (!productId || isNaN(productId)) {
return res.status(400).send('ID produk tidak valid');
}

const query = 'DELETE FROM products WHERE id = ?';

connection.query(query, [productId], (err, result) => {
if (err) {
console.error('Delete error:', err);
return res.status(500).send('Gagal menghapus produk');
}

if (result.affectedRows === 0) {
return res.status(404).send('Produk tidak ditemukan');
}

res.redirect('/?success=Produk berhasil dihapus');
});
});

module.exports = router;