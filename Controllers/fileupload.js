const fileS = require("../Model/file")

const cloudinary = require("cloudinary").v2;
exports.localfileuploader = async (req, res) => {
    try {
        const { file } = req.files
        console.log("file is fetched on req", file)
        const path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`
        console.log("paths" + path)
        file.mv(path, (error) => {
            console.log(error)
        })

        res.json({
            success: true,
            message: "succesfully file uploaded"
        })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: "faat gya code"
        })
        console.log(error)
    }
}

function isValidFile(file, Supported) {
    console.log("file for validation", file + "supported", Supported)
    return Supported.includes(file)

}

async function UploadFileonCloudinary(file, folderName, quality) {
    console.log("file for uploading", file)
    const option = { folderName }
    option.resource_type = 'auto'
    console.log(option, "optin full data")
    console.log(file.mimetype.split("/")[0], "file type")

    if (file.mimetype.split("/")[0] == "image") {

        if (quality) {
            console.log(quality, "image quality")

            option.quality = quality
        }

    }
    else {
        console.log(quality, "for vedio qualtity")
        option.chunk_size = quality
    }

    return cloudinary.uploader.upload(file.tempFilePath, option)
}

exports.ImageUpload = async (req, res) => {
    try {
        // 1 fetch the data from request body
        const { name, tags, email } = req.body;

        // 2 fetch file types from request body
        const file = req.files.imageFile;

        if (!file) {
            res.status(400).json({
                success: false,
                message: "file is npt presnt"
            })
        }

        //    3 vaildation  file or not 
        const Supportedfile = ["jpeg", "jpg", "png"]
        const Filetype = await file.name.split(".")[1].toLowerCase();
        console.log("file type", Filetype);

        // 4 validatin on supported media 
        if (!isValidFile(Filetype, Supportedfile)) {
            res.status(400).json({
                success: false,
                message: "file is in valid from given media"
            })
        }
        // 5 upload file to cloudinary
        console.log("start uploading the data to cloudinary")
        // uploaded the file and where we want to store on cloudinary folder and we can attch the extra attributes for size the image
        const response = await UploadFileonCloudinary(file, "MohitGallery")

        console.log(response)

        // 6 save data on MongoDB database 
        const savedata = await fileS.create({
            name,
            ImageUrl: response.url,
            email,
            tags
        })

        res.status(200).json({
            success: true,
            post: savedata,
            message: "succesfully d=saved both storage"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "fatt gya code",
            error: error.message
        })
    }
}


exports.vedioUpload = async (req, res) => {
    try {
        // 1 fetch the data from request body

        const { name, tags, email } = req.body;

        // 2 fetch file types from request body
        const file = req.files.videoFile;


        if (!file) {
            res.status(400).json({
                success: false,
                message: "file is npt presnt"
            })
        }
        //    3 vaildation  file or not     validation for vedio  
        const Supportedfile = ["mp4", "mov"]
        const Filetype = await file.name.split(".")[1].toLowerCase();
        console.log("file type", Filetype);


        // 4 error throw if not diven media
        if (!isValidFile(Filetype, Supportedfile)) {
            res.status(400).json({
                success: false,
                message: "file is in valid from given media"
            })
        }

        // 5 upload file to cloudinary
        console.log("start uploading the data to cloudinary")
        const response = await UploadFileonCloudinary(file, "MohitGallery", 200000)

        console.log(response)

        // 6 save data on MongoDB database 
        const savedata = await fileS.create({
            name,
            ImageUrl: response.url,
            email,
            tags
        })

        res.status(200).json({
            success: true,
            post: savedata,
            message: "succesfully d=saved both storage"
        })



    } catch (error) {
        res.status(400).json({
            success: false,
            message: "fatt gya code",
            error: error.message
        })
    }
}



exports.ImageSizeReducer = async (req, res) => {
    try {
        const { name, tags, email } = req.body;

        // 2 fetch file types from request body
        const file = req.files.imageFile;

        if (!file) {
            res.status(400).json({
                success: false,
                message: "file is npt presnt"
            })
        }

        //    3 vaildation  file or not 
        const Supportedfile = ["jpeg", "jpg", "png"]
        const Filetype = await file.name.split(".")[1].toLowerCase();
        console.log("file type", Filetype);

        // 4 validatin on supported media 
        if (!isValidFile(Filetype, Supportedfile)) {
            res.status(400).json({
                success: false,
                message: "file is in valid from given media"
            })
        }
        // 5 upload file to cloudinary
        console.log("start uploading the data to cloudinary")
        const response = await UploadFileonCloudinary(file, "MohitGallery", 90)

        console.log(response)

        // 6 save data on MongoDB database 
        const savedata = await fileS.create({
            name,
            ImageUrl: response.url,
            email,
            tags
        })

        res.status(200).json({
            success: true,
            post: savedata,
            message: "succesfully d=saved both storage"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "fatt gya code",
            error: error.message
        })
    }
}




exports.Alldata = async (req, res) => {
    try {

        const response = await fileS.find({});
        res.status(200).json({
            success: true,
            post: response,
            message: "succesfully data  all fetched"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "fatt gya code",
            error: error.message
        })
    }
}