import { Controller, Get, Redirect, ServiceUnavailableException } from '@nestjs/common';
import { PrismaClient } from './generated/prisma/client.js';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaClient) {}

  @Get()
  @Redirect('/graphql')
  index(): void {}

  @Get('health')
  async health() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok' };
    } catch {
      throw new ServiceUnavailableException('Database unavailable');
    }
  }
}
