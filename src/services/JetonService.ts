// **** Variables **** //

import { IUtilisateur } from '@src/models/Utilisateur';
import UtilisateurService from './UtilisateurService';
import jwt from 'jsonwebtoken';
import ENV from '@src/common/constants/ENV';

export const UTILISATEUR_NOT_FOUND_ERR = 'Utilisateur non trouvé';
export const INVALID_CREDENTIALS_ERR = 'Identifiants invalides';

// **** Functions **** //

/**
 * Générer un jeton pour un utilisateur
 *
 * @param {IUtilisateur} utilisateur - L'utilisateur demandant le jeton
 * @returns {Promise} - Le jeton signé
 * @throws {Error} - Si erreur
 */
async function generateToken(utilisateur: IUtilisateur): Promise<string> {
  // Récupérer l'utilisateur de la base de données par courriel
  const utilisateurBD = await UtilisateurService.getOne(utilisateur.courriel);

  // Vérifier si l'utilisateur existe
  if (!utilisateurBD) {
    throw new Error(UTILISATEUR_NOT_FOUND_ERR);
  }

  // Vérifier le mot de passe
  if (utilisateurBD.motDePasse !== utilisateur.motDePasse) {
    throw new Error(INVALID_CREDENTIALS_ERR);
  }

  // Créer le payload du JWT avec les informations nécessaires
  const payload = {
    id: utilisateurBD.id,
    courriel: utilisateurBD.courriel,
  };

  // Signer et retourner le jeton
  return jwt.sign(payload, ENV.Jwtsecret, {
    expiresIn: '24h', // Le jeton expire après 24 heures
  });
}

// **** Export default **** //
export default {
  generateToken,
} as const;
