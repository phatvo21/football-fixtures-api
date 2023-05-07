import { FixtureEntity } from '@app/football-fixtures/db/entities/fixture.entity';
import { ScoreEntity } from '@app/football-fixtures/db/entities/score.entity';
import { SeasonEntity } from '@app/football-fixtures/db/entities/season.entity';
import { TeamEntity } from '@app/football-fixtures/db/entities/team.entity';
import { TournamentEntity } from '@app/football-fixtures/db/entities/tournament.entity';
import { VenueEntity } from '@app/football-fixtures/db/entities/venue.entity';
import { fixtureSeedData } from '@app/football-fixtures/db/factories/data/fixture';
import { scoreSeedData } from '@app/football-fixtures/db/factories/data/score';
import { seasonSeedData } from '@app/football-fixtures/db/factories/data/season';
import { teamSeedData } from '@app/football-fixtures/db/factories/data/team';
import { tournamentSeedData } from '@app/football-fixtures/db/factories/data/tournament';
import { venueSeedData } from '@app/football-fixtures/db/factories/data/venue';
import { DataSource, Repository } from 'typeorm';
import { Seeder } from 'typeorm-extension';

/**
 * Class extends the Seeder class from typeorm-extension
 * This aims to run all the seeds data at once
 */
export default class InitializedSeeder implements Seeder {
  /**
   * Indicates all the seeds data for the tables will be generated here at once.
   * @param {DataSource} dataSource - The source of data where seeds will be stored, which is Mysql database
   */
  public async run(dataSource: DataSource): Promise<any> {
    // Seeding data for Season table
    const seasonRepository: Repository<SeasonEntity> = dataSource.getRepository(SeasonEntity);
    await seasonRepository.insert(seasonSeedData);

    // Seeding data for Tournament table
    const tournamentRepository: Repository<TournamentEntity> = dataSource.getRepository(TournamentEntity);
    await tournamentRepository.insert(tournamentSeedData);

    // Seeding data for Venue table
    const venueRepository: Repository<VenueEntity> = dataSource.getRepository(VenueEntity);
    await venueRepository.insert(venueSeedData);

    // Seeding data for Score table
    const scoreRepository: Repository<ScoreEntity> = dataSource.getRepository(ScoreEntity);
    await scoreRepository.insert(scoreSeedData);

    // Seeding data for Team table
    const teamRepository: Repository<TeamEntity> = dataSource.getRepository(TeamEntity);
    for (const seed of teamSeedData) {
      const team = new TeamEntity();
      team.id = seed.id;
      team.logo = seed.logo;
      team.name = seed.name;
      team.code = seed.code;
      team.tournament = await tournamentRepository.findOneBy({ id: seed.tournamentId });
      await teamRepository.save(team);
    }

    // Seeding data for Fixture table
    const fixtureRepository: Repository<FixtureEntity> = dataSource.getRepository(FixtureEntity);
    for (const seed of fixtureSeedData) {
      const fixture = new FixtureEntity();
      fixture.id = seed.id;
      fixture.matchDate = seed.matchDate as unknown as Date;
      fixture.matchTime = seed.matchTime;
      fixture.matchStatus = seed.matchStatus;
      fixture.round = seed.round;
      fixture.tournament = await tournamentRepository.findOneBy({ id: seed.tournamentId });
      fixture.season = await seasonRepository.findOneBy({ id: seed.seasonId });
      fixture.score = await scoreRepository.findOneBy({ id: seed.scoreId });
      fixture.awayTeam = await teamRepository.findOneBy({ id: seed.awayTeamId });
      fixture.homeTeam = await teamRepository.findOneBy({ id: seed.homeTeamId });
      fixture.venue = await venueRepository.findOneBy({ id: seed.venueId });
      await fixtureRepository.save(fixture);
    }
  }
}
