<?php
// Vérifier si le formulaire a été soumis
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les valeurs du formulaire
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Vérifier si les champs requis sont remplis
    if (!empty($fullname) && !empty($email) && !empty($message)) {
        // Connexion à la base de données
        $dsn = 'mysql:host=localhost;dbname=messagerie';
        $username = 'root';
        $password = '';

        try {
            $pdo = new PDO($dsn, $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $stmt = $pdo->query("SELECT * FROM messages");
            $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
     
            // Préparer et exécuter la requête d'insertion
            $stmt = $pdo->prepare("INSERT INTO messages (destinataire, contenu, numero, sujet, nom) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$email, $message, $phone, $subject, $fullname]);

            echo "Le message a été envoyé avec succès!";
        } catch (PDOException $e) {
            echo "Une erreur s'est produite lors de l'insertion du message : " . $e->getMessage();
        }
    } else {
        echo "Veuillez remplir tous les champs obligatoires.";
    }
}

foreach ($messages as $message) {
    echo "<h3>" . $message['sujet'] . "</h3>";
    echo "<p>De : " . $message['nom'] . "</p>";
    echo "<p>Date : " . $message['date'] . "</p>";
    echo "<p>" . $message['contenu'] . "</p>";
    echo "<hr>";
}

?>
