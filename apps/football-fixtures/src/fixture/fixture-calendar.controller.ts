import { ListEndpoint } from '@app/common/decorators/list-endpoint.decorator';
import { FixtureEntity } from '@app/football-fixtures/db/entities/fixture.entity';
import { GetEnabledMatchesQueryDto } from '@app/football-fixtures/fixture/dtos/get-enabled-matches.query.dto';
import { ListEnabledMatchesResponseDto } from '@app/football-fixtures/fixture/dtos/list-enabled-matches.response.dto';
import { FixtureService } from '@app/football-fixtures/fixture/fixture.service';
import { FixtureEnabledMatchesResponse } from '@app/football-fixtures/fixture/interfaces/fixture-enabled-matches-data.response';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('calendar')
@ApiTags('calendar')
export class FixtureCalendarController {
  constructor(private fixtureService: FixtureService) {}

  @Get()
  @ListEndpoint('Get all the enabled matches', ListEnabledMatchesResponseDto, FixtureEntity)
  public findEnabledMatches(@Query() filters: GetEnabledMatchesQueryDto): Promise<FixtureEnabledMatchesResponse> {
    return this.fixtureService.findEnabledMatches(filters);
  }
}
