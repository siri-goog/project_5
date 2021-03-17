const express = require('express')
const router = express.Router();
const db = require('../database')

let rating = ""

//--Get movie details
router.get('/:movie_id', (req, res) => {
    const movie_id = req.params.movie_id
    try {
        //already login
        if(req.session.user_id) {
            //Check user review
            db.any('SELECT * FROM ratings WHERE movie_id = $1 AND user_id = $2 ;', [movie_id, req.session.user_id])
            .then((rating) => {
                if(rating.length === 1) {
                    //Reviewed
                    rating = rating[0].rating
                    res.render('pages/movie', {
                        movie_id: movie_id,
                        user_id: req.session.user_id,
                        username: req.session.username,
                        rating: rating
                    })
                } else {
                    //Not review yet
                    res.render('pages/movie', {
                        movie_id: movie_id,
                        user_id: req.session.user_id,
                        username: req.session.username,
                        rating: rating
                    })
                }
            })
        } else {
            //No login
            res.render('pages/movie', {
                movie_id: movie_id,
                user_id: req.session.user_id,
                username: req.session.username,
                rating: rating
            })
        }
    } catch (error) {
        console.log(error)
    }
})
router.post('/:movie_id', (req, res) => {
    const movie_id = req.params.movie_id
    const user_id = req.session.user_id
    let rating = ""
    if (req.body.rate5 === "on") {
        rating = 5
    } else if (req.body.rate4 === "on") {
        rating = 4
    } else if (req.body.rate3 === "on") {
        rating = 3
    } else if (req.body.rate2 === "on") {
        rating = 2
    } else if (req.body.rate1 === "on") {
        rating = 1
    }

    try {
        db.query('INSERT INTO ratings(movie_id, user_id, rating) VALUES ($1, $2, $3);', [movie_id, user_id, rating])
        .then (() => {
            res.redirect('/movie/' + movie_id)
        })
        .catch((err) => {
            res.render('pages/error', {
            })
        })
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router