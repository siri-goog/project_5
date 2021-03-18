const express = require('express')
const db = require('../database')

const router = express.Router();

//--Get movie details
router.get('/', (req, res) => {
    res.render('pages/home', {
        user_id: req.session.user_id,
        username: req.session.username
    })
})

//--Get movie rating
router.get('/rating/:movie_id', (req, res) => {
    db.any('SELECT * FROM ratings WHERE movie_id = $1;', [req.params.movie_id])
    .then((data) => {
        if (data.length > 0) {
            let reviewers = data.length
            let sum = 0

            for (let i = 0; i < data.length; i++) {
                sum += data[i].rating
            }
            let communityRating = sum/reviewers
            if (sum%reviewers !== 0) {
                communityRating = parseFloat(communityRating).toFixed(1)
            }
            
            res.json({
                movie_id: req.params.id, 
                communityRating: communityRating, 
                reviewers: reviewers
            })
        } else {
            res.json({
                movie_id: req.params.id, 
                communityRating: 0, 
                reviewers: 0
            })
        }
    })
    .catch((err) => {
        console.log(err)
        res.render('pages/error', {
        })
    })
})


module.exports = router