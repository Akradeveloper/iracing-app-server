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

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "An error occurred while sending the email" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
