import { Router } from 'express';

import Paths from '@src/common/constants/Paths';
import OeuvreRoutes from './OeuvreRoutes';
import UtilisateurRoutes from './UtilisateurRoutes';

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

utilisateurRouter.post(
  Paths.Utilisateur.GetByEmail,
  UtilisateurRoutes.getByEmail,
);

apiRouter.use(Paths.Oeuvres.Base, oeuvreRouter);
apiRouter.use(Paths.Utilisateur.Base, utilisateurRouter);

/******************************************************************************
                        Export default
******************************************************************************/

export default apiRouter;
