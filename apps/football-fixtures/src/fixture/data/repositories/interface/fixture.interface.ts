import { BaseRepositoryInterface } from '@app/common/repository/base-repository.interface';
import { FixtureEntity } from '@app/football-fixtures/db/entities/fixture.entity';
import { FixtureDataResponse } from '@app/football-fixtures/fixture/interfaces/fixture-data.response';
import { FixtureEnabledMatchesResponse } from '@app/football-fixtures/fixture/interfaces/fixture-enabled-matches-data.response';
import { FixtureQueryFilter } from '@app/football-fixtures/fixture/interfaces/fixture-query.filter.interface';

export interface FixtureInterface extends BaseRepositoryInterface<FixtureEntity> {
  getAllFixture(filters: FixtureQueryFilter): Promise<FixtureDataResponse>;

  getAllEnabledMatches(filters: FixtureQueryFilter): Promise<FixtureEnabledMatchesResponse>;
}
