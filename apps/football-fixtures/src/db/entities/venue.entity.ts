import { BaseEntity } from '@app/common/enitities';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'venues' })
export class VenueEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  city!: string;

  @Column()
  country!: string;
}
