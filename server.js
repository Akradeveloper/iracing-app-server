const express = require("express");
const sgMail = require("@sendgrid/mail");
const cors = require("cors"); // Importa el paquete cors

const app = express();

app.use(cors()); // Habilita CORS para todas las rutas

app.use(express.json());

// Configura tu transporte de correo SendGrid aquí
sgMail.setApiKey(
  process.env.REACT_APP_SENDGRID_API_KEY
);

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: process.env.REACT_APP_SENDGRID_RECIPIENT_EMAIL, // Change to your recipient
    from: process.env.REACT_APP_SENDGRID_SENDER_EMAIL, // Change to your verified sender
    subject: "Mensaje de " + name + "   :   " + email,
    text: message,
    html: "<strong>"+ message +"</strong>",
  };

  const emailSentMessageOK = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          background-color: #f4f4f4;
          width:400px;
          height: 100px;
        }
        .message {
          background-color: #4CAF50;
          color: white;
          padding: 5px;
          border-radius: 5px;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="message">
        <h1>ENVIADO</h1>
        <p>Tu mensaje ha sido enviado, serás contestado lo más rápido posible</p>
      </div>
    </body>
    </html>
  `;

  const emailSentMessageNOOK = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          background-color: #f4f4f4;
          width:400px;
          height: 100px;
        }
        .message {
          background-color: red;
          color: white;
          padding: 5px;
          border-radius: 5px;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="message">
        <h1>ERROR</h1>
        <p>Ha habido un problema, inténtalo de nuevo más tarde</p>
      </div>
    </body>
    </html>
  `;


  try {
    await sgMail.send(msg);
    res.status(200).send({emailSentMessageOK});
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .send({ emailSentMessageNOOK });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
