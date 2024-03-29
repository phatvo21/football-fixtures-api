import { BaseEntity } from '@app/common/enitities';
import { TournamentEntity } from '@app/football-fixtures/db/entities/tournament.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'teams' })
export class TeamEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  code!: string;

  @Column()
  logo!: string;

  @OneToOne(() => TournamentEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tournamentId' })
  tournament: TournamentEntity;
}
