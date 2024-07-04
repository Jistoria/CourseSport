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
class StudentInput {

    @Field()
    @IsNotEmpty()
    @MaxLength(10)
    cdl_user: number;

    @Field()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsNotEmpty()
    lastname: string;

    @Field()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    age: number;

    @Field()
    @IsNotEmpty()
    password: string;

    @Field()
    @IsNotEmpty()
    gender: gender;

    @Field()
    @IsNotEmpty()
    conf_password: string;
}


//Servicio
@Injectable()
class RegisterStudentService {
    async execute(student: StudentInput): Promise<Student> {
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/register', student);
            return response.data;
        }catch(e){
            console.log(e.response.data);
        }
        
    }
}

@Controller('register_students')
class RegisterStudentController {
    constructor(private registerStudentService: RegisterStudentService) {}

    @Post()
    async create(@Body() student: StudentInput): Promise<Student> {
            return this.registerStudentService.execute(student);
    }
}

//Resolver
@Resolver()
class RegisterStudentResolver {
    constructor(private registerStudentService: RegisterStudentService) {}

    @Mutation(() => Student)
    async registerStudent(@Args('student') student: StudentInput) {
        return this.registerStudentService.execute(student);
    }
}

@Module({
    providers: [RegisterStudentService, RegisterStudentResolver],
    controllers: [RegisterStudentController]
})
export class RegisterStudentModule {}
        
