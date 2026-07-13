const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    // Haetaan token pyynnön otsikkotiedoista (Header)
    const authHeader = req.headers['authorization'];
    
    // Yleinen standardi on lähettää token muodossa: "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    // Jos tokenia ei ole ollenkaan mukana pyynnössä
    if (!token) {
        return res.status(401).json({ error: "Pääsy evätty. Token puuttuu." });
    }

    try {
        // Varmistetaan tokenin oikeellisuus .env-tiedoston salaisella avaimella
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Tallennetaan käyttäjän tiedot pyyntöön (hyödyllistä jatkossa)
        next(); // Kaikki kunnossa, siirrytään eteenpäin itse reitille!
    } catch (error) {
        res.status(403).json({ error: "Virheellinen tai vanhentunut token." });
    }
};