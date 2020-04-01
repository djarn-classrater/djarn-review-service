import {Client, expect} from '@loopback/testlab';
import {ReviewServiceApplication} from '../..';
import {Reviews} from '../../models';
import {setupApplication, clearDatabase} from './test-helper';

describe('ReviewController', () => {
  let app: ReviewServiceApplication;
  let client: Client;
  let resReviewMock: Reviews;

  const reviewMock: Partial<Reviews> = {
    studentId: '600610773',
    courseId: '261361',
    context: 'test',
  };

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
    // clear database before test
    await clearDatabase();
  });

  after(async () => {
    await clearDatabase();
    await app.stop();
  });

  it('Create review', async () => {
    const res = await client
      .post('/reviews')
      .send(reviewMock)
      .expect(200);
    expect(res.body).to.containEql(reviewMock);
    resReviewMock = res.body;
  });

  it('Create duplicate review', async () => {
    const res = await client
      .post('/reviews')
      .send(reviewMock)
      .expect(422);
    expect(res.body.error.code).to.eql('ER_DUP_ENTRY');
  });

  it('Get reviews', async () => {
    const res = await client.get('/reviews').expect(200);
    expect(res.body).length(1);
  });

  it('Update reviews', async () => {
    const updateReviewBody: Partial<Reviews> = {context: 'updated'};
    await client
      .patch(`/reviews/${resReviewMock.id}`)
      .send(updateReviewBody)
      .expect(204);
    const res = await client.get(`/reviews/${resReviewMock.id}`);
    expect(res.body).to.containEql(updateReviewBody);
  });
});
