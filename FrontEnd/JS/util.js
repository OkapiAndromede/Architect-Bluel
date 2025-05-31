//Fichier qui regroupe des fonctions utilitaires (filtres)
import { worksDashbordGenerator, worksGenerator } from "./dom.js";
import { dataWorks } from "./api.js";
/**
 * La fonction envoie les information de logIn en format JSON à l'API (POST)
 * @param {string} emailLog : l'email de l'utilisateur
 * @param {string} passwordLog : le mot de passe de l'utilisateur
 * @returns {object} un objet javascript contenant le token d'authentification
 */
export async function logIn(emailLog, passwordLog) {
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
    console.log("Erreur de connexion");
  } else {
    const data = response.json();
    return data;
  }
}

/**Cette fonction enlève les espacements dans une chaine de caractère
 * @param {string} text : le texte saisi dans les inputs du formulaire de log in
 * @returns {string} : le texte saisi sans les espaces
 */
export function removeSpaces(text) {
  let texteSansEspace = text.replaceAll(/\s+/g, "");
  return texteSansEspace;
}

/**
 * La fonction affiche le popUp
 * Change la class "inactive" vers "active"
 */
export function displayPopUp() {
  const divPopup = document.querySelector(".popup");
  const textErrorConteneur = document.querySelector(".popup__txt");
  const textError = document.createElement("p");

  textError.innerText = "Le mot de passe ou l'email est invalide";
  textErrorConteneur.appendChild(textError);
  divPopup.classList.remove("inactive");
  divPopup.classList.add("active");
}

/**
 * La fonction masque le popUp
 * Change la class "active" vers "inactive"
 */
export function closePopUp() {
  const divPopup = document.querySelector(".popup");
  divPopup.classList.remove("active");
  divPopup.classList.add("inactive");
}
/**
 * La fonction efface le contenu de la modale et affiche les travaux à jour
 * @param {Array} worksUpdate : Tableau d'objet JS avec les données mis à jour des travaux
 */
export function updateWorksDashboard(worksUpdate) {
  const dashbordContent = document.querySelector(".dashbord__content");
  dashbordContent.innerHTML = ``;
  worksDashbordGenerator(worksUpdate);
}
/**
 * La fonction efface le contenu de la gallerie de travaux et affiche les travaux à jour
 * @param {Array} worksUpdate : Tableau d'objet JS avec les données mis à jour des travaux
 */
export function updateWorksGallery(worksUpdate) {
  document.querySelector(".gallery").innerHTML = ``;
  worksGenerator(worksUpdate);
}
/**
 * La fonction vide les valeurs des inputs du formulaire et enlève l'image affichée
 */
export function clearInputForm() {
  const inputImage = document.getElementById("input__picture");
  const imgBox = document.getElementById("loaded__img");
  const inputTitle = document.getElementById("title-project");
  const inputOptionCategory = document.getElementById("category-project");

  inputImage.value = "";
  imgBox.remove();
  inputTitle.value = "";
  inputOptionCategory.value = "";
}
/**
 * La fonction permet de nettoyer le nom du fichier de son exention (image)
 * @param {string} filename : le nom du fichier téléchargé
 * @returns filename sans l'exention ".png" et ".jpg"
 */
export function removeImageExtension(filename) {
  return filename.replace(/\.(png|jpg)$/i, ``);
}
