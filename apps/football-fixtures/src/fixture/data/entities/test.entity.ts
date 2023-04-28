import { BaseEntity } from '@app/common/enitities';
import { Entity } from 'typeorm';

@Entity({name: 'test'})
export class TestEntity extends BaseEntity {}