import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service.js';
import { Experience, Profile, ProfileLink, Project, Skill } from './profile.types.js';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { nullable: true, description: 'Публичный профиль разработчика.' })
  profile() {
    return this.profileService.getProfile();
  }

  @ResolveField(() => [ProfileLink])
  links() {
    return this.profileService.getLinks();
  }

  @ResolveField(() => [Skill])
  skills() {
    return this.profileService.getSkills();
  }

  @ResolveField(() => [Experience])
  experience() {
    return this.profileService.getExperience();
  }

  @ResolveField(() => [Project])
  projects() {
    return this.profileService.getProjects();
  }
}
