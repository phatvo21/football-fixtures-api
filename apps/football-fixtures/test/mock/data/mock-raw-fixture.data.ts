import { teamSeedData } from '@app/football-fixtures/db/factories/data/team';
import { scoreSeedData } from '@app/football-fixtures/db/factories/data/score';
import { venueSeedData } from '@app/football-fixtures/db/factories/data/venue';
import { seasonSeedData } from '@app/football-fixtures/db/factories/data/season';
import { tournamentSeedData } from '@app/football-fixtures/db/factories/data/tournament';
import { FixtureStatusEnum } from '@app/football-fixtures/db/entities/enum/fixture-status.enum';

export const mockRawFixtureData = [
  {
    id: 'facb82ee-b1bf-48a0-a987-58ce61e64c52',
    matchStatus: FixtureStatusEnum.NEW,
    matchDate: '2023-05-06T00:00:00.000Z',
    matchTime: '17:40',
    seasonId: seasonSeedData[12].id,
    round: 38,
    tournamentId: tournamentSeedData[0].id,
    venueId: venueSeedData[5].id,
    scoreId: scoreSeedData[3].id,
    homeTeamId: teamSeedData[2].id,
    awayTeamId: teamSeedData[3].id,
  },
  {
    id: '3dd58074-2af8-4ac3-b74a-4e6e03b1a836',
    matchStatus: FixtureStatusEnum.IN_MATCH,
    matchDate: '2023-05-05T00:00:00.000Z',
    matchTime: '09:04',
    round: 35,
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[0].id,
    venueId: venueSeedData[0].id,
    scoreId: scoreSeedData[0].id,
    homeTeamId: teamSeedData[0].id,
    awayTeamId: teamSeedData[1].id,
  },
  {
    id: '76db57b7-bdd6-470e-b0e8-f3eb8edac9ed',
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDate: '2023-05-04T00:00:00.000Z',
    matchTime: '17:40',
    seasonId: seasonSeedData[12].id,
    round: 30,
    tournamentId: tournamentSeedData[2].id,
    venueId: venueSeedData[11].id,
    scoreId: scoreSeedData[10].id,
    homeTeamId: teamSeedData[22].id,
    awayTeamId: teamSeedData[23].id,
  },
]

export const mockRawTeamData = teamSeedData;
export const mockRawScoreData = scoreSeedData;
export const mockRawVenueData = venueSeedData;
export const mockRawSeasonData = seasonSeedData;
export const mockRawTournamentData = tournamentSeedData;