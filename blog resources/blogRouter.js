const express = require('express'); //imports express
const router = express.Router(); //creates router from express framework

const blog = require('../data/db')


//	Returns an array of all the post objects contained in the database.
router.get('/', (req, res) => {
    blog.find(req.query) //returns a promise so i need to write a .then and .catch
    .then(blg => {
        res.status(201).json(blg)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: 'error retrieveing data'})
    })
});