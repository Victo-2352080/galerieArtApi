import { Router } from 'express';
import Paths from '@src/common/constants/Paths';
import OeuvreRoutes from './OeuvreRoutes';
import JetonRoute from './JetonRoute';

const apiRouter = Router();

// ** Token Router (Login) ** //
const tokenRouter = Router();

tokenRouter.post(Paths.GenerateToken.Get, JetonRoute.generateToken);
apiRouter.use(Paths.GenerateToken.Base, tokenRouter);

// ** Oeuvre Router ** //
const oeuvreRouter = Router();
oeuvreRouter.get(Paths.Oeuvres.Get, OeuvreRoutes.getAll);
oeuvreRouter.get(Paths.Oeuvres.GetById, OeuvreRoutes.getOne);
oeuvreRouter.post(Paths.Oeuvres.Add, OeuvreRoutes.add);
oeuvreRouter.put(Paths.Oeuvres.Update, OeuvreRoutes.update);
oeuvreRouter.delete(Paths.Oeuvres.Delete, OeuvreRoutes.delete);

apiRouter.use(Paths.Oeuvres.Base, oeuvreRouter);

export default apiRouter;
