import { BaseRepository } from '@app/common/repository';
import { paginateAggregation, paginateTakeSkipCalculation } from '@app/common/utils/paginate.util';
import { FixtureEntity } from '@app/football-fixtures/db/entities/fixture.entity';
import { FixtureInterface } from '@app/football-fixtures/fixture/data/repositories/interface/fixture.interface';
import { FixtureQueryFilter } from '@app/football-fixtures/fixture/interface/fixture-query.filter.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';

@Injectable()
export class FixtureRepository extends BaseRepository<FixtureEntity> implements FixtureInterface {
  constructor(@InjectRepository(FixtureEntity) private readonly fixtureRepo: Repository<FixtureEntity>) {
    super(fixtureRepo);
  }

  public async getAllFixture(filters: FixtureQueryFilter): Promise<any> {
    const { take, skip, page } = paginateTakeSkipCalculation({ size: filters?.size, page: filters?.page });

    const queryBuilder: SelectQueryBuilder<FixtureEntity> = await this.fixtureRepo
      .createQueryBuilder('fixture')
      .leftJoinAndSelect('fixture.season', 'season')
      .leftJoinAndSelect('fixture.venue', 'venue')
      .leftJoinAndSelect('fixture.tournament', 'tournament')
      .leftJoinAndSelect('fixture.homeTeam', 'homeTeam')
      .leftJoinAndSelect('fixture.awayTeam', 'awayTeam')
      .leftJoinAndSelect('fixture.score', 'score')
      .orderBy('fixture.matchDateTime', 'DESC');

    if (filters.season) queryBuilder.andWhere('fixture.seasonId = :seasonId', { seasonId: filters.season });
    if (filters.venue) queryBuilder.andWhere('fixture.venueId = :venueId', { venueId: filters.venue });
    if (filters.tournament)
      queryBuilder.andWhere('fixture.tournamentId = :tournamentId', { tournamentId: filters.tournament });
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
    if (filters.id) queryBuilder.andWhere('fixture.id = :id', { id: filters.id });
    if (filters.ids) queryBuilder.andWhere('fixture.id IN (:...ids)', { ids: filters.ids });
    if (filters.round) queryBuilder.andWhere('fixture.round = :round', { round: filters.round });
    if (filters.status) queryBuilder.andWhere('fixture.matchStatus = :matchStatus', { matchStatus: filters.status });
    if (filters.matchDate)
      queryBuilder.andWhere('fixture.matchDateTime = :matchDateTime', { matchDateTime: filters.matchDate });
    if (filters.startDate && filters.endDate)
      queryBuilder.andWhere(`fixture.matchDateTime BETWEEN '${filters.startDate}' AND '${filters.endDate}'`);

    const [fixtures, total] = await queryBuilder.skip(skip).take(take).getManyAndCount();

    const { size, currentPage, nextPage, lastPage, prevPage } = paginateAggregation({ total, take, page });

    return { data: fixtures, total, currentPage, size, lastPage, nextPage, prevPage };
  }
}
