const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// כתובת ה-URI של MongoDB

const uri = "mongodb://username:password@localhost:27017/urlshortener";

const client = new MongoClient(uri);

// פונקציה לחיבור ל-MongoDB
async function connectToMongo() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

// פונקציה להוספת קישור למסד הנתונים
async function addLinkToDatabase(originalUrl) {
    const database = client.db('urlshortener');
    const collection = database.collection('shortlinks');

    const doc = { url: originalUrl };
    await collection.insertOne(doc);
}

// חיבור ל-MongoDB
connectToMongo();

// נתיב להוספת קישורים
app.post('/api/links', async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).send('originalUrl is required');
        }

        // הוספת הקישור למסד הנתונים
        await addLinkToDatabase(originalUrl);

        res.status(201).send('Link added successfully');
    } catch (error) {
        console.error(error); // הדפסת השגיאה ללוג
        res.status(500).send('Internal Server Error');
    }
});

const linkRoutes = require('./routes/links'); // ודא שהנתיב נכון

// חיבור ה-routes
app.use('/api', linkRoutes); 

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
