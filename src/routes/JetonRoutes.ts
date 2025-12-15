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
  if (!req.body?.utilisateurLogin) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Utilisateur Login Requis (courriel, motDePasse)' })
      .end();
  }

  const utilisateurLogin = req.body.utilisateurLogin as IUtilisateur;

  // Validation des champs requis
  if (!utilisateurLogin.courriel || !utilisateurLogin.motDePasse) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Courriel et mot de passe requis' })
      .end();
  }

  try {
    const token = await JetonService.generateToken(utilisateurLogin);
    return res.status(HttpStatusCodes.OK).send({ token });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Erreur inconnue';

    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .send({ error: errorMessage })
      .end();
  }
}

/******************************************************************************
                            Export default
******************************************************************************/

export default {
  generateToken,
} as const;
