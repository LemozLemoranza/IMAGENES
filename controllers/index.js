const Photo = require("../models/Photo");

const GeneralImages = async (req, res) => {
  const userTK = req.cookies.userTK

  if (!userTK) {
    res.clearCookie("loginTK").redirect("/users/login");
  }
try{

  
  const photos = await Photo.find().lean().sort({ date: "desc" });
  res.render("images", { photos, userTK });
}catch(err){
  res.clearCookie("loginTK", "userTK").redirect("/users/login");
 
}
};

const AdminImages = async (req, res) => {

  const userTK = req.cookies.userTK

  if (!userTK) {
    res.clearCookie("loginTK").redirect("/users/login");
  }


  try{

    
    const photos = await Photo.find({ user: req.usuario.id })
    .lean()
    .sort({ date: "desc" });
    
    res.render("image_admin", { photos, userTK });

  }catch(err){
    res.clearCookie("loginTK", "userTK").redirect("/users/login");
   
  }
};

module.exports = {
  GeneralImages,
  AdminImages,
};
