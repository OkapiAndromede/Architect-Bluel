//Fichier qui regroupe des fonctions utilitaires (filtres)

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
// Cette fonction affiche le popup en changeant la class
// Passe de "inactive" à "active"
export function displayPopUp() {
  const divPopup = document.querySelector(".popup");
  const textErrorConteneur = document.querySelector(".popup__txt");
  const textError = document.createElement("p");

  textError.innerText = "Le mot de passe ou l'email est invalide";
  textErrorConteneur.appendChild(textError);
  divPopup.classList.remove("inactive");
  divPopup.classList.add("active");
}
//Cette fonction masque le popUp en changeant la class
// Passe de "active" à "inactive"
export function closePopUp() {
  const divPopup = document.querySelector(".popup");
  divPopup.classList.remove("active");
  divPopup.classList.add("inactive");
}
