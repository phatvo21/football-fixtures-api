import { FixtureStatusEnum } from '@app/football-fixtures/db/entities/enum/fixture-status.enum';
import { FixtureQueryFilter } from '@app/football-fixtures/fixture/interfaces/fixture-query.filter.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetFixtureQueryDto implements FixtureQueryFilter {
  @IsOptional()
  @IsString()
  @IsUUID()
  @ApiProperty({ example: '4bba27fa-6070-4b24-8f0d-d6681395344e' })
  id: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ example: '4bba27fa-6070-4b24-8f0d-d6681395344e, 8405e257-ff7f-425a-a154-cdac9de265be' })
  ids: string;

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
  @ApiProperty({ example: 35 })
  round: any;

  @IsOptional()
  @IsString()
  @IsUUID()
  @ApiProperty({ example: '4bba27fa-6070-4b24-8f0d-d6681395344e' })
  team: string;

  @IsOptional()
  @IsEnum(FixtureStatusEnum)
  @ApiProperty({ example: FixtureStatusEnum.PLAYED })
  status: FixtureStatusEnum;

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

  @IsOptional()
  @ApiProperty({ example: 1 })
  page: any;

  @IsOptional()
  @ApiProperty({ example: 20 })
  size: any;
}
