import { Test, TestingModule } from '@nestjs/testing';
import { CarreiosController } from './carreios.controller';

describe('CarreiosController', () => {
  let controller: CarreiosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarreiosController],
    }).compile();

    controller = module.get<CarreiosController>(CarreiosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
