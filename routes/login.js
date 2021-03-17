const express = require('express')
const router = express.Router();
const validator = require('validator');
const db = require('../database')
const crypto = require('crypto');

let errEmail = ""
let errPassword = ""
let movie_id = ""

router.get('/', (req, res) => {
    movie_id = ""

    res.render('pages/login', {
        user_id: req.session.user_id,
        username: req.session.username
    })
})
router.get('/:movie_id', (req, res) => {
    movie_id = req.params.movie_id

    res.render('pages/login', {
        user_id: req.session.user_id,
        username: req.session.username
    })
})
router.post('/', (req, res) => {
    try {
        var errMsg = false
        const { email, password } = req.body;
        const pwdEncrypt = crypto.createHash('sha256').update(password).digest('base64');

        // Finds the validation errors
        //--Check email
        if (validator.isEmpty(email)) {
            errMsg = true
            errEmail = "Please enter email"
        } else if (!validator.isEmail(email)) {
            errMsg = true
            errEmail = "Please enter email in correct format"
        } else {
            errEmail = ""
        }
        //--Check password
        if (validator.isEmpty(password)) {
            errMsg = true
            errPassword = "Please enter password"
        } else {
            errPassword = ""
        }

        // Password and Confirm Password validation
        if (errMsg === false) {
            db.any('SELECT * FROM users WHERE email = $1 AND password = $2', [email, pwdEncrypt])
            .then((user) => {
                if (user.length === 1) {
                    req.session.user_id = user[0].user_id
                    req.session.username = user[0].firstname
                    if (movie_id === "") {
                        res.redirect('/home')
                    } else {
                        res.redirect('/movie/' + movie_id)
                    }
                } else {
                    //Incorrect username or password
                    return res.redirect('/login')
                }
            })
            .catch((err) => {
                console.log(err)
                res.render('pages/error', {
                })
            })
        } else {
            //Display error message
        }
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router