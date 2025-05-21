//Fichier qui regroupe des fonctions utilitaires (filtres)
/*La fonction vient ajouter à chaque bouton un listener au click :
 - Enlève à tous les boutons la class "selected"
 - Ajoute au bouton cliqué la class "selected"
 - Filtre la liste des travaux et rend une liste filtré en fct du bouton
 - Efface le html de tous les travaux
 - En fonction du bouton, reconstruit le html des travaux

 Prends en paramètre le array d'objet JS des travaux */

export function filterBtn(works) {
  const button = document.querySelectorAll("#portfolio button");
  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", (event) => {
      button.forEach((btn) => btn.classList.remove("selected"));

      event.target.classList.add("selected");
      const worksFiltree = works.filter((projet) => {
        return projet.category.name === event.target.innerText;
      });
      document.querySelector(".gallery").innerHTML = ``;
      if (event.target.innerText !== "Tous") {
        worksGenerator(worksFiltree);
      } else {
        worksGenerator(works);
      }
    });
  }
}

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
 * @param {string} texte : le texte saisi dans les inputs du formulaire de log in
 * @returns {string} : le texte saisi sans les espaces
 */
export function nettoyageEspacement(texte) {
  let texteSansEspace = texte.replace(/\s+/g, "");
  return texteSansEspace;
}
// Cette fonction affiche le popup en changeant la class
// Passe de "inactive" à "active"
export function afficherPopUp() {
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
