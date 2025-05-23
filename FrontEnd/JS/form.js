import {
  nettoyageEspacement,
  afficherPopUp,
  logIn,
  closePopUp,
} from "./util.js";
import { logOut } from "./dom.js";

// Vérification du localStorage et du token
let identification = localStorage.getItem("identifiant");
logOut(identification);
// Récupération des éléments du DOM
const form = document.querySelector("form");
const btnPopUp = document.querySelector(".popup__btn");
const btnLogOut = document.getElementById("logOut");
// Listening du click lors du logIn si form renvoie une valeur truthy

if (form) {
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
    if (regexEmail.test(emailClean) && regexPassword.test(passwordClean)) {
      serverResponse = await logIn(emailClean, passwordClean);
    } else {
      console.log(
        "Veuillez remplir les champs avec un email et un mot de passe valide"
      );
    }
    console.log(serverResponse);
    if (serverResponse) {
      if (!identification) {
        localStorage.setItem("identifiant", serverResponse.token);
        identification = localStorage.getItem("identifiant");
        console.log(identification);
      } else {
        localStorage.removeItem("identifiant");
        identification = undefined;
        console.log(identification);
      }
    }

    //Création du test pour rediriger vers la landing page
    if (!serverResponse) {
      afficherPopUp();
    } else {
      document.location.href = "./index.html";
    }
    //Reinitialisation des inputs du formulaire
    email.value = "";
    password.value = "";
  });
}
// Listening du logOut si btnLogOut renvoie une valeur truthy

if (btnLogOut) {
  btnLogOut.addEventListener("click", () => {
    localStorage.removeItem("identifiant");
    location.reload();
  });
}

btnPopUp.addEventListener("click", () => {
  //Effacement du contenu du popUp
  const textErrorConteneur = document.querySelector(".popup__txt");
  textErrorConteneur.innerHTML = "";
  //Fermeture du popUp
  closePopUp();
});
