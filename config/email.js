require('dotenv').config();
const nodemailer = require('nodemailer');
const { secret } = require('./secret'); // Ensure the path to your secret configuration is correct

// Promise-based sendEmail function
module.exports.sendEmail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: secret.email_host,
      service: secret.email_service,
      port: secret.email_port,
      secure: true,
      auth: {
        user: secret.email_user,
        pass: secret.email_pass,
      },
    });
    transporter.verify(function (err, success) {
      if (err) {
        // res.status(403).send({
        //   message: `Error happen when verify ${err.message}`,
        // });
        console.log(err.message);
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    // Verification of transporter is optional here and can be used for debugging
    // If you wish to use it, you can uncomment the verification step below
    /*
    transporter.verify(function (error) {
      if (error) {
        console.error("Transporter verification failed:", error);
        reject(new Error("Failed to verify transporter configuration."));
      } else {
        console.log('Server is ready to take our messages');
      }
    });
    */

    // Directly sending the email without waiting for verification in this simplified example
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};




