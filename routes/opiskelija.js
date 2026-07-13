const express = require('express');
const router = express.Router();
const db = require('../config/db');

// READ (Hae kaikki opiskelijat) - GET /api/opiskelija
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM opiskelija');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Opiskelijoiden haku epäonnistui', details: error.message });
  }
});

// CREATE (Lisää uusi opiskelija) - POST /api/opiskelija
router.post('/', async (req, res) => {
  const { Etunimi, Sukunimi, Osoite, Luokatunnus } = req.body;
  
  if (!Etunimi || !Sukunimi || !Osoite || !Luokatunnus) {
    return res.status(400).json({ error: 'Kaikki kentät ovat pakollisia' });
  }

  try {
    const query = 'INSERT INTO opiskelija (Etunimi, Sukunimi, Osoite, Luokatunnus) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(query, [Etunimi, Sukunimi, Osoite, Luokatunnus]);
    
    res.status(201).json({ 
      message: 'Opiskelija lisätty onnistuneesti', 
      id_opiskelija: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ error: 'Opiskelijan lisääminen epäonnistui', details: error.message });
  }
});

// UPDATE (Päivitä opiskelijan tiedot) - PUT /api/opiskelija/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { Etunimi, Sukunimi, Osoite, Luokatunnus } = req.body;

  try {
    const query = 'UPDATE opiskelija SET Etunimi = ?, Sukunimi = ?, Osoite = ?, Luokatunnus = ? WHERE id_opiskelija = ?';
    const [result] = await db.query(query, [Etunimi, Sukunimi, Osoite, Luokatunnus, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Opiskelijaa ei löytynyt' });
    }

    res.json({ message: 'Opiskelijan tiedot päivitetty' });
  } catch (error) {
    res.status(500).json({ error: 'Päivitys epäonnistui', details: error.message });
  }
});

// DELETE (Poista opiskelija) - DELETE /api/opiskelija/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM opiskelija WHERE id_opiskelija = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Opiskelijaa ei löytynyt' });
    }

    res.json({ message: 'Opiskelija poistettu onnistuneesti' });
  } catch (error) {
    res.status(500).json({ error: 'Poisto epäonnistui', details: error.message });
  }
});

module.exports = router;