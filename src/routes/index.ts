import { Router } from 'express';

import Paths from '@src/common/constants/Paths';
import OeuvreRoutes from './OeuvreRoutes';

/******************************************************************************
                        Setup
******************************************************************************/

const apiRouter = Router();

const oeuvreRouter = Router();

oeuvreRouter.get(Paths.Oeuvres.Get, OeuvreRoutes.getAll);
oeuvreRouter.get(Paths.Oeuvres.GetById, OeuvreRoutes.getOne);
oeuvreRouter.post(Paths.Oeuvres.Add, OeuvreRoutes.add);
oeuvreRouter.put(Paths.Oeuvres.Update, OeuvreRoutes.update);
oeuvreRouter.delete(Paths.Oeuvres.Delete, OeuvreRoutes.delete);

apiRouter.use(Paths.Oeuvres.Base, oeuvreRouter);

/******************************************************************************
                        Export default
******************************************************************************/

export default apiRouter;
