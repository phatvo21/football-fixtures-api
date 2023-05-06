import { FixtureRepository } from '@app/football-fixtures/fixture/data/repositories/fixture.repository';
import { FixtureQueryFilter } from '@app/football-fixtures/fixture/interface/fixture-query.filter.interface';
import { FixtureSpecification } from '@app/football-fixtures/fixture/specification/fixture.specification';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FixtureService {
  constructor(
    @Inject('FixtureInterface')
    private readonly fixtureRepo: FixtureRepository,
  ) {}

  public findAll(filters: FixtureQueryFilter): Promise<any> {
    FixtureSpecification.validateEndDateOrStartDate({ endDate: filters?.endDate, startDate: filters?.startDate });
    return this.fixtureRepo.getAllFixture(filters);
  }
}
