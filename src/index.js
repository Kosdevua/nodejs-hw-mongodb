import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

await initMongoConnection();

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
