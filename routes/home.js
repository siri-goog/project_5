const express = require('express')
const router = express.Router();

//--Get movie details
router.get('/', (req, res) => {
    res.render('pages/home', {
    })
})

module.exports = router