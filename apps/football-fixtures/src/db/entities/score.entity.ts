import { BaseEntity } from '@app/common/enitities';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'scores' })
export class ScoreEntity extends BaseEntity {
  @Column()
  homeTeamScore!: number;

  @Column()
  awayTeamScore!: number;
}
