import { BaseModule } from '@app/common/modules';
import { FixtureModule } from '@app/football-fixtures/fixture/fixture.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BaseModule,
    FixtureModule
  ]
})
export class AppModule {}
