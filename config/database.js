/**
* Modul Koneksi Database MySQL
* @module config/database
*/

const mysql = require('mysql2');

/**

* Membuat koneksi ke database MySQL
* @type {Connection}
*/
const connection = mysql.createConnection({
host: 'localhost',
user: 'root', // User default XAMPP
password: '', // Password default XAMPP (kosong)
database: 'node_crud', // Nama database yang dibuat
port: 3306 // Port default MySQL
});

/**
* Membuka koneksi ke database
* @throws {Error} Jika koneksi gagal
*/
connection.connect((err) => {
if (err) {
console.error('❌ Error connecting to MySQL:', err.message);
process.exit(1); // Keluar dari proses jika koneksi gagal
return;
}
console.log('✅ Connected to MySQL database successfully!');
});

module.exports = connection;