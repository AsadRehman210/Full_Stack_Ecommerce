const nodemailer = require("nodemailer");
const Subscriber = require("../Models/SubsModel");

const mailController = async (req, res) => {
    try {
        const { to, subject, message } = req.body;

        const receiverData = await Subscriber.find();

        // Create Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "asadrehman210@gmail.com",
                pass: "invy xryz smjl tzel",
            },
        });


        const emailPromises = receiverData.map(async (sub) => {
            const mailOptions = {
                from: "Asad Store <asadrehman210@gmail.com>",
                to: sub.email, // Send email to individual subscriber
                subject: subject,
                text: message,
            };

            // Send email
            await transporter.sendMail(mailOptions);

        });

        // Execute all email sending promises concurrently
        await Promise.all(emailPromises);

        // Respond with success message
        res.status(200).json({ message: "Email sent successfully" });

    } catch (error) {
        res.status(500).json({ message: "An error occurred while sending the email" });

    }

}



module.exports = { mailController }