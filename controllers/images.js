const Photo = require('../models/Photo')
const fs = require('fs-extra')
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const Upload = async(req,res) => {

    const {title, description} = req.body


    const result = await cloudinary.uploader.upload(req.file.path)

    const newPhoto = new Photo({
        title,
        description,
        imageURL: result.url,
        public_id: result.public_id
    })

    await newPhoto.save()
    await fs.unlink(req.file.path)
    res.redirect('/')

}


const Delete = async(req, res) => {
    const { photo_id } = req.params
    const photo = await Photo.findByIdAndDelete(photo_id)
    await cloudinary.uploader.destroy(photo.public_id)
    res.redirect('/gallery')
} 

module.exports = {
    Upload,
    Delete
}