import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('healthz')
  health(): string {
    return `OK: ${new Date().toISOString()}`;
  }
}
