import { Controller, Post, Body, Injectable, Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { gender } from 'src/Enums/gender.enum';
import axios from 'axios';


//Entidad
@Entity()
@ObjectType()
class Student {

    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    name: string;

    
    @Column()
    @Field()
    lastname: string;

    @Column()
    @Field()
    email: string; 

    @Column()
    @Field()
    age: number;

    @Column()
    @Field()
    password: string;

    @Field()
    @Column({
        type: 'enum',
        enum: gender,
        default: gender.Activo
    })

    @Field()
    gender: gender;
}

//Input
@InputType()
class CredentialsInput {

    @Field()
    @IsNotEmpty()
    @MaxLength(10)
    cdl_user: number;

    @Field()
    @IsNotEmpty()
    password: string;
}


//Servicio
@Injectable()
class LoginStudentService {
    async execute(credentials: CredentialsInput): Promise<Student> {
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);
            return response.data;
        }catch(e){
            console.log(e.response.data);
        }
        
    }
}

@Controller('login_students')
class LoginStudentController {
    constructor(private loginStudentService: LoginStudentService) {}

    @Post()
    async create(@Body() student: CredentialsInput): Promise<Student> {
        return this.loginStudentService.execute(student);
    }
}

//Resolver
@Resolver()
class LoginStudentResolver {
    constructor(private loginStudentService: LoginStudentService) {}

    @Mutation(() => Student)
    async registerStudent(@Args('student') student: CredentialsInput) {
        return this.loginStudentService.execute(student);
    }
}

@Module({
    providers: [LoginStudentService, LoginStudentResolver],
    controllers: [LoginStudentController]
})
export class RegisterStudentModule {}