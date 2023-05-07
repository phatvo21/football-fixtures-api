import { GetFixtureQueryDto } from '@app/football-fixtures/fixture/dtos/get-fixture.query.dto';
import { FixtureController } from '@app/football-fixtures/fixture/fixture.controller';
import { FixtureService } from '@app/football-fixtures/fixture/fixture.service';
import { Test, TestingModule } from '@nestjs/testing';

import { mockFixtureData } from '../../mock/data/mock-fixture.data';

describe('FixtureController', () => {
  let fixtureController: FixtureController;
  let fixtureService: FixtureService;

  beforeEach(async () => {
    const FixtureServiceProvider = {
      provide: FixtureService,
      useFactory: () => ({
        findAll: jest.fn(() => {
          return mockFixtureData;
        }),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [FixtureController],
      providers: [FixtureService, FixtureServiceProvider],
    }).compile();

    fixtureController = app.get<FixtureController>(FixtureController);
    fixtureService = app.get<FixtureService>(FixtureService);
  });

  it('should be defined', () => {
    expect(fixtureController).toBeDefined();
  });

  it('should invoke the fixture service when request to get the fixtures', async () => {
    await fixtureController.findAll({} as GetFixtureQueryDto);

    expect(fixtureService.findAll).toHaveBeenCalled();
    expect(fixtureService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should invoke the findAll method with the given params when received any query params from the request', async () => {
    await fixtureController.findAll({
      season: '',
      page: 3,
      size: 30,
      venue: '',
      tournament: '',
      id: '',
      ids: 'a,b',
      matchDate: '',
      startDate: '',
      endDate: '',
    } as GetFixtureQueryDto);

    expect(fixtureService.findAll).toHaveBeenCalledWith({
      season: '',
      page: 3,
      size: 30,
      venue: '',
      tournament: '',
      id: '',
      ids: 'a,b',
      matchDate: '',
      startDate: '',
      endDate: '',
    });
  });

  it('should return all the fixture that are oder by latest to oldest fixture match dates and size equal 2, page equal 1', async () => {
    const result = await fixtureController.findAll({} as GetFixtureQueryDto);
    const { data } = result;

    expect(data[0].id).toEqual(mockFixtureData.data[0].id);
    expect(data[0].matchTime).toEqual(mockFixtureData.data[0].matchTime);
    expect(data[0].matchDate).toEqual(mockFixtureData.data[0].matchDate);
    expect(data[0].round).toEqual(mockFixtureData.data[0].round);
    expect(data[0].score.id).toEqual(mockFixtureData.data[0].score.id);
    expect(data[0].score.homeTeamScore).toEqual(mockFixtureData.data[0].score.homeTeamScore);
    expect(data[0].score.awayTeamScore).toEqual(mockFixtureData.data[0].score.awayTeamScore);
    expect(data[0].season.id).toEqual(mockFixtureData.data[0].season.id);
    expect(data[0].season.name).toEqual(mockFixtureData.data[0].season.name);
    expect(data[0].venue.id).toEqual(mockFixtureData.data[0].venue.id);
    expect(data[0].venue.name).toEqual(mockFixtureData.data[0].venue.name);
    expect(data[0].venue.city).toEqual(mockFixtureData.data[0].venue.city);
    expect(data[0].venue.country).toEqual(mockFixtureData.data[0].venue.country);
    expect(data[0].tournament.id).toEqual(mockFixtureData.data[0].tournament.id);
    expect(data[0].tournament.country).toEqual(mockFixtureData.data[0].tournament.country);
    expect(data[0].tournament.name).toEqual(mockFixtureData.data[0].tournament.name);
    expect(data[0].homeTeam.id).toEqual(mockFixtureData.data[0].homeTeam.id);
    expect(data[0].homeTeam.name).toEqual(mockFixtureData.data[0].homeTeam.name);
    expect(data[0].homeTeam.logo).toEqual(mockFixtureData.data[0].homeTeam.logo);
    expect(data[0].homeTeam.code).toEqual(mockFixtureData.data[0].homeTeam.code);
    expect(data[0].awayTeam.id).toEqual(mockFixtureData.data[0].awayTeam.id);
    expect(data[0].awayTeam.name).toEqual(mockFixtureData.data[0].awayTeam.name);
    expect(data[0].awayTeam.logo).toEqual(mockFixtureData.data[0].awayTeam.logo);
    expect(data[0].awayTeam.code).toEqual(mockFixtureData.data[0].awayTeam.code);
    expect(data[1].id).toEqual(mockFixtureData.data[1].id);
    expect(data[1].matchTime).toEqual(mockFixtureData.data[1].matchTime);
    expect(data[1].matchDate).toEqual(mockFixtureData.data[1].matchDate);
    expect(data[1].round).toEqual(mockFixtureData.data[1].round);
    expect(data[1].score.id).toEqual(mockFixtureData.data[1].score.id);
    expect(data[1].score.homeTeamScore).toEqual(mockFixtureData.data[1].score.homeTeamScore);
    expect(data[1].score.awayTeamScore).toEqual(mockFixtureData.data[1].score.awayTeamScore);
    expect(data[1].season.id).toEqual(mockFixtureData.data[1].season.id);
    expect(data[1].season.name).toEqual(mockFixtureData.data[1].season.name);
    expect(data[1].venue.id).toEqual(mockFixtureData.data[1].venue.id);
    expect(data[1].venue.name).toEqual(mockFixtureData.data[1].venue.name);
    expect(data[1].venue.city).toEqual(mockFixtureData.data[1].venue.city);
    expect(data[1].venue.country).toEqual(mockFixtureData.data[1].venue.country);
    expect(data[1].tournament.id).toEqual(mockFixtureData.data[1].tournament.id);
    expect(data[1].tournament.country).toEqual(mockFixtureData.data[1].tournament.country);
    expect(data[1].tournament.name).toEqual(mockFixtureData.data[1].tournament.name);
    expect(data[1].homeTeam.id).toEqual(mockFixtureData.data[1].homeTeam.id);
    expect(data[1].homeTeam.name).toEqual(mockFixtureData.data[1].homeTeam.name);
    expect(data[1].homeTeam.logo).toEqual(mockFixtureData.data[1].homeTeam.logo);
    expect(data[1].homeTeam.code).toEqual(mockFixtureData.data[1].homeTeam.code);
    expect(data[1].awayTeam.id).toEqual(mockFixtureData.data[1].awayTeam.id);
    expect(data[1].awayTeam.name).toEqual(mockFixtureData.data[1].awayTeam.name);
    expect(data[1].awayTeam.logo).toEqual(mockFixtureData.data[1].awayTeam.logo);
    expect(data[1].awayTeam.code).toEqual(mockFixtureData.data[1].awayTeam.code);
    expect(data).toHaveLength(2);
    expect(result.total).toBe(2);
    expect(result.size).toBe(2);
    expect(result.currentPage).toBe(1);
    expect(result.lastPage).toBe(1);
    expect(result.nextPage).toBeNull();
    expect(result.prevPage).toBeNull();
  });
});
