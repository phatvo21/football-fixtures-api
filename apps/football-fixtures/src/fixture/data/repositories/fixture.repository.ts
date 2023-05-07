import { BaseRepository } from '@app/common/repository';
import { convertStringToArray } from '@app/common/utils/convert-string-to-array.util';
import { paginateAggregation, paginateTakeSkipCalculation } from '@app/common/utils/paginate.util';
import { FixtureEntity } from '@app/football-fixtures/db/entities/fixture.entity';
import { FixtureInterface } from '@app/football-fixtures/fixture/data/repositories/interface/fixture.interface';
import { FixtureDataResponse } from '@app/football-fixtures/fixture/interfaces/fixture-data.response';
import {
  FixtureEnabledMatchesResponse,
  FixtureMatches,
} from '@app/football-fixtures/fixture/interfaces/fixture-enabled-matches-data.response';
import { FixtureQueryFilter } from '@app/football-fixtures/fixture/interfaces/fixture-query.filter.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';

/**
 * Class extends the base repository class
 * This class handle the transformation, transactions with the database
 * FixtureRepository is represented for fixture and aimed queries all fixtures, enabled matches dates from the database
 */
@Injectable()
export class FixtureRepository extends BaseRepository<FixtureEntity> implements FixtureInterface {
  constructor(@InjectRepository(FixtureEntity) private readonly fixtureRepo: Repository<FixtureEntity>) {
    super(fixtureRepo);
  }

  /**
   * Get all the fixtures based on the given filters data. The default will be sorted from latest to oldest match dates and display 10 items per page
   * @param {FixtureQueryFilter} filters - All accepted filters use query the fixtures data
   * @return {FixtureDataResponse} - The data response, that includes fixtures data, page, size, total of data
   */
  public async getAllFixture(filters: FixtureQueryFilter): Promise<FixtureDataResponse> {
    // Extract the computed pagination params from our helper function
    const { take, skip, page } = paginateTakeSkipCalculation({ size: filters?.size, page: filters?.page });

    // Create a query builder based on fixture and join all the relations table
    // Here we aim to get all the data from fixture as well as the relations tables
    const queryBuilder: SelectQueryBuilder<FixtureEntity> = await this.fixtureRepo
      .createQueryBuilder('fixture')
      .leftJoinAndSelect('fixture.season', 'season')
      .leftJoinAndSelect('fixture.venue', 'venue')
      .leftJoinAndSelect('fixture.tournament', 'tournament')
      .leftJoinAndSelect('fixture.homeTeam', 'homeTeam')
      .leftJoinAndSelect('fixture.awayTeam', 'awayTeam')
      .leftJoinAndSelect('fixture.score', 'score')
      .orderBy('fixture.matchDate', 'DESC');

    // Build the query if there is any filter params
    const builderCondition = this.fixtureFilterBuilder(filters, queryBuilder);

    // Get the fixtures result with pagination and filters params
    const [fixtures, total] = await builderCondition.skip(skip).take(take).getManyAndCount();

    // Here we aggregate the pagination data
    const { size, currentPage, nextPage, lastPage, prevPage } = paginateAggregation({ total, take, page });

    return { data: fixtures, total, currentPage, size, lastPage, nextPage, prevPage };
  }

  /**
   * Get all the enabled matches with the same dates. Allows filter the enabled matches by season, venue or tournament
   * @param {FixtureQueryFilter} filters - All excepted filters use query the fixtures data
   * @return {FixtureEnabledMatchesResponse} - The data response, that contains all the enabled matches
   */
  public async getAllEnabledMatches(filters: FixtureQueryFilter): Promise<FixtureEnabledMatchesResponse> {
    // Create a query builder based on fixture and join 3 needed relation tables (season, venue, tournament)
    // Here we aim to get all the enabled matches with the same dates and allows to filter by season, venue or tournament
    const queryBuilder: SelectQueryBuilder<FixtureEntity> = await this.fixtureRepo
      .createQueryBuilder('fixture')
      .leftJoinAndSelect('fixture.season', 'season')
      .leftJoinAndSelect('fixture.venue', 'venue')
      .leftJoinAndSelect('fixture.tournament', 'tournament')
      .select('fixture.matchDate', 'matchDate')
      .addSelect('COUNT(fixture.id)', 'numberOfMatches')
      .groupBy('fixture.matchDate')
      .orderBy('fixture.matchDate', 'DESC');

    // Build the query if there is any filter params
    const builderCondition = this.fixtureFilterBuilder(filters, queryBuilder);
    // Get the raw data based on the conditions
    const result = (await builderCondition.getRawMany()) as unknown as FixtureMatches[];
    return { enabledMatchDates: result };
  }

  /**
   * Filter builder function takes responsibility to build the query with any given accepted filters params
   * @param {FixtureQueryFilter} filters - All excepted filters use query the fixtures data
   * @param {SelectQueryBuilder<FixtureEntity>} queryBuilder - The built of query builder based on entity
   * @return {SelectQueryBuilder<FixtureEntity>} - The query builder contains filters conditions of that entity
   */
  private fixtureFilterBuilder(
    filters: FixtureQueryFilter,
    queryBuilder: SelectQueryBuilder<FixtureEntity>,
  ): SelectQueryBuilder<FixtureEntity> {
    // Filter by seasonId in the fixture table if there is any season present in the filters params
    if (filters.season) queryBuilder.andWhere('fixture.seasonId = :seasonId', { seasonId: filters.season });
    // Filter by venueId in the fixture table if there is any venue present in the filters params
    if (filters.venue) queryBuilder.andWhere('fixture.venueId = :venueId', { venueId: filters.venue });
    // Filter by tournamentId in the fixture table if there is any tournament present in the filters params
    if (filters.tournament)
      queryBuilder.andWhere('fixture.tournamentId = :tournamentId', { tournamentId: filters.tournament });

    // If there is any team present in the filters params
    // Either filter by home team or away team to select the corresponding fixtures
    if (filters.team) {
      queryBuilder.andWhere(
        new Brackets((qb: WhereExpressionBuilder): void => {
          qb.where('fixture.homeTeam = :homeTeamId', { homeTeamId: filters.team }).orWhere(
            'fixture.awayTeam = :awayTeamId',
            { awayTeamId: filters.team },
          );
        }),
      );
    }
    // Filter by id in the fixture table if there is any id present in the filters params
    if (filters.id) queryBuilder.andWhere('fixture.id = :id', { id: filters.id });
    // Filter in list ids in the fixture table if there is a string ids that contains 20 ids of fixtures present in the filters params
    if (filters.ids) queryBuilder.andWhere('fixture.id IN (:...ids)', { ids: convertStringToArray(filters.ids) });
    // Filter by round in the fixture table if there is any round present in the filters params
    if (filters.round) queryBuilder.andWhere('fixture.round = :round', { round: filters.round });
    // Filter by status in the fixture table if there is any status present in the filters params
    if (filters.status) queryBuilder.andWhere('fixture.matchStatus = :matchStatus', { matchStatus: filters.status });
    // Filter by match date in the fixture table if there is any match date present in the filters params
    if (filters.matchDate) queryBuilder.andWhere('fixture.matchDate = :matchDate', { matchDate: filters.matchDate });
    // Filter between start date and end date if there are start date and end date present in the filters params
    if (filters.startDate && filters.endDate)
      queryBuilder.andWhere(`fixture.matchDate BETWEEN '${filters.startDate}' AND '${filters.endDate}'`);

    return queryBuilder;
  }
}
