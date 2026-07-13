const db = require('../config/db');

const User = {
    // Etsitään käyttäjä nimen perusteella kirjautumista varten
    findByUsername: async (username) => {
        const [rows] = await db.query('SELECT * FROM user WHERE username = ?', [username]);
        return rows[0]; // Palauttaa löytyneen käyttäjän tai undefined
    },

    // Tallennetaan uusi käyttäjä tietokantaan rekisteröitymistä varten
    create: async (username, hashedPassword) => {
        const [result] = await db.query(
            'INSERT INTO user (username, password) VALUES (?, ?)', 
            [username, hashedPassword]
        );
        return result.insertId;
    }
};

module.exports = User;