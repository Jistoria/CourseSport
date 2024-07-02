import { Controller, Post, Body, Injectable, Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import axios from 'axios'

//Entidad
@Entity('Users')
@ObjectType()
class User{
    @PrimaryGeneratedColumn()
    @Field()
    cdl_user: number;

    @Column({ length: 255 })
    @Field()
    nombre: string;

    @Column({ length: 255 })
    @Field()
    apellido: string;

    @Column({ length: 255 })
    @Field()
    genero: string;

    @Column({ length: 255 })
    @Field()
    email: string;

    @Column({ length: 255 })
    @Field()
    specialty: string;

    @Column({ length: 255 })
    @Field()
    password_digest: string;
}

//DTO CreateUserDto
@InputType()
class CreateUserDto{
    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    nombre: string;

    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    apellido: string;

    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    genero: string;

    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    email: string;

    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    specialty: string;

    @Field()
    @IsNotEmpty()
    @MaxLength(255)
    password_digest: string;
}

//Servicio
@Injectable()
class CreateUserService{
    async execute(createUserDto: CreateUserDto): Promise<User>{
        const response = await axios.post('http://127.0.0.1:3000/users', createUserDto);
        return response.data;
    }
}

//Controlador
@Controller('users')
class CreateUserController{
    constructor(private readonly createUserService: CreateUserService){}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User>{
        return this.createUserService.execute(createUserDto);
    }
}
//Resolver
@Resolver(() => User)
class CreateUserResolver {
    constructor(private readonly createUserService: CreateUserService) {}

    @Mutation(() => User)
    async createUser(@Args('createUserDto') createUserDto: CreateUserDto): Promise<User> {
        return await this.createUserService.execute(createUserDto);
    }
}

@Module({
    providers: [CreateUserService, CreateUserResolver],
    controllers: [CreateUserController],
})
class CreateUserModule {}

export { CreateUserModule, CreateUserDto, User };