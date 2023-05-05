import { BaseRepository } from '@app/common/repository';
import { TestEntity } from '@app/football-fixtures/db/entities/test.entity';
import { TestInterface } from '@app/football-fixtures/fixture/data/repositories/interface/test.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TestRepository extends BaseRepository<TestEntity> implements TestInterface {
  constructor(@InjectRepository(TestEntity) private readonly testRepo: Repository<TestEntity>) {
    super(testRepo);
  }
}