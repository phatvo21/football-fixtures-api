import { FixtureStatusEnum } from '@app/football-fixtures/db/entities/enum/fixture-status.enum';
import { seasonSeedData } from '@app/football-fixtures/db/factories/data/season';
import { tournamentSeedData } from '@app/football-fixtures/db/factories/data/tournament';
import { venueSeedData } from '@app/football-fixtures/db/factories/data/venue';
import { scoreSeedData } from '@app/football-fixtures/db/factories/data/score';
import { teamSeedData } from '@app/football-fixtures/db/factories/data/team';

export const fixtureSeedData = [
  {
    id: "3dd58074-2af8-4ac3-b74a-4e6e03b1a836",
    matchStatus: FixtureStatusEnum.IN_MATCH,
    matchDateTime: "2023-05-05 09:04:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[0].id,
    venueId: venueSeedData[0].id,
    scoreId: scoreSeedData[0].id,
    homeTeamId: teamSeedData[0].id,
    awayTeamId: teamSeedData[1].id
  },
  {
    id: "2cebfea6-bd58-4c79-85dc-144883341c59",
    matchStatus: FixtureStatusEnum.IN_MATCH,
    matchDateTime: "2023-05-05 09:04:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[0].id,
    venueId: venueSeedData[2].id,
    scoreId: scoreSeedData[2].id,
    homeTeamId: teamSeedData[2].id,
    awayTeamId: teamSeedData[3].id
  },
  {
    id: "1cc33de0-2364-4d8c-9a06-df90cd423995",
    matchStatus: FixtureStatusEnum.IN_MATCH,
    matchDateTime: "2023-05-05 09:04:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[1].id,
    venueId: venueSeedData[19].id,
    scoreId: scoreSeedData[4].id,
    homeTeamId: teamSeedData[10].id,
    awayTeamId: teamSeedData[11].id
  },
  {
    id: "b68cce3c-5a0c-42e3-8c27-3238b8edda86",
    matchStatus: FixtureStatusEnum.IN_MATCH,
    matchDateTime: "2023-05-05 09:04:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[1].id,
    venueId: venueSeedData[21].id,
    scoreId: scoreSeedData[6].id,
    homeTeamId: teamSeedData[13].id,
    awayTeamId: teamSeedData[14].id
  },
  {
    id: "338b2f0a-9ddb-462c-91e2-deed309bdee2",
    matchStatus: FixtureStatusEnum.IN_MATCH,
    matchDateTime: "2023-05-05 09:04:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[2].id,
    venueId: venueSeedData[10].id,
    scoreId: scoreSeedData[3].id,
    homeTeamId: teamSeedData[21].id,
    awayTeamId: teamSeedData[22].id
  },
  {
    id: "08a4a178-0d56-42be-90e8-803d6b5489fa",
    matchStatus: FixtureStatusEnum.IN_MATCH,
    matchDateTime: "2023-05-05 09:04:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[2].id,
    venueId: venueSeedData[12].id,
    scoreId: scoreSeedData[7].id,
    homeTeamId: teamSeedData[25].id,
    awayTeamId: teamSeedData[26].id
  },
  {
    id: "1facd1d1-a2c6-4def-87bd-a3da67fc0a72",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2023-05-04 17:40:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[0].id,
    venueId: venueSeedData[4].id,
    scoreId: scoreSeedData[8].id,
    homeTeamId: teamSeedData[1].id,
    awayTeamId: teamSeedData[2].id
  },
  {
    id: "7054e7d9-3b67-4d81-8b76-100bb1c30c70",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2023-05-04 17:40:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[0].id,
    venueId: venueSeedData[3].id,
    scoreId: scoreSeedData[9].id,
    homeTeamId: teamSeedData[3].id,
    awayTeamId: teamSeedData[4].id
  },
  {
    id: "3fd12b6f-7979-4d56-9627-fb5e57e37515",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2023-05-04 17:40:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[1].id,
    venueId: venueSeedData[20].id,
    scoreId: scoreSeedData[5].id,
    homeTeamId: teamSeedData[11].id,
    awayTeamId: teamSeedData[12].id
  },
  {
    id: "77aeccd4-8886-42ef-8760-c82b97cb5b2b",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2023-05-04 17:40:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[1].id,
    venueId: venueSeedData[23].id,
    scoreId: scoreSeedData[2].id,
    homeTeamId: teamSeedData[14].id,
    awayTeamId: teamSeedData[15].id
  },
  {
    id: "76db57b7-bdd6-470e-b0e8-f3eb8edac9ed",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2023-05-04 17:40:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[2].id,
    venueId: venueSeedData[11].id,
    scoreId: scoreSeedData[10].id,
    homeTeamId: teamSeedData[22].id,
    awayTeamId: teamSeedData[23].id
  },
  {
    id: "a560618b-faf3-4e28-983d-ce7e08e1ce55",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2023-05-04 17:40:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[2].id,
    venueId: venueSeedData[14].id,
    scoreId: scoreSeedData[11].id,
    homeTeamId: teamSeedData[26].id,
    awayTeamId: teamSeedData[27].id
  },
  {
    id: "facb82ee-b1bf-48a0-a987-58ce61e64c52",
    matchStatus: FixtureStatusEnum.NEW,
    matchDateTime: "2023-05-06 20:04:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[0].id,
    venueId: venueSeedData[5].id,
    scoreId: scoreSeedData[3].id,
    homeTeamId: teamSeedData[2].id,
    awayTeamId: teamSeedData[3].id
  },
  {
    id: "b01144e1-b74e-465a-a406-c62fc60f4550",
    matchStatus: FixtureStatusEnum.NEW,
    matchDateTime: "2023-05-06 20:04:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[0].id,
    venueId: venueSeedData[2].id,
    scoreId: scoreSeedData[2].id,
    homeTeamId: teamSeedData[3].id,
    awayTeamId: teamSeedData[4].id
  },
  {
    id: "0c146379-140a-457b-b4ad-05db6379968b",
    matchStatus: FixtureStatusEnum.NEW,
    matchDateTime: "2023-05-06 20:04:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[1].id,
    venueId: venueSeedData[20].id,
    scoreId: scoreSeedData[4].id,
    homeTeamId: teamSeedData[13].id,
    awayTeamId: teamSeedData[14].id
  },
  {
    id: "024ddccf-a3d8-4e6a-a23a-295a44015655",
    matchStatus: FixtureStatusEnum.NEW,
    matchDateTime: "2023-05-06 20:04:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[1].id,
    venueId: venueSeedData[22].id,
    scoreId: scoreSeedData[6].id,
    homeTeamId: teamSeedData[15].id,
    awayTeamId: teamSeedData[16].id
  },
  {
    id: "b014d5b1-5b91-4ad2-a903-a8a07b372423",
    matchStatus: FixtureStatusEnum.NEW,
    matchDateTime: "2023-05-06 20:04:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[2].id,
    venueId: venueSeedData[14].id,
    scoreId: scoreSeedData[3].id,
    homeTeamId: teamSeedData[24].id,
    awayTeamId: teamSeedData[25].id
  },
  {
    id: "f5a61f22-065e-4b00-b65f-045358239daf",
    matchStatus: FixtureStatusEnum.NEW,
    matchDateTime: "2023-05-06 20:04:20",
    seasonId: seasonSeedData[12].id,
    tournamentId: tournamentSeedData[2].id,
    venueId: venueSeedData[13].id,
    scoreId: scoreSeedData[7].id,
    homeTeamId: teamSeedData[27].id,
    awayTeamId: teamSeedData[28].id
  },
  {
    id: "ea23577c-0be2-4553-9881-bb21eb439f41",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2022-05-05 09:04:20",
    seasonId: seasonSeedData[11].id,
    tournamentId: tournamentSeedData[0].id,
    venueId: venueSeedData[0].id,
    scoreId: scoreSeedData[0].id,
    homeTeamId: teamSeedData[0].id,
    awayTeamId: teamSeedData[1].id
  },
  {
    id: "401457e5-72eb-4f46-81ab-fae96f47062e",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2022-05-05 09:04:20",
    seasonId: seasonSeedData[11].id,
    tournamentId: tournamentSeedData[0].id,
    venueId: venueSeedData[2].id,
    scoreId: scoreSeedData[2].id,
    homeTeamId: teamSeedData[2].id,
    awayTeamId: teamSeedData[3].id
  },
  {
    id: "e7e64efd-4337-4208-b00e-2ba1e213001c",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2022-05-05 09:04:20",
    seasonId: seasonSeedData[11].id,
    tournamentId: tournamentSeedData[1].id,
    venueId: venueSeedData[19].id,
    scoreId: scoreSeedData[4].id,
    homeTeamId: teamSeedData[10].id,
    awayTeamId: teamSeedData[11].id
  },
  {
    id: "753fa7d4-5cb0-4e85-a098-bbbcee54e741",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2022-05-05 09:04:20",
    seasonId: seasonSeedData[11].id,
    tournamentId: tournamentSeedData[1].id,
    venueId: venueSeedData[21].id,
    scoreId: scoreSeedData[6].id,
    homeTeamId: teamSeedData[13].id,
    awayTeamId: teamSeedData[14].id
  },
  {
    id: "a41b1c45-649d-496b-bbaf-0860be549eb4",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2022-05-05 09:04:20",
    seasonId: seasonSeedData[11].id,
    tournamentId: tournamentSeedData[2].id,
    venueId: venueSeedData[10].id,
    scoreId: scoreSeedData[3].id,
    homeTeamId: teamSeedData[21].id,
    awayTeamId: teamSeedData[22].id
  },
  {
    id: "5a9456ae-91f9-449b-a8e8-a627a4ad134c",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2022-05-05 09:04:20",
    seasonId: seasonSeedData[11].id,
    tournamentId: tournamentSeedData[2].id,
    venueId: venueSeedData[12].id,
    scoreId: scoreSeedData[7].id,
    homeTeamId: teamSeedData[25].id,
    awayTeamId: teamSeedData[26].id
  },
  {
    id: "81ba3d53-1139-4d4e-a2f1-c4e81bf7b7a4",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2020-05-04 17:40:20",
    seasonId: seasonSeedData[10].id,
    tournamentId: tournamentSeedData[0].id,
    venueId: venueSeedData[4].id,
    scoreId: scoreSeedData[8].id,
    homeTeamId: teamSeedData[1].id,
    awayTeamId: teamSeedData[2].id
  },
  {
    id: "d1a202b3-c969-4cf9-8b0b-16cd3e991244",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2020-05-04 17:40:20",
    seasonId: seasonSeedData[10].id,
    tournamentId: tournamentSeedData[0].id,
    venueId: venueSeedData[3].id,
    scoreId: scoreSeedData[9].id,
    homeTeamId: teamSeedData[3].id,
    awayTeamId: teamSeedData[4].id
  },
  {
    id: "77974332-2dfd-4922-ab9d-4400217f808a",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2020-05-04 17:40:20",
    seasonId: seasonSeedData[10].id,
    tournamentId: tournamentSeedData[1].id,
    venueId: venueSeedData[20].id,
    scoreId: scoreSeedData[5].id,
    homeTeamId: teamSeedData[11].id,
    awayTeamId: teamSeedData[12].id
  },
  {
    id: "428f183f-8855-446b-bb4e-6560971171e4",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2020-05-04 17:40:20",
    seasonId: seasonSeedData[10].id,
    tournamentId: tournamentSeedData[1].id,
    venueId: venueSeedData[23].id,
    scoreId: scoreSeedData[2].id,
    homeTeamId: teamSeedData[14].id,
    awayTeamId: teamSeedData[15].id
  },
  {
    id: "b29b06b1-2d0a-4a6f-8d90-2f1f26e35a3f",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2020-05-04 17:40:20",
    seasonId: seasonSeedData[10].id,
    tournamentId: tournamentSeedData[2].id,
    venueId: venueSeedData[11].id,
    scoreId: scoreSeedData[10].id,
    homeTeamId: teamSeedData[22].id,
    awayTeamId: teamSeedData[23].id
  },
  {
    id: "674684eb-819c-4800-9a79-35bb5072ba70",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2020-05-04 17:40:20",
    seasonId: seasonSeedData[10].id,
    tournamentId: tournamentSeedData[2].id,
    venueId: venueSeedData[14].id,
    scoreId: scoreSeedData[11].id,
    homeTeamId: teamSeedData[26].id,
    awayTeamId: teamSeedData[27].id
  },
  {
    id: "9125dd13-ecfa-443c-9a43-b85b4ce8398e",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2019-05-06 20:04:20",
    seasonId: seasonSeedData[9].id,
    tournamentId: tournamentSeedData[0].id,
    venueId: venueSeedData[5].id,
    scoreId: scoreSeedData[3].id,
    homeTeamId: teamSeedData[2].id,
    awayTeamId: teamSeedData[3].id
  },
  {
    id: "8ba64655-c1a7-483f-a6c1-6ec54985d2ec",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2019-05-06 20:04:20",
    seasonId: seasonSeedData[9].id,
    tournamentId: tournamentSeedData[0].id,
    venueId: venueSeedData[2].id,
    scoreId: scoreSeedData[2].id,
    homeTeamId: teamSeedData[3].id,
    awayTeamId: teamSeedData[4].id
  },
  {
    id: "12ca9200-3296-43d3-8781-d192a2efb4af",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2019-05-06 20:04:20",
    seasonId: seasonSeedData[9].id,
    tournamentId: tournamentSeedData[1].id,
    venueId: venueSeedData[20].id,
    scoreId: scoreSeedData[4].id,
    homeTeamId: teamSeedData[13].id,
    awayTeamId: teamSeedData[14].id
  },
  {
    id: "ba355128-192b-4f3f-8171-ea5152b75d06",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2019-05-06 20:04:20",
    seasonId: seasonSeedData[9].id,
    tournamentId: tournamentSeedData[1].id,
    venueId: venueSeedData[22].id,
    scoreId: scoreSeedData[6].id,
    homeTeamId: teamSeedData[15].id,
    awayTeamId: teamSeedData[16].id
  },
  {
    id: "4ac03cd0-1cd7-486a-acee-41145e81ecce",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2019-05-06 20:04:20",
    seasonId: seasonSeedData[9].id,
    tournamentId: tournamentSeedData[2].id,
    venueId: venueSeedData[14].id,
    scoreId: scoreSeedData[3].id,
    homeTeamId: teamSeedData[24].id,
    awayTeamId: teamSeedData[25].id
  },
  {
    id: "feb68891-17c6-4abb-a90d-7e7c16871981",
    matchStatus: FixtureStatusEnum.PLAYED,
    matchDateTime: "2019-05-06 20:04:20",
    seasonId: seasonSeedData[9].id,
    tournamentId: tournamentSeedData[2].id,
    venueId: venueSeedData[13].id,
    scoreId: scoreSeedData[7].id,
    homeTeamId: teamSeedData[27].id,
    awayTeamId: teamSeedData[28].id
  },
];