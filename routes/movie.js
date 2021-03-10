const express = require('express')
const router = express.Router();

//--Get movie details
router.get('/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    res.render('pages/movie', {
        
    })
})

module.exports = router