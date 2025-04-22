const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Méthode non autorisée' });
  }

  const { fullname, email, phone, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.MAIL_TO,
    subject: `[Contact Portfolio] ${subject}`,
    text: `
Nom: ${fullname}
Email: ${email}
Téléphone: ${phone}
Message:
${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message envoyé avec succès !' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de l’envoi du message.' });
  }
};
