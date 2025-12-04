import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import ENV from '@src/common/constants/ENV';

/**
 * Intergiciel pour authentifier le jeton de l'utilisateur
 */
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  // Pas bloquer le login
  if (req.url.includes('generatetoken')) {
    next();
    return;
  }

  // Laisser les get, sans login
  if (req.method === 'GET') {
    next();
    return;
  }

  const authHeader = req.headers.authorization;

  const token = authHeader?.split(' ')[1];

  if (token == null) {
    return res.sendStatus(HttpStatusCodes.UNAUTHORIZED);
  }

  jwt.verify(token, ENV.JwtSecret, (err, _user) => {
    if (err) {
      return res.sendStatus(HttpStatusCodes.FORBIDDEN);
    }
    next();
  });
}

export default authenticateToken;
