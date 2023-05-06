import { FixtureQueryFilter } from '@app/football-fixtures/fixture/interface/fixture-query.filter.interface';
import { BadRequestException } from '@nestjs/common';

export class FixtureSpecification {
  public static validateEndDateOrStartDate(filters: {
    endDate: FixtureQueryFilter['endDate'];
    startDate: FixtureQueryFilter['startDate'];
  }): void {
    if ((filters.startDate && !filters.endDate) || (filters.endDate && !filters.startDate))
      throw new BadRequestException('Both endDate and startDate must be required if one of them entered in the query.');
  }
}
