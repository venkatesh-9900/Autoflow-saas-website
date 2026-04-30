import { Test, TestingModule } from '@nestjs/testing';
import { AutomationTemplatesController } from './automation-templates.controller';

describe('AutomationTemplatesController', () => {
  let controller: AutomationTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutomationTemplatesController],
    }).compile();

    controller = module.get<AutomationTemplatesController>(
      AutomationTemplatesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
