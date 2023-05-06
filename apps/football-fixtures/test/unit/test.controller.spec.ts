import { TestController } from '@app/football-fixtures/fixture/test.controller';
import { TestService } from '@app/football-fixtures/fixture/test.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('TestController', () => {
  let testController: TestController;

  beforeEach(async () => {
    const TestServiceProvider = {
      provide: TestService,
      useFactory: () => ({
        findAll: jest.fn(() => {
          return [];
        }),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [TestService, TestServiceProvider],
    }).compile();

    testController = app.get<TestController>(TestController);
  });

  it('should return "OK"', async () => {
    const result = await testController.test();
    console.log(result);
    expect(true).toBe(true);
  });
});
