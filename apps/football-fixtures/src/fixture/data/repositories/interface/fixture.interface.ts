import { BaseRepositoryInterface } from '@app/common/repository/base-repository.interface';
import { FixtureEntity } from '@app/football-fixtures/db/entities/fixture.entity';

export interface FixtureInterface extends BaseRepositoryInterface<FixtureEntity> {
  getAllFixture(filters: any): Promise<any[]>;
}
