import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import 'dotenv/config';


const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend de ton Portfolio 🚀');
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});



app.post('/api/contact', async (req, res) => {
  const { fullname, email, phone, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"${fullname}" <${email}>`,
      to: 'fvolatahindrazana@gmail.com',  
      subject: subject,
      text: `
Nom : ${fullname}
Email : ${email}
Téléphone : ${phone}
Sujet : ${subject}

Message :
${message}
`
    });

    res.json({ message: 'Message envoyé avec succès !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'envoi du message." });
  }
});


app.listen(PORT, () => {
  console.log(`Serveur backend actif sur http://localhost:${PORT}`);
});
