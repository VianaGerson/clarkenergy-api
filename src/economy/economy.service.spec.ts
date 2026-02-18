import { Test, TestingModule } from '@nestjs/testing';
import { EconomyService } from './economy.service';

describe('EconomyService', () => {
  let service: EconomyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EconomyService],
    }).compile();

    service = module.get<EconomyService>(EconomyService);
  });

  it('deve instanciar o serviço corretamente', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar economia e empresas para um estado válido', () => {
    const uf = 'RN';
    const consumo = 10000;

    const result = service.simulateEconomy(uf, consumo);

    expect(result).toHaveProperty('base_price');
    expect(result).toHaveProperty('companies');
    expect(Array.isArray(result.companies)).toBe(true);
    expect(result.base_price).toBeGreaterThan(0);
    expect(result.companies.length).toBeGreaterThan(0);
  });

  it('deve lançar erro para estado não atendido', () => {
    expect(() => {
      service.simulateEconomy('XX', 5000);
    }).toThrow('Estado não atendido ou inválido');
  });

  it('deve retornar apenas empresas que atuam na UF selecionada', () => {
    const uf = 'RN';
    const consumo = 1000;
    const result = service.simulateEconomy(uf, consumo);

    const todasAtuamNoUF = result.companies.every((r) => r.states.includes(uf));
    expect(todasAtuamNoUF).toBe(true);
  });
});
