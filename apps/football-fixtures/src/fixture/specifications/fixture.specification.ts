import { convertStringToArray } from '@app/common/utils/convert-string-to-array.util';
import { FixtureQueryFilter } from '@app/football-fixtures/fixture/interfaces/fixture-query.filter.interface';
import { BadRequestException } from '@nestjs/common';

export class FixtureSpecification {
  public static validateEndDateOrStartDate(filters: {
    endDate: FixtureQueryFilter['endDate'];
    startDate: FixtureQueryFilter['startDate'];
  }): void {
    if ((filters.startDate && !filters.endDate) || (filters.endDate && !filters.startDate))
      throw new BadRequestException('Both endDate and startDate must be required if one of them entered in the query.');
  }

  public static validateIds(ids: FixtureQueryFilter['ids']): void {
    if (ids) {
      const { length } = convertStringToArray(ids);
      if (length > 20) throw new BadRequestException('List fixtures ids must be less than 20 ids.');
    }
  }
}
