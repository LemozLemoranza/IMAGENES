const { Router } = require('express')
const { GeneralImages, AdminImages } = require('../controllers')
const router = Router()

router.get('/', GeneralImages )
router.get('/gallery', AdminImages)





module.exports = router
