//Fichier qui contient le programme associé à la page de formulaire
const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  //Récupération des valeurs
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  // Déclaration des valeurs valides
  const passwordValid = "S0phie";
  const emailValid = "sophie.bluel@test.tld";
  //Création des variables de tests
  let regexEmail = new RegExp("^[A-Za-z0-9._-]+@[A-Za-z0-9]+.[A-Za-z]{2,}$");
  let regexPassword = new RegExp(
    "^[A-Za-z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?`~]{2,}$"
  );
  //Nettoyage des espacements
  const emailClean = nettoyageEspacement(email.value);
  const passwordClean = nettoyageEspacement(password.value);

  //Création du test simple
  if (
    regexEmail.test(emailClean) === true &&
    regexPassword.test(passwordClean) === true
  ) {
    const serverResponse = await logIn(emailClean, passwordClean);
    console.log(serverResponse);
  } else {
    console.log(
      "Veuillez remplir les champs avec un email et un mot de passe valide"
    );
  }
});

function nettoyageEspacement(texte) {
  let texteSansEspace = texte.replace(/\s+/g, "");
  return texteSansEspace;
}

async function logIn(emailLog, passwordLog) {
  const dataLogIn = {
    email: emailLog,
    password: passwordLog,
  };
  const chargeUtile = JSON.stringify(dataLogIn);
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: chargeUtile,
  });

  if (!response.ok) {
    throw new Error(`Erreur: ${response.status} : ${response.text}`);
  } else {
    const data = response.json();
    return data;
  }
}
