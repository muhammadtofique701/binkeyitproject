const verifyEmailTemplate = ({ name, url }) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Email</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px; color: #333;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="color: #284fa8;">Welcome to Bazaaristan, ${name}!</h2>
          <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${url}" style="
                display: inline-block;
                padding: 12px 24px;
                background-color: #284fa8;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
              ">
              Verify Email
            </a>
          </div>
          <p>If you did not register for Bazaaristan, please ignore this email.</p>
          <p style="margin-top: 40px;">Regards,<br><strong>The Bazaaristan Team</strong></p>
        </div>
      </body>
      </html>
    `;
  };
  
  export default verifyEmailTemplate;
  