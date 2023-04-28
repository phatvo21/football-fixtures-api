import { TestService } from '@app/football-fixtures/fixture/test.service';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('test')
@ApiTags('test')
export class TestController {
  constructor(private testService: TestService) {}

  @Get()
  public async test(): Promise<any> {
    return this.testService.findAll();
  }
}
