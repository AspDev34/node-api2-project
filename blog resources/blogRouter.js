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

// 	Returns the post object with the specified id.
router.get('/:id', (req, res) => {
    !req.params.id ? res.status(404).json({message: 'no such post exists'}): blog.findById(req.params.id)

    .then(blg => {
        console.log('blg', blg)

        res.status(201).json(blg);
    })
    .catch(err => {
        res.status(500).json({message: 'unable to retrieve data'})
    })
});

// Returns an array of all the comment objects associated with the post with the specified id.
router.get('/:id/comments', (req, res) => {
    blog.findPostComments(req.params.id)

    .then(blg => {
        console.log('blg', blg)
        if (blg) {
            res.status(200).json.blg
        }
    })
    .catch(err => {
        res.status(500).json({message: 'could not retrieve data'})
    })
})