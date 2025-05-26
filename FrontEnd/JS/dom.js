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
 * @param {Array} categoryName : un tableau contenant le nom des catégories
 */
export function filtersGenerator(categoryName) {
  for (let i = 0; i < categoryName.length; i++) {
    const filter = categoryName[i];
    const filterParent = document.querySelector(".portfolio__filter");
    const filterBtn = document.createElement("button");
    filterBtn.innerText = filter;
    filterParent.appendChild(filterBtn);
  }
}

/**La fonction permet de générer le message de connexion déjà établie
 * @param {boolean} hasToken : la variable indiquant la présence du token
 */
export function logOut(hasToken) {
  const formulaireConteneur = document.getElementById("formulaire-connexion");
  const formulaireTitle = document.createElement("h2");
  const formulaireTxt = document.createElement("p");
  const btnLogOut = document.createElement("button");
  if (hasToken) {
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
 * @param {boolean} hasToken : la variable indiquant la présence du token
 */
export function removeEditorStyle(hasToken) {
  const editorConteneur = document.querySelectorAll(".editor__mode");
  if (!hasToken) {
    editorConteneur.forEach((element) => {
      element.style.display = "none";
    });
  }
}

export function displayEditorStyle(hasToken) {
  const editorConteneur = document.querySelectorAll(".editor__mode");
  if (hasToken) {
    editorConteneur.forEach((element) => {
      element.style.display = "flex";
    });
  }
}

export function worksDashbordGenerator(works) {
  for (let i = 0; i < works.length; i++) {
    const project = works[i];
    //Récupération de l'élément DOM qui accueillera les images de travaux
    const divDashbordContent = document.querySelector(".dashbord__content");
    //Création de la balise dédié à un projet
    const projectElement = document.createElement("div");
    projectElement.classList.add("dashbord__content--works");
    //Création de la balise image d'un projet
    const imageElement = document.createElement("img");
    imageElement.src = project.imageUrl;
    imageElement.alt = project.title;
    //Création de la balise avec le logo poubelle
    const deleteElement = document.createElement("i");
    deleteElement.classList.add("fa-solid", "fa-trash-can", "trash-logo");
    deleteElement.id = project.id;
    //Ajout de tous nos éléments
    divDashbordContent.appendChild(projectElement);
    projectElement.appendChild(imageElement);
    projectElement.appendChild(deleteElement);
  }
}
