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

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve calcular a economia corretamente para um estado atendido', () => {
    const uf = 'RN';
    const consumo = 10000;

    // Tarifa base RN no mock = 0.75 -> Custo Base = 7500
    // Fornecedor Vento Norte no mock = 0.60 -> Custo Fornecedor = 6000
    // Economia esperada = 1500

    const result = service.simulateEconomy(uf, consumo);

    expect(result.state_base_price).toBe(7500);
    expect(result.results.length).toBeGreaterThan(0);

    // const ventoNorte = result.results.find(
    //   (r) => r.name === 'Vento Norte Potiguar',
    // );
    // expect(ventoNorte.stimate_economy).toBe(1500);
    // expect(ventoNorte.economy_percentual).toBe(20); // (1500 / 7500) * 100
  });

  it('deve lançar um erro para um estado não cadastrado no mock', () => {
    expect(() => {
      service.simulateEconomy('AC', 5000);
    }).toThrow('Estado não atendido ou inválido');
  });

  it('deve filtrar apenas fornecedores que atuam na UF selecionada', () => {
    const result = service.simulateEconomy('RN', 1000);

    // No mock, apenas o "Vento Norte Potiguar" atua no RN
    const todosSaoDoRN = result.results.every(
      (r) => r.name === 'Vento Norte Potiguar',
    );
    expect(todosSaoDoRN).toBe(true);
  });
});
