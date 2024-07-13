// login-student.module.ts
import { Module, Injectable, Controller, Post, Body, Inject } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Student } from './student.entity';
import { AxiosInstance } from 'axios';


class CredentialsInput {
    
    @IsNotEmpty()
    @MaxLength(10)
    cdl_user: number;

    @IsNotEmpty()
    password: string;
}

@Injectable()
class LoginStudentService {
    constructor(
        @Inject('LARAVEL_API') private readonly laravelApi: AxiosInstance,
    ) {}

    async execute(credentials: CredentialsInput): Promise<Student> {
        try {
            const response = await this.laravelApi.post('/login', credentials);
            return response.data;
        } catch (e) {
            console.log(e.response.data);
        }
    }
}

@Controller('login_student')
class LoginStudentController {
    constructor(private loginStudentService: LoginStudentService) {}

    @Post()
    async create(@Body() student: CredentialsInput): Promise<Student> {
        return this.loginStudentService.execute(student);
    }
}

// @Resolver()
// class LoginStudentResolver {
//     constructor(private loginStudentService: LoginStudentService) {}

//     @Mutation(() => Student)
//     async registerStudent(@Args('student') student: CredentialsInput) {
//         return this.loginStudentService.execute(student);
//     }
// }

@Module({
    providers: [LoginStudentService],
    controllers: [LoginStudentController],
})
export class LoginStudentModule {}
