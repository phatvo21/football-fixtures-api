import { FixtureEntity } from '@app/football-fixtures/db/entities/fixture.entity';
import { FixtureDataResponse } from '@app/football-fixtures/fixture/interfaces/fixture-data.response';

export class ListFixtureResponseDto implements FixtureDataResponse {
  data: FixtureEntity[];

  total: number;

  currentPage: number;

  size: number;

  lastPage: number;

  nextPage: number;

  prevPage: number;
}
