import { TestEntity } from '@app/football-fixtures/fixture/data/entities/test.entity';
import { TestRepository } from '@app/football-fixtures/fixture/data/repositories/test.repository';
import { TestController } from '@app/football-fixtures/fixture/test.controller';
import { TestService } from '@app/football-fixtures/fixture/test.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity])],
  providers: [
    {
      provide: 'TestInterface',
      useClass: TestRepository
    },
    TestService
  ],
  controllers: [TestController]
})
export class FixtureModule {}