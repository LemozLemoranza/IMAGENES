const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator");
const { generarJWT } = require("../helpers/jwt.generator");
const User = require("../models/User");

const Register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const valores = req.body;
    const validaciones = errors.array();
    res.render("register", { validaciones, valores });
  } else {

    const { name, email } = req.body;

    const nameU = name.toUpperCase()
    const emailU = email.toUpperCase()

    const { password } = req.body;

    const newUser = new User({ name:nameU, email:emailU, password });

    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);

    await newUser.save();

    res.render("register", { nameU });
  }
};

const Login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const valores = req.body;
    const validaciones = errors.array();
    res.render("login", { validaciones, valores });
  } else {
    
    const emailL = req.body.email
    const email = emailL.toUpperCase()
    const user = await User.findOne({ email });

    const token = await generarJWT(user.id);
    const userTK = await user.name

    res.cookie("loginTK", token, {
      httpOnly: true,
    });

    res.cookie("userTK", userTK, {
      httpOnly: true,
    });
    res.redirect("/gallery");
  }
};

const Close = (req, res) => {
  res.clearCookie("loginTK",'userTK').redirect("/users/login");
  
};

module.exports = {
  Register,
  Login,
  Close,
};
