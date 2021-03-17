const express = require('express')
const router = express.Router();

//--Get movie details
router.get('/', (req, res) => {
    res.render('pages/home', {
        user_id: req.session.user_id,
        username: req.session.username
    })
})

module.exports = router