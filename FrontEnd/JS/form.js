import {
  nettoyageEspacement,
  afficherPopUp,
  logIn,
  closePopUp,
} from "./util.js";
//Fichier qui contient le programme associé à la page de formulaire

const form = document.querySelector("form");
const btnPopUp = document.querySelector(".popup__btn");
let identification = localStorage.getItem("identifiant");
console.log(identification);
logOut(identification);
const btnLogOut = document.getElementById("logOut");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  //Récupération des valeurs
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  // Déclaration des variables globales
  let serverResponse = undefined;
  //Création des variables de tests
  let regexEmail = new RegExp("^[A-Za-z0-9._-]+@[A-Za-z0-9]+.[A-Za-z]{2,}$");
  let regexPassword = new RegExp(
    "^[A-Za-z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?`~]{2,}$"
  );
  //Nettoyage des espacements
  const emailClean = nettoyageEspacement(email.value);
  const passwordClean = nettoyageEspacement(password.value);

  //Création du test pour entrer les valeurs email & password dans logIn()
  if (
    regexEmail.test(emailClean) === true &&
    regexPassword.test(passwordClean) === true
  ) {
    serverResponse = await logIn(emailClean, passwordClean);
  } else {
    console.log(
      "Veuillez remplir les champs avec un email et un mot de passe valide"
    );
  }
  console.log(serverResponse);
  if (identification === null) {
    localStorage.setItem("identifiant", serverResponse.token);
    identification = localStorage.getItem("identifiant");
    console.log(identification);
  } else {
    localStorage.removeItem("identifiant");
    identification = undefined;
    console.log(identification);
  }
  //Création du test pour rediriger vers la landing page
  if (serverResponse === undefined) {
    afficherPopUp();
  } else {
    document.location.href = "./index.html";
  }
  //Reinitialisation des inputs du formulaire
  email.value = "";
  password.value = "";
});

btnLogOut.addEventListener("click", () => {
  localStorage.removeItem("identifiant");
  location.reload();
});

btnPopUp.addEventListener("click", () => {
  //Effacement du contenu du popUp
  const textErrorConteneur = document.querySelector(".popup__txt");
  textErrorConteneur.innerHTML = "";
  //Fermeture du popUp
  closePopUp();
});

function logOut(identification) {
  const formulaireConteneur = document.getElementById("formulaire-connexion");
  const formulaireTitle = document.createElement("h2");
  const formulaireTxt = document.createElement("p");
  const btnLogOut = document.createElement("button");
  if (identification !== null) {
    formulaireConteneur.innerHTML = "";
    formulaireTitle.innerText = "Log Out";
    formulaireTxt.innerText = "Vous êtes déjà connecté à votre compte !";
    btnLogOut.innerText = "Se déconnecter";
    btnLogOut.id = "logOut";

    formulaireConteneur.appendChild(formulaireTitle);
    formulaireConteneur.appendChild(formulaireTxt);
    formulaireConteneur.appendChild(btnLogOut);
  }
}
