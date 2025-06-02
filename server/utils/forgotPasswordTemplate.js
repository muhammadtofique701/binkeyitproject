const forgotPasswordTemplate = ({ name, otp }) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Forgot Password OTP</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                padding: 20px;
                color: #333;
            }
            .container {
                background-color: #fff;
                padding: 30px;
                border-radius: 8px;
                max-width: 600px;
                margin: auto;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #007BFF;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Hello, ${name}</h2>
            <p>You requested to reset your password. Please use the OTP below to proceed:</p>
            <div class="otp">${otp}</div>
            <p>This OTP is valid for 10 minutes. If you didn't request this, you can safely ignore this email.</p>
            <p>Thanks,<br>The Binkeyit Team</p>
        </div>
    </body>
    </html>
    `;
};

export default forgotPasswordTemplate;
