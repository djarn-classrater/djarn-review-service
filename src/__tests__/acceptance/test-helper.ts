import {ReviewServiceApplication} from '../..';
import {ReviewsRepository} from '../../repositories';
import {DbDataSource} from '../../datasources';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const app = new ReviewServiceApplication({
    rest: restConfig,
  });

  await app.boot();
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export async function clearDatabase() {
  const reviewsRepository = new ReviewsRepository(new DbDataSource());
  await reviewsRepository.deleteAll();
}

export interface AppWithClient {
  app: ReviewServiceApplication;
  client: Client;
}
