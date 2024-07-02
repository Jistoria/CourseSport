import { Injectable, Module, Controller, Get, Param } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './CreateUser';
import axios from 'axios';

// Servicio GetUserService
@Injectable()
class GetUserService {
    async findOne(id: number): Promise<User> {
        const response = await axios.get(`http://127.0.0.1:3000/users/${id}`);
        return response.data;
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
