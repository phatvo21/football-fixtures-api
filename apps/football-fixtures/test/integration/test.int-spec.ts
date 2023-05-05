/* eslint-disable max-lines */
import { BaseModule } from '@app/common/modules';
import {
  generateMockServer,
  generateRequest, getRepository,
  RequestType, ServerType,
} from '@app/common/utils/database-test.util';
import { TestEntity } from '@app/football-fixtures/db/entities/test.entity';
import { FixtureModule } from '@app/football-fixtures/fixture/fixture.module';

describe('notifications (e2e)', () => {
  let server: ServerType;
  let request: RequestType;
  let entity: any;

  beforeAll(async () => {
    server = await generateMockServer([
      BaseModule,
      FixtureModule,
    ]);
    request = generateRequest(server);
    entity = server.module.get(getRepository(TestEntity));
  });

  afterAll(async () => {
    await server.app.close();
  });

  describe('Test', () => {
    beforeAll(async () => {
      const data = new TestEntity();
      data.createdAt = new Date();
      data.updatedAt = new Date();
      await entity.save(data)
    });

    afterAll(async () => {
      await entity.clear();
    });

    it('should return list of all notifications for a given user and specific channel', async () => {
      // eslint-disable-next-line no-secrets/no-secrets
      const res = await request.agent.get(`/test`);
      const result = await entity.find();
      console.log(result);
      expect(res.status).toEqual(200);
    });
  });
});
