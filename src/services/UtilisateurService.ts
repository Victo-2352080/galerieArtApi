import UtilisateurRepo from '@src/repos/UtilisateurRepo';
import { IUtilisateur } from '@src/models/Utilisateur';

/******************************************************************************
                                Fonctions
******************************************************************************/
/**
 * Get one utilisateur by email.
 */
function getOne(courriel: string): Promise<IUtilisateur | null> {
  return UtilisateurRepo.getOne(courriel);
}

/**
 * Get all utilisateurs.
 */
function getAll(): Promise<IUtilisateur[]> {
  return UtilisateurRepo.getAll();
}

export default {
  getOne,
  getAll,
};
