import { FixtureStatusEnum } from '@app/football-fixtures/db/entities/enum/fixture-status.enum';

export interface FixtureQueryFilter {
  id?: string;
  ids?: string;
  tournament?: string;
  season?: string;
  round?: any;
  team?: string;
  status?: FixtureStatusEnum;
  venue?: string;
  matchDate?: string;
  startDate?: string;
  endDate?: string;
  page?: any;
  size?: any;
}
