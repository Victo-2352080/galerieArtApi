import { IUtilisateur, Utilisateur } from '@src/models/Utilisateur';

async function getByEmail(email: string): Promise<IUtilisateur | null> {
  const utilisateur = await Utilisateur.findOne({ email: email });
  return utilisateur;
}

export default {
  getByEmail,
} as const;
