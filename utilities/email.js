const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const oAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground/"
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

exports.sendEmail = async (data) => {
  const { to, subject, html } = data;
  const mailData = {
    from: "itsproali@gmail.com",
    replyTo: "itsproali@gmail.com",
    to,
    subject,
    html,
  };
  console.log(mailData);
  const accessToken = await oAuth2Client.getAccessToken();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "itsproali@gmail.com",
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken,
    },
  });

  const info = await transporter.sendMail(mailData);

  return info.messageId;
};
