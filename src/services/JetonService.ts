// **** Variables **** //

import { IUtilisateur } from '@src/models/Utilisateur';
import UtilisateurService from './UtilisateurService';
import jwt from 'jsonwebtoken';
import ENV from '@src/common/constants/ENV';

export const UTILISATEUR_NOT_FOUND_ERR = 'Utilisateur non trouvé';

// **** Functions **** //

/**
 * Générer un jeton pour un utilisateur
 *
 * @param {IUtilisateur} utilisateur - L'utilisateur demandant le jeton
 * @returns {Promise} - Le jeton signé
 */
async function generateToken(utilisateur: IUtilisateur): Promise<string> {
  const utilisateurBD = (await UtilisateurService.getAll()).find(
    (u) => u.email === utilisateur.email,
  );
  if (utilisateurBD && utilisateurBD.motDePasse === utilisateur.motDePasse) {
    return jwt.sign(utilisateur.email, ENV.Jwtsecret);
  } else {
    return '';
  }
}

// **** Export default **** //
export default {
  generateToken,
} as const;
