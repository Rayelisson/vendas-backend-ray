import { Test, TestingModule } from '@nestjs/testing';
import { CarreiosService } from './carreios.service';

describe('CarreiosService', () => {
  let service: CarreiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarreiosService],
    }).compile();

    service = module.get<CarreiosService>(CarreiosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
