import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller.js';
import { PrismaModule } from './database/prisma.module.js';
import { ProfileModule } from './profile/profile.module.js';

const logger = new Logger('GraphQL');

const developerCardQuery = `query DeveloperCard {
  profile {
    name
    description
    links { label url }
    skills { name }
    experience { company position startedAt endedAt achievements }
    projects { name url description }
  }
}`;

@Module({
  imports: [
    PrismaModule,
    ProfileModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      introspection: true,
      includeStacktraceInErrorResponses: false,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true, document: developerCardQuery }),
      ],
      formatError(error, originalError) {
        if (error.extensions?.code === 'INTERNAL_SERVER_ERROR') {
          logger.error(originalError);
          return { ...error, message: 'Internal server error' };
        }

        return error;
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
