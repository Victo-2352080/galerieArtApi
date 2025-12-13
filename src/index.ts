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
    server.listen(ENV.Port, '0.0.0.0', () => {
      logger.info(SERVER_START_MSG);
    });
  })
  .catch((err: unknown) => {
    logger.err('MongoDB connection failed!', true);

    if (err instanceof Error) {
      logger.err(err, true);
    } else {
      logger.err(String(err), true);
    }

    throw new Error('Database connection failed. Server cannot start.');
  });
