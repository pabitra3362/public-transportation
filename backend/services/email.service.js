import nodemailer from "nodemailer";
import { google } from "googleapis";
import config from "../config/config.js";

const CLIENT_ID = config.clientID;
const CLIENT_SECRET = config.clientSecret;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = config.gmail_refesh_token;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });



export default async function emailSender({ email, username }) {
  const accessToken = await oAuth2Client.getAccessToken();
  

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "pmohanty2344@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken.token,
    },

    debug: true, // Enable SMTP connection debug messages
  });

  const mailOptions = {
    from: "pmohanty2344@gmail.com",
    to: email,
    subject: "Welcome to safar!",
    text: `Hi ${username},\n\nThank you for registering. We're excited to have you on board!`,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}
