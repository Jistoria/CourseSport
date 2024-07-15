import { Module, Injectable, Controller, Post, Body, HttpStatus, Inject } from '@nestjs/common';
import { IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { CustomHttpException } from '../Client/HttpException.client';
import { Student } from './entities/student.entity';
import { gender } from 'src/Enums/gender.enum';
import { AxiosInstance } from 'axios';

class StudentInput {
    @IsNotEmpty()
    @MaxLength(10)
    cdl_user: number;

    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    lastname: string;

    
    @IsNotEmpty()
    email: string;

    
    @IsNumber()
    age: number;

    
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    gender: gender;


    @IsNotEmpty()
    conf_password: string;

    token_laravel: string;
}

@Injectable()
export class RegisterStudentService {
    constructor(
        @Inject('LARAVEL_API') private readonly laravelApi: AxiosInstance,
    ) {}

    async execute(student: StudentInput): Promise<Student> {
        try {
            const response = await this.laravelApi.post('/register', student,
                { headers: { Authorization: `Bearer ${student.token_laravel ?? ''}` } }
            );
            return response.data;
        } catch (e) {
            throw new CustomHttpException(
                e.response?.data || 'An error occurred',
                e.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}

@Controller('register_student')
class RegisterStudentController {
    constructor(private registerStudentService: RegisterStudentService) {}

    @Post()
    async create(@Body() student: StudentInput): Promise<Student> {
        return this.registerStudentService.execute(student);
    }
}

// @Resolver()
// class RegisterStudentResolver {
//     constructor(private registerStudentService: RegisterStudentService) {}

//     @Mutation(() => Student)
//     async registerStudent(@Args('student') student: StudentInput) {
//         return this.registerStudentService.execute(student);
//     }
// }

@Module({
    providers: [RegisterStudentService],
    controllers: [RegisterStudentController],
})
export class RegisterStudentModule {}