import { FixtureQueryFilter } from '@app/football-fixtures/fixture/interfaces/fixture-query.filter.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetEnabledMatchesQueryDto implements FixtureQueryFilter {
  @IsOptional()
  @IsString()
  @IsUUID()
  @ApiProperty({ example: '4bba27fa-6070-4b24-8f0d-d6681395344e' })
  tournament: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  @ApiProperty({ example: '4bba27fa-6070-4b24-8f0d-d6681395344e' })
  season: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  @ApiProperty({ example: '4bba27fa-6070-4b24-8f0d-d6681395344e' })
  venue: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2023-05-06' })
  matchDate: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2023-05-06' })
  startDate: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2023-10-06' })
  endDate: string;
}
