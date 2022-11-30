const Photo = require("../models/Photo");
const { validationResult } = require("express-validator");

const fs = require("fs-extra");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const Upload = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const valores = req.body;
    const validaciones = errors.array();
    res.render("image_form", { validaciones, valores });
  } else {
    const usuario = req.usuario.id;

    const { title, description } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path);

    const newPhoto = new Photo({
      title,
      description,
      imageURL: result.url,
      public_id: result.public_id,
      user: usuario,
    });

    await newPhoto.save();
    await fs.unlink(req.file.path);
    res.redirect("/gallery");
  }
};

const Delete = async (req, res) => {
  try{
    const { photo_id } = req.params;
    const photo = await Photo.findByIdAndDelete(photo_id);
    await cloudinary.uploader.destroy(photo.public_id);
    res.redirect("/gallery");
  }catch{
    res.redirect("/gallery");

  }
};

module.exports = {
  Upload,
  Delete,
};
