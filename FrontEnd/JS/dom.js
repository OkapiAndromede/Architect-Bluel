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
 * La fonction cache le style lié au mode édition
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
/**
 * La fonction affiche le style lié au mode édition
 * @param {boolean} hasToken : la variable indiquant la présence du token
 */
export function displayEditorStyle(hasToken) {
  const editorConteneur = document.querySelectorAll(".editor__mode");
  if (hasToken) {
    editorConteneur.forEach((element) => {
      element.style.display = "flex";
    });
  }
}
/**
 * La fonction génère les travaux de l'architecte au niveau de la modale
 * @param {Array} works : un tableau d'objet JS avec les travaux de l'architecte
 */
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
/**
 * La fonction permet d'afficher l'interface pour l'ajout de projet
 */
export function displayAddProjectInterface() {
  //Récupération des éléments du DOM
  const dashboardTitle = document.querySelector(".dashbord__title");
  const dashboardForm = document.querySelector(".dashbord__form");
  const dashbordContent = document.querySelector(".dashbord__content");
  const galleryUnderline = document.getElementById("gallery-underline");
  const leftArrowIcon = document.querySelector(".arrow-logo");
  const btnDashbordCta = document.querySelector(".dashbord__cta");

  //Modification du visuel avec la class "hidden"
  leftArrowIcon.classList.remove("hidden");
  dashboardTitle.innerText = "Ajout photo";
  dashbordContent.classList.add("hidden");
  galleryUnderline.classList.add("hidden");
  btnDashbordCta.classList.add("hidden");
  dashboardForm.classList.remove("hidden");
}
/**
 * La fonction permet d'afficher l'interface pour la supression de projet
 */
export function displayRemoveProjectInterface() {
  //Récupération des éléments du DOM
  const dashboardTitle = document.querySelector(".dashbord__title");
  const dashboardForm = document.querySelector(".dashbord__form");
  const dashbordContent = document.querySelector(".dashbord__content");
  const galleryUnderline = document.getElementById("gallery-underline");
  const leftArrowIcon = document.querySelector(".arrow-logo");
  const btnDashbordCta = document.querySelector(".dashbord__cta");

  //Modification du visuel avec la class "hidden"
  leftArrowIcon.classList.add("hidden");
  dashboardTitle.innerText = "Galerie photo";
  dashbordContent.classList.remove("hidden");
  galleryUnderline.classList.remove("hidden");
  btnDashbordCta.classList.remove("hidden");
  dashboardForm.classList.add("hidden");
}
/**
 * La fonction permet de cacher les éléments présent avant l'import de la photo
 */
export function hideOldPreviewElement() {
  //Récupération des éléments du DOM
  const btnUpload = document.getElementById("btn__upload--picture");
  const logoPreview = document.querySelector(".picture-logo");
  const txtPreview = document.querySelector(".preview__txt");

  //Modification du visuel avec la class "hidden"
  btnUpload.classList.add("hidden");
  logoPreview.classList.add("hidden");
  txtPreview.classList.add("hidden");
}
/**
 * La fonction affiche les éléments présent avant l'import de la photo
 */
export function displayOldPreviewElement() {
  //Récupération des éléments du DOM
  const btnUpload = document.getElementById("btn__upload--picture");
  const logoPreview = document.querySelector(".picture-logo");
  const txtPreview = document.querySelector(".preview__txt");

  //Modification du visuel en retirant la class "hidden"
  btnUpload.classList.remove("hidden");
  logoPreview.classList.remove("hidden");
  txtPreview.classList.remove("hidden");
}

/**
 * La fonction permet d'attribuer le titre de la photo chargée
 * @param {string} fileName : variable contenant le nom du fichier chargé
 */
export function setPhotoTitle(fileName) {
  const inputTitle = document.getElementById("title-project");
  inputTitle.value = fileName;
}

/**
 * La fonction affiche l'image téléchargée pour l'ajout d'un travail
 * @param {File} file : Fichier image à afficher provenant d'un input de type "file"
 */
export function displayImagePreview(file) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const imgPreview = document.createElement("img");
    imgPreview.src = event.target.result;
    imgPreview.alt = "Aperçu de l'image chargée";
    imgPreview.id = "loaded__img";
    document.querySelector(".dashbord__form--preview").appendChild(imgPreview);
  };
  reader.readAsDataURL(file);
}

/**
 * La fonction génére des élements <option> dans un menu déroulant
 * à partir des catégories de la base de données
 * @param {Array <{id : number, name : string}>} dataCategory : Tableau d'objet JS des catégories
 * id : identifiant de la catégorie
 * name : nom de la catégorie
 */
export function categoryOptionGenerator(dataCategory) {
  const selectCategory = document.getElementById("category-project");

  dataCategory.forEach((element) => {
    //Création d'une balise "option"
    const tagOption = document.createElement("option");
    tagOption.value = element.id;
    tagOption.textContent = element.name;
    selectCategory.appendChild(tagOption);
  });
}
/**
 * La fonction active visuellement et factuellement le btn du formulaire
 */
export function activateBtnSubmit() {
  const btnSubmitForm = document.getElementById("form-cta");

  btnSubmitForm.style.backgroundColor = " #1d6154";
  btnSubmitForm.style.cursor = "pointer";
}
/**
 * La fonction désactive visuellement et factuellement le btn du formulaire
 */
export function desactivateBtnSubmit() {
  const btnSubmitForm = document.getElementById("form-cta");

  btnSubmitForm.style.backgroundColor = " #a7a7a7";
  btnSubmitForm.style.cursor = "not-allowed";
}
/**
 *
 * @param {boolean} inputImgLoadedStatus : le status de complétion de l'image
 * @param {boolean} inputTitleStatus : le status de complétion du titre de l'image
 * @param {boolean} inputOptionCategory : le status du choix de la catégorie
 * @returns {void} : Appel la fct° "activateBtnSubmit" ou "desactivateBtnSubmit"
 */
export function checkFormStatus(
  inputImgLoadedStatus,
  inputTitleStatus,
  inputOptionCategory
) {
  if (inputImgLoadedStatus && inputTitleStatus && inputOptionCategory) {
    activateBtnSubmit();
  } else {
    desactivateBtnSubmit();
  }
}
