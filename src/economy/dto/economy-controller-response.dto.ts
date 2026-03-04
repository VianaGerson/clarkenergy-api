import { ApiProperty } from '@nestjs/swagger';

export class EconomyCompanyDto {
  @ApiProperty({ example: 'Empresa Exemplo' })
  name: string;

  @ApiProperty({ example: 'https://logo.url' })
  logo: string;

  @ApiProperty({ example: 'Distribuidora' })
  type: string;

  @ApiProperty({ example: 0.45 })
  price_kwh: number;

  @ApiProperty({ example: 10000 })
  total_customers: number;

  @ApiProperty({ example: 4.5 })
  rates: number;

  @ApiProperty({ example: ['SP', 'RJ'] })
  states: string[];

  @ApiProperty({ example: 50 })
  estimate_economy: number;

  @ApiProperty({ example: 10 })
  economy_percentual: number;
}

export class EconomyControllerResponseDto {
  @ApiProperty({ description: 'Preço base', example: 0.5 })
  base_price: number;

  @ApiProperty({ description: 'Lista de empresas com economia estimada', type: [EconomyCompanyDto] })
  companies: EconomyCompanyDto[];
}
