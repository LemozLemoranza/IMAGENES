const Photo = require("../models/Photo");

const GeneralImages = async (req, res) => {
  const photos = await Photo.find().lean().sort({ date: "desc" });
  res.render("images", { photos });
};

const AdminImages = async (req, res) => {
  const photos = await Photo.find({ user: req.usuario.id })
    .lean()
    .sort({ date: "desc" });

  res.render("image_admin", { photos });
};

module.exports = {
  GeneralImages,
  AdminImages,
};
