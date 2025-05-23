//Fichier qui contient les fonctions qui gèrent la manipulation de DOM

/**La fonction permet de générer les travaux
 * @param {Array} works : un tableau d'objet JS
 */
export function worksGenerator(works) {
  for (let i = 0; i < works.length; i++) {
    const project = works[i];
    //Récupération de l'élément DOM qui accueillera les travaux
    const divGallery = document.querySelector(".gallery");
    //Création d'une balise dédié à un projet
    const projetElement = document.createElement("figure");
    //Création de la balise image d'un projet
    const imageElement = document.createElement("img");
    imageElement.src = project.imageUrl;
    imageElement.alt = project.title;
    //Création de la balise texte d'un projet
    const txtElement = document.createElement("figcaption");
    txtElement.innerText = project.title;

    divGallery.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(txtElement);
  }
}

/**La fonction permet de générer les filtres des travaux
 * @param {Array} nomCategory : un tableau contenant le nom des catégories
 */
export function filtersGenerator(nomCategory) {
  for (let i = 0; i < nomCategory.length; i++) {
    const filter = nomCategory[i];
    const filterParent = document.querySelector(".portfolio__filter");
    const filterBtn = document.createElement("button");
    filterBtn.innerText = filter;
    filterParent.appendChild(filterBtn);
  }
}

/**La fonction permet de générer le message de connexion déjà établie
 * @param {string} identification : la variable de stockage du token
 */
export function logOut(identification) {
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
/**
 * La fonction modifie la propriété "display" des balise "editor__mode"
 * @param {string} token : la variable de stockage du token
 */
export function editorStyle(token) {
  const editorConteneur = document.querySelectorAll(".editor__mode");
  if (!token) {
    editorConteneur.forEach((element) => {
      element.style.display = "none";
    });
  } else {
    editorConteneur.forEach((element) => {
      element.style.display = "flex";
    });
  }
}
