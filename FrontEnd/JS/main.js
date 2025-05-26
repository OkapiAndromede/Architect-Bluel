import {
  worksGenerator,
  filtersGenerator,
  removeEditorStyle,
  displayEditorStyle,
} from "./dom.js";

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
    //Ajout de tous nos éléments
    divDashbordContent.appendChild(projectElement);
    projectElement.appendChild(imageElement);
    projectElement.appendChild(deleteElement);
  }
  tagModificator.addEventListener("click", () => {
    asideDashbord.style.visibility = "visible";
    body.style.overflow = "hidden";
  });

  dashbordCross.addEventListener("click", () => {
    asideDashbord.style.visibility = "hidden";
    body.style.overflow = "auto";
  });
}
