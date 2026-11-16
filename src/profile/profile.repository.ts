import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { PROFILE_ID } from './profile-id.js';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findProfile() {
    return this.prisma.profile.findUnique({
      where: { id: PROFILE_ID },
      select: { name: true, description: true },
    });
  }

  findLinks() {
    return this.prisma.profileLink.findMany({
      where: { profileId: PROFILE_ID },
      orderBy: { sortOrder: 'asc' },
      select: { label: true, url: true },
    });
  }

  findSkills() {
    return this.prisma.skill.findMany({
      where: { profileId: PROFILE_ID },
      orderBy: { sortOrder: 'asc' },
      select: { name: true },
    });
  }

  findExperience() {
    return this.prisma.experience.findMany({
      where: { profileId: PROFILE_ID },
      orderBy: [{ startedAt: 'desc' }, { id: 'asc' }],
      select: {
        company: true,
        position: true,
        startedAt: true,
        endedAt: true,
        achievements: true,
      },
    });
  }

  findProjects() {
    return this.prisma.project.findMany({
      where: { profileId: PROFILE_ID },
      orderBy: { sortOrder: 'asc' },
      select: { name: true, url: true, description: true },
    });
  }
}
