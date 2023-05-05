import { FixtureEntity } from '@app/football-fixtures/db/entities/fixture.entity';
import { ScoreEntity } from '@app/football-fixtures/db/entities/score.entity';
import { SeasonEntity } from '@app/football-fixtures/db/entities/season.entity';
import { TeamEntity } from '@app/football-fixtures/db/entities/team.entity';
import { TestEntity } from '@app/football-fixtures/db/entities/test.entity';
import { TournamentEntity } from '@app/football-fixtures/db/entities/tournament.entity';
import { VenueEntity } from '@app/football-fixtures/db/entities/venue.entity';
import { TestRepository } from '@app/football-fixtures/fixture/data/repositories/test.repository';
import { TestController } from '@app/football-fixtures/fixture/test.controller';
import { TestService } from '@app/football-fixtures/fixture/test.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity, TournamentEntity, ScoreEntity, VenueEntity, TeamEntity, SeasonEntity, FixtureEntity])],
  providers: [
    {
      provide: 'TestInterface',
      useClass: TestRepository
    },
    TestService
  ],
  controllers: [TestController]
})
export class FixtureModule {}