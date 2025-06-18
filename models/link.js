import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema({
    insertedAt: {
        type: Date,
        default: Date.now
    },
    ipAddress: {
        type: String,
        required: true
    },
    targetParamValue: {
        type: String, // הוספת שדה זה
        required: false
    }
});

const linkSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    clicks: [clickSchema],
    targetParamName: {
        type: String,
        default: 't' // שם ברירת מחדל
    },
    targetValues: [{
        name: String,
        value: String
    }]
});

const Link = mongoose.model('Link', linkSchema);

export default Link;
