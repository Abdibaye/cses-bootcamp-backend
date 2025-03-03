const express = require('express')
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
require('dotenv').config();


const app = express()
const port = process.env.PORT || 3000

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello, MongoDB with Express!');
});


// Define a schema for a blog post
const blogPostSchema = new Schema({
    title: String,
    content: String,
});


// Create a model from the schema
const BlogPost = model('BlogPosts', blogPostSchema);

// Example route to create a new blog post
app.post('/posts', async (req, res) => {
    try {
        const newPost = new BlogPost(req.body);
        console.log(newPost);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


app.get('/posts' , async (req, res) => {
    try {
        const userData = await BlogPost.find()
        res.json(userData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})