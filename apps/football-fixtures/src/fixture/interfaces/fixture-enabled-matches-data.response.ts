export interface FixtureEnabledMatchesResponse {
  enabledMatchDates: FixtureMatches[];
}

export interface FixtureMatches {
  matchDate: Date;
  numberOfMatches: number;
}
