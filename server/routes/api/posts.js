const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// @route   GET api/posts
// @desc    Get All Posts
// @access  Public
router.get('/', async (req, res) => {
    const posts = await loadPosts();
    res.send(await posts.find().sort({createdAt: -1}).toArray());
});

// @route   POST api/posts
// @desc    Create A Post
// @access  Public
router.post('/', async (req, res) => {
    const posts = await loadPosts();
    await createPost(posts, req.body.text, req.body.name);
    res.json({success: true});
});

// @route   DELETE api/posts/:id
// @desc    Delete A Post
// @access  Public
router.delete('/:id', async (req, res) => {
    const posts = await loadPosts();
    await deletePost(posts, req.params.id);
    res.json({success: true});
});


// @desc      Helper-function to Get All Posts from the db  
async function loadPosts() {
    const client = await mongodb.MongoClient
    .connect('mongodb://deuse:deuse56288265@ds151453.mlab.com:51453/thinkboard',
     {useNewUrlParser: true});

     return client.db('thinkboard').collection('posts');
}

// @desc      Helper-function to Create A Post 
async function createPost(posts, text, name) {
    await posts.insertOne({
        text: text,
        createdAt: new Date(),
        name: name

    });
}

// @desc      Helper-function to Delete A Post from the db  
async function deletePost(posts, id) {
    await posts.deleteOne({_id: new mongodb.ObjectID(id)});
}

module.exports = router; 
