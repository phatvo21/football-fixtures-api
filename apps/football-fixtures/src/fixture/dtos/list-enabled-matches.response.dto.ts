import {
  FixtureEnabledMatchesResponse,
  FixtureMatches,
} from '@app/football-fixtures/fixture/interfaces/fixture-enabled-matches-data.response';

export class ListEnabledMatchesResponseDto implements FixtureEnabledMatchesResponse {
  enabledMatchDates: FixtureMatchesDto[];
}

export class FixtureMatchesDto implements FixtureMatches {
  matchDate: Date;

  numberOfMatches: number;
}
