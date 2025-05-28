import {
  worksGenerator,
  filtersGenerator,
  removeEditorStyle,
  displayEditorStyle,
  worksDashbordGenerator,
  displayAddProjectInterface,
  displayRemoveProjectInterface,
  hideOldPreviewElement,
  displayOldPreviewElement,
  setPhotoTitle,
  displayImagePreview,
  categoryOptionGenerator,
} from "./dom.js";

import { dataWorks, postDataWork } from "./api.js";
import {
  updateWorksDashboard,
  updateWorksGallery,
  clearInputForm,
} from "./util.js";

//Importation des travaux depuis le serveur
const responseWorkServer = await fetch("http://localhost:5678/api/works");
const works = await responseWorkServer.json();
//Importation des catégorie depuis le serveur
const responseCategoryServer = await fetch(
  "http://localhost:5678/api/categories"
);
const category = await responseCategoryServer.json();
//Déclaration des variables globales
let isAuthenticated = !!localStorage.getItem("editorToken");
//Récupération des éléments du DOM
const body = document.body;
const divFilter = document.querySelector(".portfolio__filter");
const baliseLogStatus = document.getElementById("log-status");
const tagModificator = document.getElementById("open-dashbord");
const asideDashbord = document.getElementById("portfolio-dashbord");
const dashbordCross = document.querySelector(".close-logo");
const leftArrowIcon = document.querySelector(".arrow-logo");
const dashbordContent = document.querySelector(".dashbord__content");
const btnDashbordCta = document.querySelector(".dashbord__cta");
//Supression des travaux encodé nativement dans le HTML
document.querySelector(".gallery").innerHTML = ``;
//Génération des travaux de façon dynamique
worksGenerator(works);

const categoryName = category.map((element) => element.name);
//Unshift() est une méthode qui ajoute un élément au début d'un tableau
categoryName.unshift("Tous");
//Mise à jour de l'affichage en fonction du statut d'authentification

if (!isAuthenticated) {
  filtersGenerator(categoryName);
  removeEditorStyle(isAuthenticated);
} else {
  divFilter.innerHTML = "";
  displayEditorStyle(isAuthenticated);
  baliseLogStatus.innerText = "logout";
}
//Programme permettant de filter les travaux en fonction du filtre sélectionné
const btnFilter = document.querySelectorAll(".portfolio__filter button");
if (btnFilter) {
  for (let i = 0; i < btnFilter.length; i++) {
    btnFilter[i].addEventListener("click", (event) => {
      btnFilter.forEach((btn) => btn.classList.remove("selected"));

      event.target.classList.add("selected");
      const worksFiltered = works.filter((projet) => {
        return projet.category.name === event.target.innerText;
      });
      document.querySelector(".gallery").innerHTML = ``;

      if (event.target.innerText !== "Tous") {
        worksGenerator(worksFiltered);
      } else {
        worksGenerator(works);
      }
    });
  }
}

if (isAuthenticated) {
  //Génération des travaux dans le dashbord
  worksDashbordGenerator(works);

  //Ouverture du dashboard
  tagModificator.addEventListener("click", () => {
    asideDashbord.style.visibility = "visible";
    body.style.overflow = "hidden";
  });

  //Fermeture du dashboard
  dashbordCross.addEventListener("click", () => {
    asideDashbord.style.visibility = "hidden";
    body.style.overflow = "auto";
  });
  asideDashbord.addEventListener("click", () => {
    asideDashbord.style.visibility = "hidden";
    body.style.overflow = "auto";
  });

  //Gestion de la propagation au click
  const dashboardInterface = document.querySelector(".dashbord__interface");
  dashboardInterface.addEventListener("click", (event) => {
    //Evite que le click se propage dans la balise aside et ferme la modale
    event.stopPropagation();
  });

  //Récupération et écoute des logo poubelles
  const trashLogo = document.querySelectorAll(".trash-logo");
  trashLogo.forEach((logo) => {
    logo.addEventListener("click", async (event) => {
      try {
        //Effacement du travail de la base de donnée
        const workID = event.currentTarget.id;
        const token = localStorage.getItem("editorToken");
        const responseServeur = await fetch(
          `http://localhost:5678/api/works/${workID}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(responseServeur);
        //Updtate des données du serveur
        const worksUpdate = await dataWorks();
        //Mise à jour des travaux de la modale
        dashbordContent.innerHTML = ``;
        worksDashbordGenerator(worksUpdate);
        //Mise à jour des travaux encodés nativement dans le html
        document.querySelector(".gallery").innerHTML = ``;
        worksGenerator(worksUpdate);
      } catch (error) {
        console.log(error);
      }
    });
  });

  //Ecoute du bouton "Ajouter une photo"
  btnDashbordCta.addEventListener("click", (event) => {
    displayAddProjectInterface();
  });

  //Ecoute de la flèche de retour de l'interface
  leftArrowIcon.addEventListener("click", (event) => {
    //Modification du visuel de la modale : affichage de la phase 1
    displayRemoveProjectInterface();
  });

  //Récupération des éléments du formulaire
  const inputPhoto = document.getElementById("input__picture");
  const btnUpload = document.getElementById("btn__upload--picture");

  //Listening du bouton "Ajouter une photo" du formulaire
  btnUpload.addEventListener("click", () => {
    inputPhoto.click();
  });

  //Affichage de la photo téléchargée
  inputPhoto.addEventListener("change", () => {
    const photoFile = inputPhoto.files[0];
    if (photoFile) {
      setPhotoTitle(photoFile.name);
      hideOldPreviewElement();
      displayImagePreview(photoFile);
    }
  });

  //Génération des options de façon dynamique
  categoryOptionGenerator(category);

  //Listening du formulaire
  const form = document.getElementById("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("editorToken");
    //Création d'un objet formData à partir de notre formulaire
    const form = event.target;
    const formData = new FormData(form);

    const formImage = formData.get("image");
    const formImageTitle = formData.get("title");

    if (formImageTitle && formImage && formImage.size > 0) {
      try {
        //Envoi du nouveau travail à la base de donnée via l'API
        const responseServer = await postDataWork(formData, token);

        if (!responseServer.ok) {
          throw new Error("Erreur lors de l'envoie des données");
        }

        //Updtate des données du serveur
        const worksUpdate = await dataWorks();

        //Update des affichages
        updateWorksDashboard(worksUpdate);
        updateWorksGallery(worksUpdate);
        clearInputForm();
        displayOldPreviewElement();
      } catch (error) {
        console.error("Erreur", error);
      }
    }
  });
}
