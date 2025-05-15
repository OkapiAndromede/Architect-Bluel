import { dataWorks, dataCategory } from "./api.js";
import { worksGenerator } from "./dom.js";
console.log("Script chargé");

dataWorks().then((works) => {
  console.log(works);
  //Supression des travaux encodé nativement dans le HTML
  document.querySelector(".gallery").innerHTML = ``;
  //Génération des travaux de façon dynamique
  worksGenerator(works);
});

dataCategory().then((category) => {
  const nomCategory = category.map((element) => element.name);
  //Unshift() est une méthode qui ajoute un élément au début d'un tableau
  nomCategory.unshift("Tous");
  console.log(nomCategory);

  for (let i = 0; i < nomCategory.length; i++) {
    const filter = nomCategory[i];
    const filterParent = document.querySelector(".portfolio__filter");
    const filterBtn = document.createElement("button");
    filterBtn.innerText = filter;
    filterParent.appendChild(filterBtn);
  }
});
