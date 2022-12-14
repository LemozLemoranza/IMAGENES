const { Router } = require("express");
const { check } = require("express-validator");
const { Register, Login, Close } = require("../controllers/users");
const {
  NameNotExist,
  EmailNotExist,
  UserExist,
} = require("../helpers/db-validators");
const { validarJWT2 } = require("../helpers/jwt-validator");
const router = Router();

router.get("/register", validarJWT2, (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  [
    validarJWT2,
    check("name", "El nombre es obligatorio").trim().not().isEmpty(),
    check("name").custom(NameNotExist),
    check("email", "El correo es invalido").isEmail(),
    check("email").custom(EmailNotExist),
    check(
      "password",
      "La contraseña debe contener mas de 5 carácteres"
    ).isLength(6),
    check("password", "La contraseña es obligatoria")
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (value !== req.body.confirm_password) {
          throw new Error("Las contraseñas no coinciden");
        } else {
          return value;
        }
      }),
  ],
  Register
);

router.get("/login", validarJWT2, (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  [
    check("email", "El correo es invalido").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("password").custom(UserExist),
  ],
  Login
);

router.post("/close", Close);

module.exports = router;
