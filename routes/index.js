const { Router } = require("express");
const { GeneralImages, AdminImages } = require("../controllers");
const { validarJWT } = require("../helpers/jwt-validator");
const router = Router();

router.get("/", validarJWT, GeneralImages);
router.get("/gallery", validarJWT, AdminImages);

module.exports = router;
