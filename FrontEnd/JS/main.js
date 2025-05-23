import { dataWorks, dataCategory } from "./api.js";
import { worksGenerator, filtersGenerator, editorStyle } from "./dom.js";
import { filterBtn } from "./util.js";
console.log("Script chargé");
//Importation des travaux
const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();
//Importation des catégorie
const responseCategory = await fetch("http://localhost:5678/api/categories");
const category = await responseCategory.json();
//Déclaration des variables globales
let identification = localStorage.getItem("identifiant");
//Récupération des éléments du DOM
const divEditor = document.querySelectorAll(".editor__mode");
const divFilter = document.querySelector(".portfolio__filter");
//Supression des travaux encodé nativement dans le HTML
document.querySelector(".gallery").innerHTML = ``;
//Génération des travaux de façon dynamique
worksGenerator(works);

const nomCategory = category.map((element) => element.name);
//Unshift() est une méthode qui ajoute un élément au début d'un tableau
nomCategory.unshift("Tous");
//Affichage des filtres en fonction de mode editor
if (identification === null) {
  filtersGenerator(nomCategory);
} else {
  divFilter.innerHTML = "";
}
editorStyle(identification);
//Programme filtre fonctionnel
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
