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

/**
 * La fonction envoie un nouveau travail (work) à la base de donnée via l'API
 * @param {FormData} formData : Objet de type FormData, il doit inclure
 * - image {File} : le fichier image (jpeg,png) du travail
 * - title {string} : le titre associé à l'image du travail
 * @param {string} token : Le token d'identification obtenu lors du logIn
 * @returns {Promise<Response>} : la réponse brut du serveur (objet Response)
 */
export async function postDataWork(formData, token) {
  const responseServer = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return responseServer;
}
