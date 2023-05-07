import { GetFixtureQueryDto } from '@app/football-fixtures/fixture/dtos/get-fixture.query.dto';
import { FixtureService } from '@app/football-fixtures/fixture/fixture.service';
import { FixtureCalendarController } from '@app/football-fixtures/fixture/fixture-calendar.controller';
import { Test, TestingModule } from '@nestjs/testing';

import { mockEnabledMatchesData } from '../../mock/data/mock-enabled-matches.data';

describe('FixtureCalendarController', () => {
  let fixtureCalendarController: FixtureCalendarController;
  let fixtureService: FixtureService;

  beforeEach(async () => {
    const FixtureServiceProvider = {
      provide: FixtureService,
      useFactory: () => ({
        findEnabledMatches: jest.fn(() => {
          return mockEnabledMatchesData;
        }),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [FixtureCalendarController],
      providers: [FixtureService, FixtureServiceProvider],
    }).compile();

    fixtureCalendarController = app.get<FixtureCalendarController>(FixtureCalendarController);
    fixtureService = app.get<FixtureService>(FixtureService);
  });

  it('should be defined', () => {
    expect(fixtureCalendarController).toBeDefined();
  });

  it('should invoke the fixture service when request to get the matches', async () => {
    await fixtureCalendarController.findEnabledMatches({} as GetFixtureQueryDto);

    expect(fixtureService.findEnabledMatches).toHaveBeenCalled();
    expect(fixtureService.findEnabledMatches).toHaveBeenCalledTimes(1);
  });

  it('should invoke the findEnabledMatches method with the given params when received any query params from the request', async () => {
    await fixtureCalendarController.findEnabledMatches({
      season: '',
      venue: '',
      tournament: '',
      matchDate: '',
      startDate: '',
      endDate: '',
    } as GetFixtureQueryDto);

    expect(fixtureService.findEnabledMatches).toHaveBeenCalledWith({
      season: '',
      venue: '',
      tournament: '',
      matchDate: '',
      startDate: '',
      endDate: '',
    });
  });

  it('should return all the fixture that are oder by latest to oldest fixture match dates and size equal 2, page equal 1', async () => {
    const result = await fixtureCalendarController.findEnabledMatches({} as GetFixtureQueryDto);
    const { enabledMatchDates: data } = result;

    expect(data[0].matchDate).toEqual(mockEnabledMatchesData.enabledMatchDates[0].matchDate);
    expect(data[0].numberOfMatches).toEqual(mockEnabledMatchesData.enabledMatchDates[0].numberOfMatches);
    expect(data[1].matchDate).toEqual(mockEnabledMatchesData.enabledMatchDates[1].matchDate);
    expect(data[1].numberOfMatches).toEqual(mockEnabledMatchesData.enabledMatchDates[1].numberOfMatches);
  });
});
