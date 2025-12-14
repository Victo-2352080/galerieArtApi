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
  const utilisateurs = await UtilisateurService.getAll();
  const utilisateurBD = utilisateurs.find(
    (u) =>
      u.courriel.toLowerCase().trim() ===
      utilisateur.courriel.toLowerCase().trim(),
  );

  if (utilisateurBD && utilisateurBD.motDePasse === utilisateur.motDePasse) {
    console.log('Utilisateur trouvé ! Génération du token...');
    return jwt.sign({ email: utilisateur.courriel }, ENV.Jwtsecret);
  } else {
    console.log('Utilisateur non trouvé ou mot de passe incorrect');
    return '';
  }
}

// **** Export default **** //
export default {
  generateToken,
} as const;
