const form = document.getElementById('contact-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Empêche le rechargement de la page

  const formData = {
    fullname: form.fullname.value,
    email: form.email.value,
    phone: form.phone.value,
    subject: form.subject.value,
    message: form.message.value
  };

  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message); // Affiche "Message envoyé avec succès!" ou une erreur
    form.reset(); // Réinitialise le formulaire après l'envoi
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire', error);
    alert('Erreur lors de l\'envoi du message.');
  }
});
