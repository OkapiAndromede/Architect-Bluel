//Fichier qui contient les fonctions qui effectue des appel API

//Récupération des travaux depuis l'API (fonction asyncrhone) sous forme array JS
export async function dataWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
}

//Récupération des catégorie depuis l'API sous forme array JS
export async function dataCategory() {
  const response = await fetch("http://localhost:5678/api/categories");
  const category = await response.json();
  return category;
}
