require('../database/connect');
const express = require('express');

const app     = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const postRoutes = require('../routes/post.route');
app.use("/post",postRoutes);

module.exports = app;