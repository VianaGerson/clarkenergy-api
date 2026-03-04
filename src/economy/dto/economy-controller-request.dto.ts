import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, Min } from 'class-validator';

export const StatesEnum = [
  'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT',
  'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO',
] as const;

export class EconomyControllerRequestDto {
  @ApiProperty({ description: 'Unidade Federativa', example: 'SP', enum: StatesEnum })
  @IsEnum(StatesEnum)
  uf: (typeof StatesEnum)[number];

  @ApiProperty({ description: 'Consumo em kWh', example: 100, minimum: 1 })
  @IsInt()
  @Min(1)
  consumekWh: number;
}
