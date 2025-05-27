import {
  worksGenerator,
  filtersGenerator,
  removeEditorStyle,
  displayEditorStyle,
  worksDashbordGenerator,
} from "./dom.js";

import { dataWorks } from "./api.js";

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
    //Modification du visuel de la modale
    const dashboardTitle = document.querySelector(".dashbord__title");
    const dashboardForm = document.querySelector(".dashbord__form");
    const galleryUnderline = document.getElementById("gallery-underline");

    leftArrowIcon.classList.remove("hidden");
    dashboardTitle.innerText = "Ajout photo";
    dashbordContent.classList.add("hidden");
    galleryUnderline.classList.add("hidden");
    btnDashbordCta.classList.add("hidden");
    dashboardForm.classList.remove("hidden");
  });

  leftArrowIcon.addEventListener("click", (event) => {
    //Modification du visuel de la modale
    const dashboardTitle = document.querySelector(".dashbord__title");
    const dashboardForm = document.querySelector(".dashbord__form");
    const galleryUnderline = document.getElementById("gallery-underline");

    leftArrowIcon.classList.add("hidden");
    dashboardTitle.innerText = "Galerie photo";
    dashbordContent.classList.remove("hidden");
    galleryUnderline.classList.remove("hidden");
    btnDashbordCta.classList.remove("hidden");
    dashboardForm.classList.add("hidden");
  });
  //Récupération des éléments du formulaire
  const inputPhoto = document.getElementById("input__picture");
  const btnUpload = document.getElementById("btn__upload--picture");
  const logoPreview = document.querySelector(".picture-logo");
  const txtPreview = document.querySelector(".preview__txt");
  const inputTitle = document.getElementById("title-project");
  const inputCategory = document.getElementById("category-project");

  //Listening du bouton "Ajouter une photo" du formulaire
  btnUpload.addEventListener("click", (event) => {
    inputPhoto.click();
  });

  //Affichage de la photo uploader
  inputPhoto.addEventListener("change", () => {
    const photoFile = inputPhoto.files[0];
    if (photoFile) {
      inputTitle.value = photoFile.name;
      //Affichage de l'image dans une balise img
      const reader = new FileReader();
      reader.onload = function (event) {
        const imgPreview = document.createElement("img");
        imgPreview.src = event.target.result;
        imgPreview.alt = "Aperçu de l'image chargée";
        //On cache les anciens éléments pour afficher correctement l'image
        btnUpload.classList.add("hidden");
        logoPreview.classList.add("hidden");
        txtPreview.classList.add("hidden");
        document
          .querySelector(".dashbord__form--preview")
          .appendChild(imgPreview);
      };
      reader.readAsDataURL(photoFile);
    }
  });
  //Génération des options de façon dynamique
  const selectCategory = document.getElementById("category-project");

  category.forEach((element) => {
    //Création d'une balise "option"
    const tagOption = document.createElement("option");
    tagOption.value = element.id;
    tagOption.textContent = element.name;
    selectCategory.appendChild(tagOption);
  });
  //Listening du formulaire
  const form = document.getElementById("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("editorToken");
    //Création d'un objet formData à partir de notre formulaire
    const form = event.target;
    const formData = new FormData(form);

    console.log("Fichier sélectionné :", formData.get("image"));
    for (let [key, value] of formData.entries()) {
      console.log(`${key} :`, value);
    }

    try {
      const responseServer = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!responseServer.ok) {
        throw new Error("Erreur lors de l'envoie des données");
      }
      const data = await responseServer.json();
      console.log("Succès", data);
      //Updtate des données du serveur
      const worksUpdate = await dataWorks();
      //Mise à jour des travaux de la modale
      dashbordContent.innerHTML = ``;
      worksDashbordGenerator(worksUpdate);
      //Mise à jour des travaux encodés nativement dans le html
      document.querySelector(".gallery").innerHTML = ``;
      worksGenerator(worksUpdate);
    } catch (error) {
      console.error("Erreur", error);
    }
  });
}
