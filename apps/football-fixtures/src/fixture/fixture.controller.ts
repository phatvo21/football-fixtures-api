import { ListEndpoint } from '@app/common/decorators/list-endpoint.decorator';
import { FixtureEntity } from '@app/football-fixtures/db/entities/fixture.entity';
import { GetFixtureQueryDto } from '@app/football-fixtures/fixture/dtos/get-fixture.query.dto';
import { ListFixtureResponseDto } from '@app/football-fixtures/fixture/dtos/list-fixture.response.dto';
import { FixtureService } from '@app/football-fixtures/fixture/fixture.service';
import { FixtureDataResponse } from '@app/football-fixtures/fixture/interfaces/fixture-data.response';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('fixtures')
@ApiTags('fixtures')
export class FixtureController {
  constructor(private fixtureService: FixtureService) {}

  @Get()
  @ListEndpoint('Get all the fixtures', ListFixtureResponseDto, FixtureEntity)
  public findAll(@Query() filters: GetFixtureQueryDto): Promise<FixtureDataResponse> {
    return this.fixtureService.findAll(filters);
  }
}
