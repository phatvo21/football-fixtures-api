import { BaseEntity } from '@app/common/enitities';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tournaments' })
export class TournamentEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  country!: string;
}
