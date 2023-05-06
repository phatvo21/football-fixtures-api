import { BaseEntity } from '@app/common/enitities';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'season' })
export class SeasonEntity extends BaseEntity {
  @Column()
  name!: number;
}
