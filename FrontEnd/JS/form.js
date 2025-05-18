//Fichier qui contient le programme associé à la page de formulaire
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Listener fonctionnel");
  //Récupération des valeurs
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  //Création des variables de tests
  let regexEmail = new RegExp("^[A-Za-z0-9._-]+@[A-Za-z0-9]+.[A-Za-z]{2,}$");
  let regexPassword = new RegExp(
    "^[A-Za-z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?`~]{2,}$"
  );
  const passwordValid = "S0phie";

  //Création du test simple
  if (regexEmail.test(email.value) === true) {
    console.log("Forme email correct");
  } else {
    console.log("Syntaxe email non valide");
  }
  if (
    regexPassword.test(password.value) === true &&
    password.value === passwordValid
  ) {
    console.log("Mot de passe correct");
  } else {
    console.log("Mot de passe incorrect");
  }
});
