import { Controller, Post, Body, Injectable, Module, Inject, UseGuards } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { AxiosInstance } from 'axios';
import { GuardModule } from '../Client/Guards/guards.module';
//guardias
import { JwtAuthGuard } from '../Client/Guard Ruby/jwt-auth.guard';

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

    constructor(
        @Inject('RUBY_API')
        private readonly rubyApi: AxiosInstance
    ){}

    async execute(createUserDto: CreateUserDto): Promise<User>{
        const response = await this.rubyApi.post('/users', createUserDto)
        return response.data
    }
    
}

//Controlador
@Controller('users')
class CreateUserController{
    constructor(private readonly createUserService: CreateUserService){}

    @Post()
    @UseGuards(JwtAuthGuard)
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
    imports:[
        GuardModule
    ],
    providers: [CreateUserService, CreateUserResolver],
    controllers: [CreateUserController],
})
class CreateUserModule {}

export { CreateUserModule, CreateUserDto, User };