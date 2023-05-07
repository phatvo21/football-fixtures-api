/* eslint-disable max-lines */
import { BaseModule } from '@app/common/modules';
import {
  clearDB,
  generateMockServer,
  generateRequest,
  getRepository,
  RequestType,
  ServerType, wait,
} from '@app/common/utils/database-test.util';
import { FixtureModule } from '@app/football-fixtures/fixture/fixture.module';
import { FixtureEntity } from '@app/football-fixtures/db/entities/fixture.entity';
import { Repository } from 'typeorm';
import { SeasonEntity } from '@app/football-fixtures/db/entities/season.entity';
import { TeamEntity } from '@app/football-fixtures/db/entities/team.entity';
import { TournamentEntity } from '@app/football-fixtures/db/entities/tournament.entity';
import { VenueEntity } from '@app/football-fixtures/db/entities/venue.entity';
import { ScoreEntity } from '@app/football-fixtures/db/entities/score.entity';
import {
  mockRawFixtureData,
  mockRawScoreData,
  mockRawSeasonData,
  mockRawTeamData, mockRawTournamentData,
  mockRawVenueData,
} from '../mock/data/mock-raw-fixture.data';

describe('fixtures (integration)', () => {
  let server: ServerType;
  let request: RequestType;
  let fixtureRepo: Repository<FixtureEntity>;
  let seasonRepo: Repository<SeasonEntity>;
  let teamRepo: Repository<TeamEntity>;
  let tournamentRepo: Repository<TournamentEntity>;
  let venueRepo: Repository<VenueEntity>;
  let scoreRepo: Repository<ScoreEntity>;

  beforeAll(async () => {
    server = await generateMockServer([BaseModule, FixtureModule]);
    request = generateRequest(server);
    fixtureRepo = server.module.get(getRepository(FixtureEntity));
    seasonRepo = server.module.get(getRepository(SeasonEntity));
    teamRepo = server.module.get(getRepository(TeamEntity));
    tournamentRepo = server.module.get(getRepository(TournamentEntity));
    venueRepo = server.module.get(getRepository(VenueEntity));
    scoreRepo = server.module.get(getRepository(ScoreEntity));


    await clearDB(fixtureRepo);
  });

  afterAll(async () => {
    await server.app.close();
  });

  describe('Test', () => {
    beforeAll(async () => {
      // Insert season data
      await seasonRepo.insert(mockRawSeasonData);

      // Insert venue data
      await venueRepo.insert(mockRawVenueData);

      // Insert venue data
      await tournamentRepo.insert(mockRawTournamentData);

      // Insert venue data
      await scoreRepo.insert(mockRawScoreData);

      await wait(1000);

      // Insert team data
      for (const mock of mockRawTeamData) {
        const team = new TeamEntity();
        team.id = mock.id;
        team.logo = mock.logo;
        team.name = mock.name;
        team.code = mock.code;
        team.tournament = await tournamentRepo.findOneBy({ id: mock.tournamentId });
        await teamRepo.save(team);
      }

      await wait(2000);
      // Insert team data
      for (const rawData of mockRawFixtureData) {
        const fixture = new FixtureEntity();
        fixture.id = rawData.id;
        fixture.matchDate = rawData.matchDate;
        fixture.matchTime = rawData.matchTime;
        fixture.matchStatus = rawData.matchStatus;
        fixture.round = rawData.round;
        fixture.tournament = await tournamentRepo.findOneBy({ id: rawData.tournamentId });
        fixture.season = await seasonRepo.findOneBy({ id: rawData.seasonId });
        fixture.score = await scoreRepo.findOneBy({ id: rawData.scoreId });
        fixture.awayTeam = await teamRepo.findOneBy({ id: rawData.awayTeamId });
        fixture.homeTeam = await teamRepo.findOneBy({ id: rawData.homeTeamId });
        fixture.venue = await venueRepo.findOneBy({ id: rawData.venueId });
        await fixtureRepo.save(fixture);
      }
    });


    afterAll(async () => {
      await clearDB(fixtureRepo);
    });

    it('should return bad request error if startDate entered in the query params but there is no endDate', async () => {
      const res = await request.agent.get(`/fixtures`).query({
        startDate: "2023-05-06 00:00:00.000",
      });

      const result = res.body;
      expect(res.status).toEqual(400);
      expect(result.message).toBe("Both endDate and startDate must be required if one of them entered in the query.")
    });

    it('should return bad request error if the query ids over 20 items', async () => {
      const ids = [];
      for (let i = 0; i < 25; i++) {
        ids.push(i);
      }

      const res = await request.agent.get(`/fixtures`).query({
        ids: ids.join(','),
      });

      const result = res.body;
      expect(res.status).toEqual(400);
      expect(result.message).toEqual("List fixtures ids must be less than 20 ids.");
    });

    it('should return list of fixtures without any filters', async () => {
      const res = await request.agent.get(`/fixtures`);
      const result = res.body;
      const {data} = result;

      expect(data[0].id).toEqual(mockRawFixtureData[0].id);
      expect(data[0].matchTime).toEqual(mockRawFixtureData[0].matchTime);
      expect(data[0].round).toEqual(mockRawFixtureData[0].round);
      expect(data[0].score.id).toEqual(mockRawFixtureData[0].scoreId);
      expect(data[0].season.id).toEqual(mockRawFixtureData[0].seasonId);
      expect(data[0].venue.id).toEqual(mockRawFixtureData[0].venueId);
      expect(data[0].tournament.id).toEqual(mockRawFixtureData[0].tournamentId);
      expect(data[0].homeTeam.id).toEqual(mockRawFixtureData[0].homeTeamId);
      expect(data[0].awayTeam.id).toEqual(mockRawFixtureData[0].awayTeamId);

      expect(data[1].id).toEqual(mockRawFixtureData[1].id);
      expect(data[1].matchTime).toEqual(mockRawFixtureData[1].matchTime);
      expect(data[1].matchDate).toEqual(mockRawFixtureData[1].matchDate);
      expect(data[1].round).toEqual(mockRawFixtureData[1].round);
      expect(data[1].score.id).toEqual(mockRawFixtureData[1].scoreId);
      expect(data[1].season.id).toEqual(mockRawFixtureData[1].seasonId);
      expect(data[1].venue.id).toEqual(mockRawFixtureData[1].venueId);
      expect(data[1].tournament.id).toEqual(mockRawFixtureData[1].tournamentId);
      expect(data[1].homeTeam.id).toEqual(mockRawFixtureData[1].homeTeamId);
      expect(data[1].awayTeam.id).toEqual(mockRawFixtureData[1].awayTeamId);

      expect(data[2].id).toEqual(mockRawFixtureData[2].id);
      expect(data[2].matchTime).toEqual(mockRawFixtureData[2].matchTime);
      expect(data[2].matchDate).toEqual(mockRawFixtureData[2].matchDate);
      expect(data[2].round).toEqual(mockRawFixtureData[2].round);
      expect(data[2].score.id).toEqual(mockRawFixtureData[2].scoreId);
      expect(data[2].season.id).toEqual(mockRawFixtureData[2].seasonId);
      expect(data[2].venue.id).toEqual(mockRawFixtureData[2].venueId);
      expect(data[2].tournament.id).toEqual(mockRawFixtureData[2].tournamentId);
      expect(data[2].homeTeam.id).toEqual(mockRawFixtureData[2].homeTeamId);
      expect(data[2].awayTeam.id).toEqual(mockRawFixtureData[2].awayTeamId);

      expect(res.status).toBe(200);
      expect(data).toHaveLength(3);
      expect(result.total).toBe(3);
      expect(result.size).toBe(3);
      expect(result.currentPage).toBe(1);
      expect(result.lastPage).toBe(1);
      expect(result.nextPage).toBeNull();
      expect(result.prevPage).toBeNull();
    });

    it('should return list of fixtures with paging (size=1 and page=1)', async () => {
      const res = await request.agent.get(`/fixtures`).query({
        size: 1,
        page: 1
      });
      const result = res.body;
      const {data} = result;

      expect(data[0].id).toEqual(mockRawFixtureData[0].id);
      expect(data[0].matchTime).toEqual(mockRawFixtureData[0].matchTime);
      expect(data[0].round).toEqual(mockRawFixtureData[0].round);
      expect(data[0].score.id).toEqual(mockRawFixtureData[0].scoreId);
      expect(data[0].season.id).toEqual(mockRawFixtureData[0].seasonId);
      expect(data[0].venue.id).toEqual(mockRawFixtureData[0].venueId);
      expect(data[0].tournament.id).toEqual(mockRawFixtureData[0].tournamentId);
      expect(data[0].homeTeam.id).toEqual(mockRawFixtureData[0].homeTeamId);
      expect(data[0].awayTeam.id).toEqual(mockRawFixtureData[0].awayTeamId);

      expect(res.status).toBe(200);
      expect(data).toHaveLength(1);
      expect(result.total).toBe(3);
      expect(result.size).toBe(1);
      expect(result.currentPage).toBe(1);
      expect(result.lastPage).toBe(3);
      expect(result.nextPage).toBe(2);
      expect(result.prevPage).toBeNull();
    });

    it('should return list of fixtures based on team filter', async () => {
      const res = await request.agent.get(`/fixtures`).query({
        team: '4bba27fa-6070-4b24-8f0d-d6681395344e'
      });
      const result = res.body;
      const {data} = result;

      expect(data[0].id).toEqual(mockRawFixtureData[0].id);
      expect(data[0].matchTime).toEqual(mockRawFixtureData[0].matchTime);
      expect(data[0].round).toEqual(mockRawFixtureData[0].round);
      expect(data[0].score.id).toEqual(mockRawFixtureData[0].scoreId);
      expect(data[0].season.id).toEqual(mockRawFixtureData[0].seasonId);
      expect(data[0].venue.id).toEqual(mockRawFixtureData[0].venueId);
      expect(data[0].tournament.id).toEqual(mockRawFixtureData[0].tournamentId);
      expect(data[0].homeTeam.id).toEqual(mockRawFixtureData[0].homeTeamId);
      expect(data[0].awayTeam.id).toEqual(mockRawFixtureData[0].awayTeamId);

      expect(res.status).toBe(200);
      expect(data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.size).toBe(1);
      expect(result.currentPage).toBe(1);
      expect(result.lastPage).toBe(1);
      expect(result.nextPage).toBeNull();
      expect(result.prevPage).toBeNull();
    });

    it('should return list of fixtures based on season filter', async () => {
      const res = await request.agent.get(`/fixtures`).query({
        season: "19f6bcd5-e9ca-4d04-8281-e76a5152b9c4"
      });
      const result = res.body;
      const {data} = result;

      expect(data[0].id).toEqual(mockRawFixtureData[0].id);
      expect(data[0].matchTime).toEqual(mockRawFixtureData[0].matchTime);
      expect(data[0].round).toEqual(mockRawFixtureData[0].round);
      expect(data[0].score.id).toEqual(mockRawFixtureData[0].scoreId);
      expect(data[0].season.id).toEqual(mockRawFixtureData[0].seasonId);
      expect(data[0].venue.id).toEqual(mockRawFixtureData[0].venueId);
      expect(data[0].tournament.id).toEqual(mockRawFixtureData[0].tournamentId);
      expect(data[0].homeTeam.id).toEqual(mockRawFixtureData[0].homeTeamId);
      expect(data[0].awayTeam.id).toEqual(mockRawFixtureData[0].awayTeamId);

      expect(data[1].id).toEqual(mockRawFixtureData[1].id);
      expect(data[1].matchTime).toEqual(mockRawFixtureData[1].matchTime);
      expect(data[1].matchDate).toEqual(mockRawFixtureData[1].matchDate);
      expect(data[1].round).toEqual(mockRawFixtureData[1].round);
      expect(data[1].score.id).toEqual(mockRawFixtureData[1].scoreId);
      expect(data[1].season.id).toEqual(mockRawFixtureData[1].seasonId);
      expect(data[1].venue.id).toEqual(mockRawFixtureData[1].venueId);
      expect(data[1].tournament.id).toEqual(mockRawFixtureData[1].tournamentId);
      expect(data[1].homeTeam.id).toEqual(mockRawFixtureData[1].homeTeamId);
      expect(data[1].awayTeam.id).toEqual(mockRawFixtureData[1].awayTeamId);

      expect(data[2].id).toEqual(mockRawFixtureData[2].id);
      expect(data[2].matchTime).toEqual(mockRawFixtureData[2].matchTime);
      expect(data[2].matchDate).toEqual(mockRawFixtureData[2].matchDate);
      expect(data[2].round).toEqual(mockRawFixtureData[2].round);
      expect(data[2].score.id).toEqual(mockRawFixtureData[2].scoreId);
      expect(data[2].season.id).toEqual(mockRawFixtureData[2].seasonId);
      expect(data[2].venue.id).toEqual(mockRawFixtureData[2].venueId);
      expect(data[2].tournament.id).toEqual(mockRawFixtureData[2].tournamentId);
      expect(data[2].homeTeam.id).toEqual(mockRawFixtureData[2].homeTeamId);
      expect(data[2].awayTeam.id).toEqual(mockRawFixtureData[2].awayTeamId);

      expect(res.status).toBe(200);
      expect(data).toHaveLength(3);
      expect(result.total).toBe(3);
      expect(result.size).toBe(3);
      expect(result.currentPage).toBe(1);
      expect(result.lastPage).toBe(1);
      expect(result.nextPage).toBeNull();
      expect(result.prevPage).toBeNull();
    });

    it('should return list of fixtures based on venue filter', async () => {
      const res = await request.agent.get(`/fixtures`).query({
        venue: "6aafaa29-0f7f-4cbd-810a-21ca8760d6cc"
      });
      const result = res.body;
      const {data} = result;

      expect(data[0].id).toEqual(mockRawFixtureData[1].id);
      expect(data[0].matchTime).toEqual(mockRawFixtureData[1].matchTime);
      expect(data[0].matchDate).toEqual(mockRawFixtureData[1].matchDate);
      expect(data[0].round).toEqual(mockRawFixtureData[1].round);
      expect(data[0].score.id).toEqual(mockRawFixtureData[1].scoreId);
      expect(data[0].season.id).toEqual(mockRawFixtureData[1].seasonId);
      expect(data[0].venue.id).toEqual(mockRawFixtureData[1].venueId);
      expect(data[0].tournament.id).toEqual(mockRawFixtureData[1].tournamentId);
      expect(data[0].homeTeam.id).toEqual(mockRawFixtureData[1].homeTeamId);
      expect(data[0].awayTeam.id).toEqual(mockRawFixtureData[1].awayTeamId);

      expect(res.status).toBe(200);
      expect(data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.size).toBe(1);
      expect(result.currentPage).toBe(1);
      expect(result.lastPage).toBe(1);
      expect(result.nextPage).toBeNull();
      expect(result.prevPage).toBeNull();
    });

    it('should return list of fixtures based on tournament filter', async () => {
      const res = await request.agent.get(`/fixtures`).query({
        tournament: "d515952f-aac5-49d8-8d3c-5b488e6c4988"
      });
      const result = res.body;
      const {data} = result;

      expect(data[0].id).toEqual(mockRawFixtureData[2].id);
      expect(data[0].matchTime).toEqual(mockRawFixtureData[2].matchTime);
      expect(data[0].matchDate).toEqual(mockRawFixtureData[2].matchDate);
      expect(data[0].round).toEqual(mockRawFixtureData[2].round);
      expect(data[0].score.id).toEqual(mockRawFixtureData[2].scoreId);
      expect(data[0].season.id).toEqual(mockRawFixtureData[2].seasonId);
      expect(data[0].venue.id).toEqual(mockRawFixtureData[2].venueId);
      expect(data[0].tournament.id).toEqual(mockRawFixtureData[2].tournamentId);
      expect(data[0].homeTeam.id).toEqual(mockRawFixtureData[2].homeTeamId);
      expect(data[0].awayTeam.id).toEqual(mockRawFixtureData[2].awayTeamId);

      expect(res.status).toBe(200);
      expect(data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.size).toBe(1);
      expect(result.currentPage).toBe(1);
      expect(result.lastPage).toBe(1);
      expect(result.nextPage).toBeNull();
      expect(result.prevPage).toBeNull();
    });

    it('should return list of fixtures based on round filter', async () => {
      const res = await request.agent.get(`/fixtures`).query({
        round: 38
      });
      const result = res.body;
      const {data} = result;

      expect(data[0].id).toEqual(mockRawFixtureData[0].id);
      expect(data[0].matchTime).toEqual(mockRawFixtureData[0].matchTime);
      expect(data[0].matchDate).toEqual(mockRawFixtureData[0].matchDate);
      expect(data[0].round).toEqual(mockRawFixtureData[0].round);
      expect(data[0].score.id).toEqual(mockRawFixtureData[0].scoreId);
      expect(data[0].season.id).toEqual(mockRawFixtureData[0].seasonId);
      expect(data[0].venue.id).toEqual(mockRawFixtureData[0].venueId);
      expect(data[0].tournament.id).toEqual(mockRawFixtureData[0].tournamentId);
      expect(data[0].homeTeam.id).toEqual(mockRawFixtureData[0].homeTeamId);
      expect(data[0].awayTeam.id).toEqual(mockRawFixtureData[0].awayTeamId);

      expect(res.status).toBe(200);
      expect(data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.size).toBe(1);
      expect(result.currentPage).toBe(1);
      expect(result.lastPage).toBe(1);
      expect(result.nextPage).toBeNull();
      expect(result.prevPage).toBeNull();
    });

    it('should return list of fixtures based on id filter', async () => {
      const res = await request.agent.get(`/fixtures`).query({
        id: "facb82ee-b1bf-48a0-a987-58ce61e64c52"
      });
      const result = res.body;
      const {data} = result;

      expect(data[0].id).toEqual(mockRawFixtureData[0].id);
      expect(data[0].matchTime).toEqual(mockRawFixtureData[0].matchTime);
      expect(data[0].matchDate).toEqual(mockRawFixtureData[0].matchDate);
      expect(data[0].round).toEqual(mockRawFixtureData[0].round);
      expect(data[0].score.id).toEqual(mockRawFixtureData[0].scoreId);
      expect(data[0].season.id).toEqual(mockRawFixtureData[0].seasonId);
      expect(data[0].venue.id).toEqual(mockRawFixtureData[0].venueId);
      expect(data[0].tournament.id).toEqual(mockRawFixtureData[0].tournamentId);
      expect(data[0].homeTeam.id).toEqual(mockRawFixtureData[0].homeTeamId);
      expect(data[0].awayTeam.id).toEqual(mockRawFixtureData[0].awayTeamId);

      expect(res.status).toBe(200);
      expect(data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.size).toBe(1);
      expect(result.currentPage).toBe(1);
      expect(result.lastPage).toBe(1);
      expect(result.nextPage).toBeNull();
      expect(result.prevPage).toBeNull();
    });

    it('should return list of fixtures based on multiple ids filters', async () => {
      const res = await request.agent.get(`/fixtures`).query({
        ids: "facb82ee-b1bf-48a0-a987-58ce61e64c52, 3dd58074-2af8-4ac3-b74a-4e6e03b1a836"
      });
      const result = res.body;
      const {data} = result;

      expect(data[0].id).toEqual(mockRawFixtureData[0].id);
      expect(data[0].matchTime).toEqual(mockRawFixtureData[0].matchTime);
      expect(data[0].round).toEqual(mockRawFixtureData[0].round);
      expect(data[0].score.id).toEqual(mockRawFixtureData[0].scoreId);
      expect(data[0].season.id).toEqual(mockRawFixtureData[0].seasonId);
      expect(data[0].venue.id).toEqual(mockRawFixtureData[0].venueId);
      expect(data[0].tournament.id).toEqual(mockRawFixtureData[0].tournamentId);
      expect(data[0].homeTeam.id).toEqual(mockRawFixtureData[0].homeTeamId);
      expect(data[0].awayTeam.id).toEqual(mockRawFixtureData[0].awayTeamId);

      expect(data[1].id).toEqual(mockRawFixtureData[1].id);
      expect(data[1].matchTime).toEqual(mockRawFixtureData[1].matchTime);
      expect(data[1].matchDate).toEqual(mockRawFixtureData[1].matchDate);
      expect(data[1].round).toEqual(mockRawFixtureData[1].round);
      expect(data[1].score.id).toEqual(mockRawFixtureData[1].scoreId);
      expect(data[1].season.id).toEqual(mockRawFixtureData[1].seasonId);
      expect(data[1].venue.id).toEqual(mockRawFixtureData[1].venueId);
      expect(data[1].tournament.id).toEqual(mockRawFixtureData[1].tournamentId);
      expect(data[1].homeTeam.id).toEqual(mockRawFixtureData[1].homeTeamId);
      expect(data[1].awayTeam.id).toEqual(mockRawFixtureData[1].awayTeamId);

      expect(res.status).toBe(200);
      expect(data).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.size).toBe(2);
      expect(result.currentPage).toBe(1);
      expect(result.lastPage).toBe(1);
      expect(result.nextPage).toBeNull();
      expect(result.prevPage).toBeNull();
    });

    it('should return list of fixtures based on status filters', async () => {
      const res = await request.agent.get(`/fixtures`).query({
        status: "IN-MATCH"
      });
      const result = res.body;
      const {data} = result;


      expect(data[0].id).toEqual(mockRawFixtureData[1].id);
      expect(data[0].matchTime).toEqual(mockRawFixtureData[1].matchTime);
      expect(data[0].matchDate).toEqual(mockRawFixtureData[1].matchDate);
      expect(data[0].round).toEqual(mockRawFixtureData[1].round);
      expect(data[0].score.id).toEqual(mockRawFixtureData[1].scoreId);
      expect(data[0].season.id).toEqual(mockRawFixtureData[1].seasonId);
      expect(data[0].venue.id).toEqual(mockRawFixtureData[1].venueId);
      expect(data[0].tournament.id).toEqual(mockRawFixtureData[1].tournamentId);
      expect(data[0].homeTeam.id).toEqual(mockRawFixtureData[1].homeTeamId);
      expect(data[0].awayTeam.id).toEqual(mockRawFixtureData[1].awayTeamId);

      expect(res.status).toBe(200);
      expect(data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.size).toBe(1);
      expect(result.currentPage).toBe(1);
      expect(result.lastPage).toBe(1);
      expect(result.nextPage).toBeNull();
      expect(result.prevPage).toBeNull();
    });

    it('should return list of fixtures between startDate and endDate filters', async () => {
      const res = await request.agent.get(`/fixtures`).query({
        startDate: "2023-05-04T00:00:00.000Z",
        endDate: "2023-05-05T00:00:00.000Z"
      });
      const result = res.body;
      const {data} = result;


      expect(data[0].id).toEqual(mockRawFixtureData[1].id);
      expect(data[0].matchTime).toEqual(mockRawFixtureData[1].matchTime);
      expect(data[0].matchDate).toEqual(mockRawFixtureData[1].matchDate);
      expect(data[0].round).toEqual(mockRawFixtureData[1].round);
      expect(data[0].score.id).toEqual(mockRawFixtureData[1].scoreId);
      expect(data[0].season.id).toEqual(mockRawFixtureData[1].seasonId);
      expect(data[0].venue.id).toEqual(mockRawFixtureData[1].venueId);
      expect(data[0].tournament.id).toEqual(mockRawFixtureData[1].tournamentId);
      expect(data[0].homeTeam.id).toEqual(mockRawFixtureData[1].homeTeamId);
      expect(data[0].awayTeam.id).toEqual(mockRawFixtureData[1].awayTeamId);

      expect(data[1].id).toEqual(mockRawFixtureData[2].id);
      expect(data[1].matchTime).toEqual(mockRawFixtureData[2].matchTime);
      expect(data[1].matchDate).toEqual(mockRawFixtureData[2].matchDate);
      expect(data[1].round).toEqual(mockRawFixtureData[2].round);
      expect(data[1].score.id).toEqual(mockRawFixtureData[2].scoreId);
      expect(data[1].season.id).toEqual(mockRawFixtureData[2].seasonId);
      expect(data[1].venue.id).toEqual(mockRawFixtureData[2].venueId);
      expect(data[1].tournament.id).toEqual(mockRawFixtureData[2].tournamentId);
      expect(data[1].homeTeam.id).toEqual(mockRawFixtureData[2].homeTeamId);
      expect(data[1].awayTeam.id).toEqual(mockRawFixtureData[2].awayTeamId);

      expect(res.status).toBe(200);
      expect(data).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.size).toBe(2);
      expect(result.currentPage).toBe(1);
      expect(result.lastPage).toBe(1);
      expect(result.nextPage).toBeNull();
      expect(result.prevPage).toBeNull();
    });

    it('should return list of fixtures based on multiple filters', async () => {
      const res = await request.agent.get(`/fixtures`).query({
        matchDate: "2023-05-04T00:00:00.000Z",
      });
      const result = res.body;
      const {data} = result;

      expect(data[0].id).toEqual(mockRawFixtureData[2].id);
      expect(data[0].matchTime).toEqual(mockRawFixtureData[2].matchTime);
      expect(data[0].matchDate).toEqual(mockRawFixtureData[2].matchDate);
      expect(data[0].round).toEqual(mockRawFixtureData[2].round);
      expect(data[0].score.id).toEqual(mockRawFixtureData[2].scoreId);
      expect(data[0].season.id).toEqual(mockRawFixtureData[2].seasonId);
      expect(data[0].venue.id).toEqual(mockRawFixtureData[2].venueId);
      expect(data[0].tournament.id).toEqual(mockRawFixtureData[2].tournamentId);
      expect(data[0].homeTeam.id).toEqual(mockRawFixtureData[2].homeTeamId);
      expect(data[0].awayTeam.id).toEqual(mockRawFixtureData[2].awayTeamId);

      expect(res.status).toBe(200);
      expect(data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.size).toBe(1);
      expect(result.currentPage).toBe(1);
      expect(result.lastPage).toBe(1);
      expect(result.nextPage).toBeNull();
      expect(result.prevPage).toBeNull();
    });

    it('should return list of fixtures based on matchDate filters', async () => {
      const res = await request.agent.get(`/fixtures`).query({
        tournament: "3532d4de-7090-49e9-8785-b003cf17138a",
        page: 1,
        size: 1
      });
      const result = res.body;
      const {data} = result;

      expect(data[0].id).toEqual(mockRawFixtureData[0].id);
      expect(data[0].matchTime).toEqual(mockRawFixtureData[0].matchTime);
      expect(data[0].matchDate).toEqual(mockRawFixtureData[0].matchDate);
      expect(data[0].round).toEqual(mockRawFixtureData[0].round);
      expect(data[0].score.id).toEqual(mockRawFixtureData[0].scoreId);
      expect(data[0].season.id).toEqual(mockRawFixtureData[0].seasonId);
      expect(data[0].venue.id).toEqual(mockRawFixtureData[0].venueId);
      expect(data[0].tournament.id).toEqual(mockRawFixtureData[0].tournamentId);
      expect(data[0].homeTeam.id).toEqual(mockRawFixtureData[0].homeTeamId);
      expect(data[0].awayTeam.id).toEqual(mockRawFixtureData[0].awayTeamId);

      expect(res.status).toBe(200);
      expect(data).toHaveLength(1);
      expect(result.total).toBe(2);
      expect(result.size).toBe(1);
      expect(result.currentPage).toBe(1);
      expect(result.lastPage).toBe(2);
      expect(result.nextPage).toBe(2);
      expect(result.prevPage).toBeNull();
    });
  });
});
