import { Controller, Post, Body, UnprocessableEntityException } from '@nestjs/common';
import { EconomyService } from './economy.service';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { EconomyControllerRequestDto } from './dto/economy-controller-request.dto';
import { EconomyControllerResponseDto } from './dto/economy-controller-response.dto';
@ApiTags('Economy')
@Controller('economy')
export class EconomyController {
  constructor(private readonly economyService: EconomyService) {}

  @Post('simulate_economy')
  @ApiOperation({ summary: 'Simula economia para empresas de energia' })
  @ApiResponse({
    status: 200,
    description: 'Simulação de economia realizada com sucesso.',
    type: EconomyControllerResponseDto,
    schema: {
      example: {
        base_price: 0.5,
        companies: [
          {
            name: 'Empresa Exemplo',
            logo: 'https://logo.url',
            type: 'Distribuidora',
            price_kwh: 0.45,
            total_customers: 10000,
            rates: 4.5,
            estimate_economy: 50,
            economy_percentual: 10,
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 422,
    description: 'Erros de validação.',
    schema: {
      example: {
        statusCode: 422,
        message: [
          'uf deves ser um valor válido',
          'consumekWh deve ser um número inteiro',
          'consumekWh não deve ser menor que 1',
        ],
        error: 'Unprocessable Entity',
      },
    },
  })
  simulateEconomy(
    @Body() body: EconomyControllerRequestDto,
  ): EconomyControllerResponseDto {
    const { uf, consumekWh } = body;

    try {
      return this.economyService.simulateEconomy(uf, consumekWh);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
