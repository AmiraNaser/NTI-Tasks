const post   = require('../controllers/post.controller');
const router = require('express').Router();
router.post('/add', post.add);
router.get('/all', post.allPosts);
router.get('/single/:id', post.singlePost);
router.patch('/update/:id', post.updatePost);
router.delete('/delete/:id', post.deletePost);

module.exports = router;