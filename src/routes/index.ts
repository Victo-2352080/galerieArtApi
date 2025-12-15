import { Router } from 'express';

import Paths from '@src/common/constants/Paths';
import OeuvreRoutes from './OeuvreRoutes';
import UtilisateurRoutes from './UtilisateurRoutes';
import JetonRoutes from './JetonRoutes';

/******************************************************************************
                                Setup
******************************************************************************/
const apiRouter = Router();

/******************************************************************************
                                Oeuvres
******************************************************************************/
// ** Add OeuvreRouter ** //
const OeuvreRouter = Router();

OeuvreRouter.get(Paths.Oeuvres.Get, OeuvreRoutes.getAll);
OeuvreRouter.get(Paths.Oeuvres.GetById, OeuvreRoutes.getOne);
OeuvreRouter.get(Paths.Oeuvres.GetByTag, OeuvreRoutes.getByTag);
OeuvreRouter.post(Paths.Oeuvres.Add, OeuvreRoutes.add);
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

apiRouter.use(Paths.Utilisateurs.Base, utilisateurRouter);

/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
