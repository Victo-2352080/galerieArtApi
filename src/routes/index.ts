import { Request, Response, NextFunction, Router } from 'express';

import Paths from '@src/common/constants/Paths';
import OeuvreRoutes from './OeuvreRoutes';
import UtilisateurRoutes from './UtilisateurRoutes';
import JetonRoutes from './JetonRoutes';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IOeuvre, Oeuvre } from '@src/models/Oeuvre';

/******************************************************************************
                                Setup
******************************************************************************/
const apiRouter = Router();

/******************************************************************************
                                Oeuvres
******************************************************************************/
// ** Add OeuvreRouter ** //
const OeuvreRouter = Router();
interface OeuvreRequest {
  Oeuvre: IOeuvre;
}

// ** Validation d'un Oeuvre ** //
function validateOeuvre(req: Request, res: Response, next: NextFunction) {
  const body = req.body as OeuvreRequest;

  if (req.body === null) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Oeuvre requis' })
      .end();
    return;
  }

  if (body.Oeuvre === null || body.Oeuvre === undefined) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Oeuvre requis' })
      .end();
    return;
  }

  const nouveauOeuvre = new Oeuvre(body.Oeuvre);
  const error = nouveauOeuvre.validateSync();

  if (error !== null && error !== undefined) {
    res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
  } else {
    next();
  }
}

OeuvreRouter.get(Paths.Oeuvres.GetAll, OeuvreRoutes.getAll);
OeuvreRouter.get(Paths.Oeuvres.GetByID, OeuvreRoutes.getOne);
OeuvreRouter.post(Paths.Oeuvres.Add, validateOeuvre, OeuvreRoutes.add);
OeuvreRouter.put(Paths.Oeuvres.Update, OeuvreRoutes.update);
OeuvreRouter.delete(Paths.Oeuvres.Delete, OeuvreRoutes.delete);

// Add OeuvreRouter
apiRouter.use(Paths.Oeuvres.Base, OeuvreRouter);

/******************************************************************************
                                Token
******************************************************************************/
const tokenRouter = Router();

// Generate Token
tokenRouter.post(Paths.GenerateToken.Get, JetonRoutes.generateToken);

apiRouter.use(Paths.GenerateToken.Base, tokenRouter);

/******************************************************************************
                              Utilisateur
******************************************************************************/
const utilisateurRouter = Router();

utilisateurRouter.get(Paths.Utilisateurs.GetAll, UtilisateurRoutes.getAll);
// utilisateurRouter.post(Paths.Utilisateurs.Add, UtilisateurRoutes.add);
// utilisateurRouter.put(
//   Paths.Utilisateurs.Update,
//   UtilisateurRoutes.update,
// );
// utilisateurRouter.delete(
//   Paths.Utilisateurs.Delete,
//   UtilisateurRoutes.delete,
// );

apiRouter.use(Paths.Utilisateurs.Base, utilisateurRouter);

/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
