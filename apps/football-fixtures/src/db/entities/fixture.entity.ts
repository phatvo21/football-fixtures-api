import { BaseEntity } from '@app/common/enitities';
import { FixtureStatusEnum } from '@app/football-fixtures/db/entities/enum/fixture-status.enum';
import { ScoreEntity } from '@app/football-fixtures/db/entities/score.entity';
import { SeasonEntity } from '@app/football-fixtures/db/entities/season.entity';
import { TeamEntity } from '@app/football-fixtures/db/entities/team.entity';
import { TournamentEntity } from '@app/football-fixtures/db/entities/tournament.entity';
import { VenueEntity } from '@app/football-fixtures/db/entities/venue.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'fixture' })
export class FixtureEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: FixtureStatusEnum,
  })
  matchStatus!: FixtureStatusEnum;

  @CreateDateColumn()
  round!: number;

  @Column()
  matchDate!: Date;

  @Column()
  matchTime!: string;

  @OneToOne(() => SeasonEntity, { cascade: true })
  @JoinColumn({ name: 'seasonId' })
  season: SeasonEntity;

  @OneToOne(() => TournamentEntity, { cascade: true })
  @JoinColumn({ name: 'tournamentId' })
  tournament: TournamentEntity;

  @OneToOne(() => VenueEntity, { cascade: true })
  @JoinColumn({ name: 'venueId' })
  venue: VenueEntity;

  @OneToOne(() => ScoreEntity, { cascade: true })
  @JoinColumn({ name: 'scoreId' })
  score: ScoreEntity;

  @OneToOne(() => TeamEntity, { cascade: true })
  @JoinColumn({ name: 'homeTeamId' })
  homeTeam: TeamEntity;

  @OneToOne(() => TeamEntity, { cascade: true })
  @JoinColumn({ name: 'awayTeamId' })
  awayTeam: TeamEntity;
}
