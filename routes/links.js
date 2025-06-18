import express from 'express';
import Link from '../models/link.js'; // ודא שהנתיב נכון

const router = express.Router();

// ה-endpoint שלך
router.get('/redirect/:id', async (req, res) => {
    const linkId = req.params.id;
    const ipAddress = req.ip; // קבלת כתובת ה-IP של המשתמש
    const targetParamName = req.query[link.targetParamName]; // קבלת ערך הפרמטר

    try {
        const link = await Link.findById(linkId);
        
        if (!link) {
            return res.status(404).send('Link not found');
        }

        // עדכון הקליקים
        link.clicks.push({ ipAddress, targetParamValue: targetParamName }); // הוספת ערך הפרמטר
        await link.save();

        // הפניה לקישור המקורי
        return res.redirect(link.originalUrl);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// הוספת endpoints נוספים כאן...

export default router; // ייצוא ה-router
