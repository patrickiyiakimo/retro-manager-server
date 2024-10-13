const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport(
    {
        secure: true,
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "iyiakimopatrick2002@gmail.com",
            pass: "Chinenyenwa"
        }
    }
)

function sendMail(to,sub,msg) {
    transporter.sendMail({
        to: to,
        subject: sub,
        html:msg
    })

    console.log("Email sent")
}

sendMail("iyiakimopatrick2002@gmail.com", "Retro Manager", "This is text message")