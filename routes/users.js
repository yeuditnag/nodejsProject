const express = require('express');
const router = express.Router();
const User = require('../models/User'); 


// הוספת משתמש חדש
router.post('/', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// שליפת משתמשים
router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

module.exports = router;
