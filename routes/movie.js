const express = require('express')
const router = express.Router();

//--Get movie details
router.get('/:id', (req, res) => {
    const id = req.params.id
    res.render('pages/movie', {
        movie_id: id
    })
})

module.exports = router