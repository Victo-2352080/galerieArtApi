// Erreur de build fixé par Claude.AI - 2025-12-10
import JetonService from '@src/services/JetonService';
import { IUtilisateur } from '@src/models/Utilisateur';
import { IReq, IRes } from './common/types';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Générer un jeton.
 *
 * @param {IReq} req - La requête au serveur
 * @param {IRes} res - La réponse du serveur
 */
async function generateToken(req: IReq, res: IRes) {
  if (!req.body) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: 'Utilisateur requis (courriel, motDePasse)' });
  }

  const utilisateurLogin = (req.body.utilisateurLogin ||
    req.body) as IUtilisateur;

  if (!utilisateurLogin.courriel || !utilisateurLogin.motDePasse) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: 'Courriel et mot de passe requis' });
  }

  const token = await JetonService.generateToken(utilisateurLogin);

  if (!token || token === '') {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ error: 'Identifiants invalides' });
  }

  return res.json({ token });
}

/******************************************************************************
                            Export default
******************************************************************************/

export default {
  generateToken,
} as const;
