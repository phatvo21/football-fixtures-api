import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class BaseEntityDto {
  @ApiProperty({ example: '57e89869-4647-4e46-979b-643d2eda8316' })
  @ApiProperty({ readOnly: true })
  @IsOptional()
  id: string;

  @ApiProperty({ readOnly: true })
  @IsOptional()
  createdAt: Date;

  @ApiProperty({ readOnly: true })
  @IsOptional()
  updatedAt: Date;
}
