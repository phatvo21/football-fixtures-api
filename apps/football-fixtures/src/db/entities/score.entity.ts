import { BaseEntity } from '@app/common/enitities';
import { Column, Entity } from 'typeorm';

@Entity({name: 'score'})
export class ScoreEntity extends BaseEntity {
  @Column()
  homeTeamScore!: number

  @Column()
  awayTeamScore!: number
}