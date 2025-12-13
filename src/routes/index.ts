import { Router } from 'express';

import Paths from '@src/common/constants/Paths';
import OeuvreRoutes from './OeuvreRoutes';
import UtilisateurRoutes from './UtilisateurRoutes';
import JetonRoute from './JetonRoute';

/******************************************************************************
                        Setup
******************************************************************************/

const apiRouter = Router();

const oeuvreRouter = Router();
const utilisateurRouter = Router();

oeuvreRouter.get(Paths.Oeuvres.Get, OeuvreRoutes.getAll);
oeuvreRouter.get(Paths.Oeuvres.GetById, OeuvreRoutes.getOne);
oeuvreRouter.post(Paths.Oeuvres.Add, OeuvreRoutes.add);
oeuvreRouter.put(Paths.Oeuvres.Update, OeuvreRoutes.update);
oeuvreRouter.delete(Paths.Oeuvres.Delete, OeuvreRoutes.delete);

utilisateurRouter.post(Paths.Utilisateurs.GetAll, UtilisateurRoutes.getAll);

apiRouter.use(Paths.Oeuvres.Base, oeuvreRouter);
apiRouter.use(Paths.Utilisateurs.Base, utilisateurRouter);

const tokenRouter = Router();

tokenRouter.post(Paths.GenerateToken.Get, JetonRoute.generateToken);

apiRouter.use(Paths.GenerateToken.Base, tokenRouter);

/******************************************************************************
                        Export default
******************************************************************************/

export default apiRouter;
