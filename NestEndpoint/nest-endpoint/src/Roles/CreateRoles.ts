import { Controller, Post, Body, Injectable, Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import axios from 'axios'

@Entity('Roles')
@ObjectType()
class Role{
    @PrimaryGeneratedColumn()
    @Field()
    id_rol: number;

    @Column({ length: 255 })
    @Field()
    nombre: string;

    @Column({ length: 255 })
    @Field()
    description: string;
}
//DTO
@InputType()
class CreateRoleDto{
    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    nombre: string;

    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    description: string;
}
//Servicio
@Injectable()
class CreateRolesService{
    async execute(createRoleDto: CreateRoleDto): Promise<Role>{
        const response = await axios.post('http://127.0.0.1:3000/roles',createRoleDto );
        return response.data;
    }
}
//Controlador
@Controller('roles')
class RolesController{
    constructor(private readonly rolesService: CreateRolesService){}
    @Post()
    async create(@Body() createRoleDto: CreateRoleDto): Promise<Role>{
        return this.rolesService.execute(createRoleDto);
    }
}
//Resolver
@Resolver(() => Role)
class CreateRolesResolver{
    constructor(private readonly rolesService: CreateRolesService){}
    @Mutation(returns => Role)
    async createRole(@Args('createRoleDto') createRoleDto: CreateRoleDto): Promise<Role>{
        return this.rolesService.execute(createRoleDto);
    }
}
@Module({
    providers:[CreateRolesService,CreateRolesResolver],
    controllers:[RolesController]
})
class CreateRoleModule {}

export {CreateRoleModule, CreateRoleDto, Role}