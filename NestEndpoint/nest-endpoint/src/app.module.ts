import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule,registerEnumType } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';


//modulos
import { CreateUserModule } from './Users/CreateUser';
import { GetUserModule } from './Users/GetUser';

@Module({
  imports:[
  ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins:[ApolloServerPluginLandingPageLocalDefault()],
    }),
    CreateUserModule,
    GetUserModule

  ],
})
export class AppModule {}
