//Fichier qui contient les fonctions qui effectue des appel API

//Récupération des travaux depuis l'API (fonction asyncrhone) sous forme array JS

/**
 * @typedef {Object} category
 * @property {number} id : l'identifiant de la catégorie
 * @property {string} name : le nom de la catégorie
 */

/**
 * @typedef {object} work
 * @property {number} id : l'identifiant du travail
 * @property {string} title : le titre du travail
 * @property {string} imageUrl : l'url de l'image du travail
 * @property {number} categoryID : l'identifiant de la catégorie associé
 * @property {number} userID : l'identifiant de l'utilisateur ayant crée le travail
 */

/**
 * La fonction récupère les travaux de l'architecte depuis l'API
 * @returns {Promise<work[]>} une promesse qui fournit tous les travaux de l'API
 */
export async function dataWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
}

/**
 * La fonction récupère les catégories associés aux travaux de l'architecte depuis l'API
 * @returns {Promise<category[]>} une promesse qui fournit toutes les catégories de l'API
 */
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
 * @returns {Promise<Response>} : une promesse qui fournit la réponse brut du serveur (objet Response)
 */
export async function postDataWork(formData, token) {
  const responseServer = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return responseServer;
}
/**
 * La fonction supprime un travail de la base de donnée via l'API
 * @param {number} workID : L'identifiant associé à un projet
 * @param {string} token : Le token d'identification obtenu lors du logIn
 * @returns {Promise<Response>} : une promesse qui fournit la réponse brut du serveur (objet Response)
 */
export async function deleteDataWork(workID, token) {
  const responseServer = await fetch(
    `http://localhost:5678/api/works/${workID}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return responseServer;
}
