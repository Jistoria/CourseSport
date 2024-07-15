import { Injectable, Module, Controller, Get, Param,Inject, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './CreateUser';
import { AxiosInstance } from 'axios';
import { GuardModule } from '../Client/Guards/guards.module';
import { JwtAuthGuard } from '../Client/Guard Ruby/jwt-auth.guard';

// Servicio GetUserService
@Injectable()
class GetUserService {
    constructor(
        @Inject('RUBY_API') private readonly rubyApi:AxiosInstance,
    ){}
    async findOne(id: number): Promise<User>{
        const response = await this.rubyApi.get(`/users/${id}`)
        return response.data
    }

    
}

// Controlador GetUserController
@Controller('users')
class GetUserController {
    constructor(private readonly getUserService: GetUserService) {}

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        return await this.getUserService.findOne(id);
    }
}

// Resolver GetUserResolver
@Resolver(() => User)
class GetUserResolver {
    constructor(private readonly getUserService: GetUserService) {}

    @Query(() => User)
    //@UseGuards(JwtAuthGuard)
    async getUser(@Args('id') id: number): Promise<User> {
        return await this.getUserService.findOne(id);
    }
}

// Módulo GetUserModule
@Module({
    providers: [GetUserService, GetUserResolver],
    controllers: [GetUserController],
})
class GetUserModule {}

export { GetUserModule };
