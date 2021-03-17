const express = require('express')
const router = express.Router();
const validator = require('validator');
const db = require('../database')
const crypto = require('crypto');

let errMsg = false
let errFirstname = ""
let errLastname = ""
let errEmail = ""
let errPassword = ""
let errConfirmPassword = ""

router.get('/', (req, res) => {
    res.render('pages/register', {
        errFirstname: errFirstname,
        errLastname: errLastname,
        errEmail: errEmail,
        errPassword: errPassword,
        errConfirmPassword: errConfirmPassword
    });
})
router.post('/', (req, res) => {
    try {
        const { firstname, lastname, email, password, confirmPassword } = req.body;

        // Finds the validation errors
        //--Check Firstname
        if (validator.isEmpty(firstname)) {
            errMsg = true
            errFirstname = "Please enter firstname"
        } else {
            errFirstname = ""
        }
        //--Check lastname
        if (validator.isEmpty(lastname)) {
            errMsg = true
            errLastname = "Please enter firstname"
        } else {
            errLastname = ""
        }
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
        } else if (!validator.isStrongPassword(password)) {
            //errMsg = true
            //errPassword = "Please enter password in correct format"
        } else {
            errPassword = ""
        }
        //--Check confirm password
        if (validator.isEmpty(confirmPassword)) {
            errMsg = true
            errConfirmPassword = "Please enter confirm password"
        } else if (password != confirmPassword) {
            errMsg = true
            // Password and Confirm password does not match
            errConfirmPassword = "Password doesn't match"
        } else {
            errConfirmPassword = ""
        }

        // Password and Confirm Password validation
        if (errMsg === false) {
            console.log("Save to DB")
            db.any('SELECT * FROM users;')
            .then((users) => {
                console.log(users)
                //Check existing user account
                const exists = users.some(user => user.email === email.toLowerCase())
                if (!exists) {
                    // This email is not registered yet
                    const pwdEncrypt = crypto.createHash('sha256').update(password).digest('base64');
                        
                    db.query('INSERT INTO users(firstname, lastname, email, password) VALUES ($1, $2, $3, $4);', [firstname, lastname, email, pwdEncrypt])
                    .then (() => {
                        res.redirect('/login')
                    })
                    .catch((err) => {
                        res.render('pages/error', {
                        })
                    })
                } else {
                    //"This email address is already being used"
                }
            })
            .catch((err) => {
                console.log(err)
                res.render('pages/error', {
                })
            })
        } else {
            //Display error message
            res.render('pages/register', {
            });
        }
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router