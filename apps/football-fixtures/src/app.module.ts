import { BaseModule } from '@app/common/modules';
import { TestEntity } from '@app/football-fixtures/fixture/data/entities/test.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    BaseModule,
    TypeOrmModule.forFeature([TestEntity])
  ]
})
export class AppModule {}
