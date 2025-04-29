app.post('/api/contact', async (req, res) => {
  const { fullname, email, phone, subject, message } = req.body;

  try {
    // 1. Envoie du message à toi
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

    // 2. Email de confirmation au visiteur
    await transporter.sendMail({
      from: `"LiciaDev Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirmation de réception de votre message",
      text: `
Bonjour ${fullname},

Merci de m'avoir contactée via mon portfolio. Voici une copie de votre message :

Sujet : ${subject}
Téléphone : ${phone}
Message :
${message}

Je vous répondrai dès que possible.

Cordialement,  
Felicia Volatahindrazana
      `
    });

    res.json({ message: 'Message envoyé avec succès ! Une copie vous a été envoyée.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'envoi du message." });
  }
});
