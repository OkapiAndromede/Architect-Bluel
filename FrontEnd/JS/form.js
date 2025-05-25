import { removeSpaces, logIn, closePopUp, displayPopUp } from "./util.js";
import { logOut } from "./dom.js";

// Vérification du localStorage et du token
let isAuthenticated = !!localStorage.getItem("editorToken");
logOut(isAuthenticated);
// Récupération des éléments du DOM
const baliseForm = document.querySelector("form");
const btnPopUp = document.querySelector(".popup__btn");
const btnLogOut = document.getElementById("logOut");
const baliseLogStatus = document.getElementById("log-status");
// Listening du click lors du logIn si baliseForm renvoie une valeur truthy
if (isAuthenticated) {
  baliseLogStatus.innerText = "logout";
}
if (baliseForm) {
  baliseForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    //Récupération des valeurs des inputs du formulaire
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    // Déclaration des variables globales
    let serverResponse = undefined;
    //Création des expressions réulières pour les emails et les passwords
    let regexEmail = new RegExp("^[A-Za-z0-9._-]+@[A-Za-z0-9]+.[A-Za-z]{2,}$");
    let regexPassword = new RegExp(
      "^[A-Za-z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?`~]{2,}$"
    );
    //Nettoyage des espacements au niveau des input email & password
    const emailWithoutSpace = removeSpaces(email.value);
    const passwordWithoutSpace = removeSpaces(password.value);

    //Création du test pour entrer les valeurs email & password dans logIn()
    if (
      regexEmail.test(emailWithoutSpace) &&
      regexPassword.test(passwordWithoutSpace)
    ) {
      serverResponse = await logIn(emailWithoutSpace, passwordWithoutSpace);
    } else {
      console.log(
        "Veuillez remplir les champs avec un email et un mot de passe valide"
      );
    }
    //Si le serveur répond une valeur truthy, on stock le token d'identification
    if (serverResponse) {
      localStorage.setItem("editorToken", serverResponse.token);
      isAuthenticated = localStorage.getItem("editorToken");
      console.log(isAuthenticated);
    }

    //Création du test pour rediriger vers la landing page
    if (!serverResponse) {
      displayPopUp();
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
    localStorage.removeItem("editorToken");
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
