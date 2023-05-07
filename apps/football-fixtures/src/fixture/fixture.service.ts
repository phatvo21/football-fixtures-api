import { FixtureInterface } from '@app/football-fixtures/fixture/data/repositories/interface/fixture.interface';
import { FixtureDataResponse } from '@app/football-fixtures/fixture/interfaces/fixture-data.response';
import { FixtureEnabledMatchesResponse } from '@app/football-fixtures/fixture/interfaces/fixture-enabled-matches-data.response';
import { FixtureQueryFilter } from '@app/football-fixtures/fixture/interfaces/fixture-query.filter.interface';
import { FixtureSpecification } from '@app/football-fixtures/fixture/specifications/fixture.specification';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FixtureService {
  constructor(
    @Inject('FixtureInterface')
    private readonly fixtureRepo: FixtureInterface,
  ) {}

  public findAll(filters: FixtureQueryFilter): Promise<FixtureDataResponse> {
    FixtureSpecification.validateEndDateOrStartDate({ endDate: filters?.endDate, startDate: filters?.startDate });
    return this.fixtureRepo.getAllFixture(filters);
  }

  public findEnabledMatches(filters: FixtureQueryFilter): Promise<FixtureEnabledMatchesResponse> {
    FixtureSpecification.validateEndDateOrStartDate({ endDate: filters?.endDate, startDate: filters?.startDate });
    return this.fixtureRepo.getAllEnabledMatches(filters);
  }
}
