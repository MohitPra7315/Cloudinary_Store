
const express = require("express")
const app = express();

require("dotenv").config()
const PORT = process.env.PORT || 8000

app.use(express.json());
const fileupload = require("express-fileupload")
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
const router=require("./routes/FilesPath")

app.use("/api/v2/", router)

require("./Confiq/database").dbconnection();
require("./Confiq/Cloudinary").Cloudinaryc()


app.listen(PORT, (req, res) => {
    console.log(`app is working on port ${PORT}`)
})
