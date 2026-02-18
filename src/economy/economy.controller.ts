import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { EconomyService } from './economy.service';

@Controller('economy')
export class EconomyController {
  constructor(private readonly economyService: EconomyService) {}

  @Post('simulate_economy')
  getCalculation(@Body() body: { uf: string; consumekWh: number }) {
    const { uf, consumekWh } = body;

    if (!uf || !consumekWh || consumekWh <= 0) {
      throw new BadRequestException(
        'UF e Consumo (maior que 0) são obrigatórios.',
      );
    }

    try {
      return this.economyService.simulateEconomy(uf, consumekWh);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
