import { Injectable, Scope } from '@nestjs/common';
import { ProfileRepository } from './profile.repository.js';

@Injectable({ scope: Scope.REQUEST })
export class ProfileService {
  private profile?: ReturnType<ProfileRepository['findProfile']>;
  private links?: ReturnType<ProfileRepository['findLinks']>;
  private skills?: ReturnType<ProfileRepository['findSkills']>;
  private experience?: ReturnType<ProfileRepository['findExperience']>;
  private projects?: ReturnType<ProfileRepository['findProjects']>;

  constructor(private readonly repository: ProfileRepository) {}

  getProfile() {
    return (this.profile ??= this.repository.findProfile());
  }

  getLinks() {
    return (this.links ??= this.repository.findLinks());
  }

  getSkills() {
    return (this.skills ??= this.repository.findSkills());
  }

  async getExperience() {
    const experience = await (this.experience ??= this.repository.findExperience());
    return experience.map(({ startedAt, endedAt, ...entry }) => ({
      ...entry,
      startedAt: startedAt.toISOString().slice(0, 7),
      endedAt: endedAt?.toISOString().slice(0, 7) ?? null,
    }));
  }

  getProjects() {
    return (this.projects ??= this.repository.findProjects());
  }
}
