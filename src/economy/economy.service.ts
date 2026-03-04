import { Injectable } from '@nestjs/common';
import * as mockEconomy from '../../mock-companies.json';

interface SimulationResult {
  base_price: number;
  companies: {
    name: string;
    logo: string;
    type: string;
    price_kwh: number;
    total_customers: number;
    rates: number;
    states: string[];
    estimate_economy: number;
    economy_percentual: number;
  }[];
}

@Injectable()
export class EconomyService {

  private readonly mockData = mockEconomy;

  simulateEconomy(uf: string, consumekWh: number): SimulationResult {
    const priceBaseUf = this.mockData.prices_base[uf.toUpperCase()];

    if (!priceBaseUf) {
      throw new Error('Estado não atendido ou inválido');
    }

    const basePrice = consumekWh * priceBaseUf;

    const availableCompanies = this.mockData.companies
      .filter((f) => f.states.includes(uf.toUpperCase()))
      .flatMap((f) =>
        f.solutions.map((sol) => {
          const companyPrice = consumekWh * sol.price_kwh;
          const economyAbsolut = basePrice - companyPrice;

          return {
            name: f.name,
            logo: f.logo,
            type: sol.type,
            states: f.states,
            price_kwh: sol.price_kwh,
            total_customers: f.total_customers,
            rates: f.rates,
            estimate_economy: Number(economyAbsolut.toFixed(2)),
            economy_percentual: Number(((economyAbsolut / basePrice) * 100).toFixed(2)),
          };
        }),
      );

    return {
      base_price: basePrice,
      companies: availableCompanies.sort((a, b) => b.estimate_economy - a.estimate_economy),
    };
  }
}
