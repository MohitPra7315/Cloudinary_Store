const Cloudinary = require("cloudinary").v2;
require("dotenv").config()
exports.Cloudinaryc = async (req, res) => {
    try {
        Cloudinary.config({
            cloud_name: process.env.cloud_NAme,
            api_key: process.env.API_key,
            api_secret: process.env.API_Secret
        })
        console.log("work kar rha h clodinary server connection")
      
    } catch (error) {
        console.log(error)

     
    }
}