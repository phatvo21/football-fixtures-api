import { BaseEntity } from '@app/common/enitities';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'seasons' })
export class SeasonEntity extends BaseEntity {
  @Column()
  name!: number;
}
