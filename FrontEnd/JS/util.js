//Fichier qui regroupe des fonctions utilitaires (filtres)
/*La fonction vient ajouter à chaque bouton un listener au click :
 - Enlève à tous les boutons la class "selected"
 - Ajoute au bouton cliqué la class "selected"
 - Filtre la liste des travaux et rend une liste filtré en fct du bouton
 - Efface le html de tous les travaux
 - En fonction du bouton, reconstruit le html des travaux

 Prends en paramètre le array d'objet JS des travaux */

export function filterBtn(works) {
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
}
