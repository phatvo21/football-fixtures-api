import { FixtureEntity } from '@app/football-fixtures/db/entities/fixture.entity';
import { ScoreEntity } from '@app/football-fixtures/db/entities/score.entity';
import { SeasonEntity } from '@app/football-fixtures/db/entities/season.entity';
import { TeamEntity } from '@app/football-fixtures/db/entities/team.entity';
import { TournamentEntity } from '@app/football-fixtures/db/entities/tournament.entity';
import { VenueEntity } from '@app/football-fixtures/db/entities/venue.entity';
import { FixtureRepository } from '@app/football-fixtures/fixture/data/repositories/fixture.repository';
import { FixtureController } from '@app/football-fixtures/fixture/fixture.controller';
import { FixtureService } from '@app/football-fixtures/fixture/fixture.service';
import { FixtureCalendarController } from '@app/football-fixtures/fixture/fixture-calendar.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TournamentEntity, ScoreEntity, VenueEntity, TeamEntity, SeasonEntity, FixtureEntity]),
  ],
  providers: [
    {
      provide: 'FixtureInterface',
      useClass: FixtureRepository,
    },
    FixtureService,
  ],
  controllers: [FixtureController, FixtureCalendarController],
})
export class FixtureModule {}
