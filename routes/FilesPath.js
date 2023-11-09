const express = require("express");
const route = express.Router()

const { localfileuploader, ImageUpload ,vedioUpload,ImageSizeReducer,Alldata } = require("../Controllers/fileupload")
console.log("working---1")
route.post("/LocalFile", localfileuploader)
route.post("/UploadImage", ImageUpload)
route.post("/Uploadvideo",vedioUpload)
route.post("/ImageSizeReducer",ImageSizeReducer)
route.get("/Alldata",Alldata)
console.log("working-------2")
module.exports = route
// module.exports = router;