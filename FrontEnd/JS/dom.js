//Fichier qui contient les fonctions qui gèrent la manipulation de DOM

/* La fonction permet de générer les travaux, elle prends en paramètre
une variable array d'objet JS */
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

/*La fonction permet de générer les filtres, elle prends en paramètre
un tableau */
export function filtersGenerator(nomCategory) {
  for (let i = 0; i < nomCategory.length; i++) {
    const filter = nomCategory[i];
    const filterParent = document.querySelector(".portfolio__filter");
    const filterBtn = document.createElement("button");
    filterBtn.innerText = filter;
    filterParent.appendChild(filterBtn);
  }
}
