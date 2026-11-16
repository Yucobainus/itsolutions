import 'dotenv/config';
import { createPrismaClient } from '../src/database/prisma-client.js';
import { PROFILE_ID } from '../src/profile/profile-id.js';
import { profileData } from './profile-data.js';

function withSortOrder<T extends object>(items: T[]) {
  return items.map((item, sortOrder) => ({ ...item, sortOrder }));
}

async function seed(): Promise<void> {
  const prisma = createPrismaClient();
  const { name, description, links, skills, experience, projects } = profileData;

  try {
    await prisma.$transaction(async (tx) => {
      // The scalar upsert takes the profile row lock before replacing its children.
      await tx.profile.upsert({
        where: { id: PROFILE_ID },
        create: { id: PROFILE_ID, name, description },
        update: { name, description },
      });

      await tx.profile.update({
        where: { id: PROFILE_ID },
        data: {
          links: { deleteMany: {}, create: withSortOrder(links) },
          skills: { deleteMany: {}, create: withSortOrder(skills.map((name) => ({ name }))) },
          experience: {
            deleteMany: {},
            create: experience.map(({ startedAt, endedAt, ...entry }) => ({
              ...entry,
              startedAt: new Date(`${startedAt}-01T00:00:00.000Z`),
              endedAt: endedAt === null ? null : new Date(`${endedAt}-01T00:00:00.000Z`),
            })),
          },
          projects: { deleteMany: {}, create: withSortOrder(projects) },
        },
      });
    });
    console.info('Profile synchronized');
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
