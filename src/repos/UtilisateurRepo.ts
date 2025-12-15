import { IUtilisateur, Utilisateur } from '@src/models/Utilisateur';

/******************************************************************************
                                Fonctions
******************************************************************************/
/****************************************
                 GET
*****************************************/
/**
 * Extraire un utilisateur par courriel.
 *
 * @param {string} courriel - L'adresse courriel de l'utilisateur
 * @returns {IUtilisateur | null} L'utilisateur ou null s'il n'existe pas
 */
async function getOne(courriel: string): Promise<IUtilisateur | null> {
  return await Utilisateur.findOne({ courriel });
}

/**
 * Extraire tous les utilisateurs.
 *
 * @returns {IUtilisateur[]} Un tableau de tous les utilisateurs
 */
async function getAll(): Promise<IUtilisateur[]> {
  return await Utilisateur.find().sort('courriel');
}

export default {
  getOne,
  getAll,
};
