const { Router } = require("express");
const { check } = require("express-validator");
const { Upload, Delete } = require("../controllers/images");
const { validarJWT } = require("../helpers/jwt-validator");
const router = Router();

router.get("/add", validarJWT, (req, res) => {
  res.render("image_form");
});

router.post(
  "/add",
  [
    validarJWT,
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("description")
      .not()
      .isEmpty()
      .withMessage("La descripción es obligatoria")
      // Here you check that file input is required
      .custom((value, { req }) => {
        if (!req.file) {
          throw new Error("Por favor, subir una imagen");
        }

        if (req.file) {
          const cut = req.file.originalname.split(".");
          const extension = cut[cut.length - 1];

          if (
            extension !== "jpg" &&
            extension !== "jpeg" &&
            extension !== "gif" &&
            extension !== "webp" &&
            extension !== "png"
          ) {
            throw new Error(
              "El archivo debe de tener un formato: png, jpg, jpeg o webp"
            );
          } else {
            return true;
          }
        }
      }),
  ],
  Upload
);

router.get("/delete/:photo_id", validarJWT, Delete);

module.exports = router;
