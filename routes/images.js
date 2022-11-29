

const { Router } = require('express')
const { Upload, Delete } = require('../controllers/images')
const router = Router()


router.get('/add', (req,res)=>{
    res.render('image_form')
})

router.post('/add', Upload)

router.get('/delete/:photo_id', Delete)

module.exports = router
