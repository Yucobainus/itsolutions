import { Module, OnApplicationShutdown } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { createPrismaClient } from './prisma-client.js';

@Module({
  providers: [{ provide: PrismaClient, useFactory: createPrismaClient }],
  exports: [PrismaClient],
})
export class PrismaModule implements OnApplicationShutdown {
  constructor(private readonly prisma: PrismaClient) {}

  async onApplicationShutdown(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
