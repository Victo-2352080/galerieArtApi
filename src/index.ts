import logger from 'jet-logger';
import { connect } from 'mongoose';
import ENV from '@src/common/constants/ENV';
import server from './server';

// **** Constants **** //
const SERVER_START_MSG =
  'Express server started on port: ' + ENV.Port.toString();

// **** Run **** //

logger.info(`Attempting to connect to MongoDB at: ${ENV.Mongodb}`);

connect(ENV.Mongodb)
  .then(() => {
    logger.info('MongoDB connected successfully.');
    // On écoute bien sur 0.0.0.0 pour Azure
    server.listen(ENV.Port, '0.0.0.0', () => {
      logger.info(SERVER_START_MSG);
    });
  })
  .catch((err: unknown) => {
    // CORRECTION 1 : On type explicitement en 'unknown'
    logger.err('MongoDB connection failed!', true);

    // On vérifie si c'est bien une erreur avant de la logger pour satisfaire TypeScript
    if (err instanceof Error) {
      logger.err(err, true);
    } else {
      logger.err(String(err), true);
    }

    // CORRECTION 2 : On dit au linter d'ignorer cette règle juste pour la ligne suivante
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
  });
