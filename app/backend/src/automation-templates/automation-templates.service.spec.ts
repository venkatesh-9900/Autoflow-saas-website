import { Test, TestingModule } from '@nestjs/testing';
import { AutomationTemplatesService } from './automation-templates.service';

describe('AutomationTemplatesService', () => {
  let service: AutomationTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutomationTemplatesService],
    }).compile();

    service = module.get<AutomationTemplatesService>(
      AutomationTemplatesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
