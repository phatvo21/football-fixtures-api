import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource, Repository } from 'typeorm';
import { TournamentEntity } from '@app/football-fixtures/db/entities/tournament.entity';
import { SeasonEntity } from '@app/football-fixtures/db/entities/season.entity';
import { VenueEntity } from '@app/football-fixtures/db/entities/venue.entity';
import { ScoreEntity } from '@app/football-fixtures/db/entities/score.entity';
import { TeamEntity } from '@app/football-fixtures/db/entities/team.entity';
import { FixtureEntity } from '@app/football-fixtures/db/entities/fixture.entity';
import { seasonSeedData } from '@app/football-fixtures/db/factories/data/season';
import { tournamentSeedData } from '@app/football-fixtures/db/factories/data/tournament';
import { venueSeedData } from '@app/football-fixtures/db/factories/data/venue';
import { scoreSeedData } from '@app/football-fixtures/db/factories/data/score';
import { teamSeedData } from '@app/football-fixtures/db/factories/data/team';
import { fixtureSeedData } from '@app/football-fixtures/db/factories/data/fixture';

export default class TournamentSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
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
    await teamRepository.insert(teamSeedData);


    // Seeding data for Fixture table
    const fixtureRepository: Repository<FixtureEntity> = dataSource.getRepository(FixtureEntity);
    await fixtureRepository.insert(fixtureSeedData);
  }
}