const mongoose = require("mongoose")
const nodemailer = require("nodemailer")

require("dotenv").config()
const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ImageUrl: {
        type: String
    },
    tags: {
        type: String
    }, email: {
        type: String
    }
})

FileSchema.post("save", async function (doc) {
    try {
        console.log("transporter will start working", doc)

        // transporter
        let transporter = nodemailer.createTransport({
            // inwhixh platform will we use there like gamil
            // host: 'smtp.gamil.com',
            // // // service:"gmail",

            // auth: {
            //     user: 'mohitprajapati7315@gmail.com',
            //     pass: 'pfnfhtujaabgizpm'
            // }

            host: "smtp.gmail.com",

            auth: {
                user: process.env.Mail_user,
                pass: process.env.Mail_pass
            }
            ,tls: {
                rejectUnauthorized: false
            }
        })
        console.log("transporter finished is working")

        // sendMailer

        try {


            let info = await transporter.sendMail({
                from: "lala laori",
                to: doc.email,
                                Subject: "new file updated ",
                Html: `<p>see the File jdjdjjdjdjdjdjdjjdjjdd ${doc.ImageUrl} </p>`
            })
            console.log("info which you have ", info)

        } catch (error) {
            console.log("fatt gya code", error)
        }
        console.log("succesfully done code")

    } catch (error) {

    }
})

const data = mongoose.model("fileS", FileSchema)
module.exports = data;