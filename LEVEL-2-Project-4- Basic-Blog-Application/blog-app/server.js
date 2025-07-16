const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/posts', postRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true })); // for form data
const Post = require('./models/Post');

// Home page – list all posts
app.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render('index', { posts });
});

// Form to create new post
app.get('/new', (req, res) => {
  res.render('new');
});

// Handle form submission
app.post('/new', async (req, res) => {
  const { title, content, author } = req.body;
  await Post.create({ title, content, author });
  res.redirect('/');
});
