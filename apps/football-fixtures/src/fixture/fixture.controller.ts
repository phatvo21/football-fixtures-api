import { GetFixtureQueryDto } from '@app/football-fixtures/fixture/dto/get-fixture.query.dto';
import { FixtureService } from '@app/football-fixtures/fixture/fixture.service';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/fixtures')
@ApiTags('api/fixtures')
export class FixtureController {
  constructor(private fixtureService: FixtureService) {}

  @Get()
  public async fixture(@Query() filters: GetFixtureQueryDto): Promise<any> {
    console.log('WORKS???');
    return this.fixtureService.findAll(filters);
  }
}
