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
let isAuthenticated = !!localStorage.getItem("identifiant");
//Récupération des éléments du DOM
const divFilter = document.querySelector(".portfolio__filter");
const hasBtnFilter = document.querySelectorAll("#portfolio button");
//Supression des travaux encodé nativement dans le HTML
document.querySelector(".gallery").innerHTML = ``;
//Génération des travaux de façon dynamique
worksGenerator(works);

const nomCategory = category.map((element) => element.name);
//Unshift() est une méthode qui ajoute un élément au début d'un tableau
nomCategory.unshift("Tous");
//Mise à jour de l'affichage en fonction du statut d'authentification

if (!isAuthenticated) {
  filtersGenerator(nomCategory);
  removeEditorStyle(isAuthenticated);
} else {
  divFilter.innerHTML = "";
  displayEditorStyle(isAuthenticated);
}
//Programme permettant de filter les travaux en fonction du filtre sélectionné
if (hasBtnFilter) {
  for (let i = 0; i < hasBtnFilter.length; i++) {
    hasBtnFilter[i].addEventListener("click", (event) => {
      hasBtnFilter.forEach((btn) => btn.classList.remove("selected"));

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
