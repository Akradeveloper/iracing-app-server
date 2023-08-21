const express = require("express");
const sgMail = require("@sendgrid/mail");
const cors = require("cors"); // Importa el paquete cors

const app = express();

app.use(cors()); // Habilita CORS para todas las rutas

app.use(express.json());

// Configura tu transporte de correo SendGrid aquí
sgMail.setApiKey(
  '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'
);

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: 'akrapovices@gmail.com', // Change to your recipient
    from: 'akradeveloper@gmail.com', // Change to your verified sender
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
