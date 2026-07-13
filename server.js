const express = require('express');
const db = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware JSON-datan lukemiseen
app.use(express.json());

// Reittien tuonti
const authRoutes = require('./routes/authRoutes');
const opiskelijaRoutes = require('./routes/opiskelija');

// Reittien käyttöönotto
app.use('/api/auth', authRoutes);
app.use('/api/opiskelija', opiskelijaRoutes);

// Perusreitit testaukseen
app.get('/', (req, res) => {
    res.json({ message: "Opintorekisteri API käynnissä!" });
});

app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM opiskelija');
        res.json({ message: "Tietokantayhteys toimii loistavasti!", data: rows });
    } catch (error) {
        res.status(500).json({ error: "Tietokantayhteys epäonnistui", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Palvelin käynnistetty osoitteessa: http://localhost:${PORT}`);
});