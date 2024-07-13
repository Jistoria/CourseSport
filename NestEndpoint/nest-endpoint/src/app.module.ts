import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule,registerEnumType } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AxiosConfigModule } from './Client/Axios-Config';
import { FeaturesModule } from './feature.module';

@Module({
  imports:[
  ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins:[ApolloServerPluginLandingPageLocalDefault()],
    }),
    FeaturesModule,
    AxiosConfigModule
  ],
})
export class AppModule {}
