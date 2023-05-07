import { FixtureEntity } from '@app/football-fixtures/db/entities/fixture.entity';

export interface FixtureDataResponse {
  data: FixtureEntity[];
  total: number;
  currentPage: number;
  size: number;
  lastPage: number;
  nextPage: number;
  prevPage: number;
}
