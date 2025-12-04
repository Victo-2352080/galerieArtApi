import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserMod, { IUserLogin } from '@src/models/User';
import ENV from '@src/common/constants/ENV';

// **** Functions **** //

/**
 * Générer un jeton pour un utilisateur
 */
async function generateToken(utilisateur: IUserLogin): Promise<string> {
  const utilisateurBD = await UserMod.model.findOne({
    email: utilisateur.email,
  });

  if (!utilisateurBD) {
    return '';
  }

  const passwordMatch = await bcrypt.compare(
    utilisateur.motDePasse,
    utilisateurBD.motDePasse,
  );

  if (passwordMatch) {
    return jwt.sign(
      { email: utilisateurBD.email, id: utilisateurBD._id },
      ENV.JwtSecret,
      { expiresIn: '1h' },
    );
  } else {
    return '';
  }
}

// **** Export default **** //
export default {
  generateToken,
} as const;
