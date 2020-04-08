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

// Creates a post using the information sent inside the request body.
router.post('/', (req, res) => {
    !req.body.title || !req.body.contents ? res.status(400).json({error: 'please provide title and contents'}): blog.insert(req.body)
    .then(blg => {
        res.status(201).json(blg)
    })
    .catch(err => {
        res.status(500).json({message: 'could not save post'})
    })
});

// Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/:id/comments', (req, res) => {
    const newComment = {
        text: req.body.text,
        post_id: req.params.id
    }
    !req.body.text ? res.status(400).json({message: 'provide text'}):

    blog.insertComment(newComment)
    .then(blg => {
        res.status(201).json(blg)
    })
    .catch(err => ({message: `error ${err}`}))
})

// Removes the post with the sdditional calls to the database in order to satisfy this requireme

module.exports = router; //makes it available for require()
