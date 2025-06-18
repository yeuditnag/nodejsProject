import express from 'express';
import User from '../models/User.js'; 

const router = express.Router();

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

export default router;
