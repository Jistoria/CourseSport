import { Module, Injectable, Controller, Post, Body, Inject, HttpStatus, UseGuards, Get } from '@nestjs/common';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { AxiosInstance } from 'axios';
import { CustomHttpException } from '../Client/HttpException.client';
import { GuardModule } from '../Client/Guards/guards.module';
import { AuthGuardLaravel } from 'src/Client/Guards/auth-laravel.guard';

class tokenInput {

    @IsNotEmpty()
    course_id: number;

    @IsNotEmpty()
    token_laravel: string;
}

@Injectable()
class CourseRegisterStudentService {
    constructor(
        @Inject('LARAVEL_API') private readonly laravelApi: AxiosInstance,
    ) {}

    async execute(token: tokenInput): Promise<void> {
        try {
            await this.laravelApi.post(`/course_register/${token.course_id}`, 
                { headers: { Authorization: `Bearer ${token.token_laravel ?? ''}` } }
            );
        } catch (e) {
            throw new CustomHttpException(
                e.response?.data || 'An error occurred',
                e.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}

@Controller('course-register')
class CourseRegisterStudentController {
    constructor(private courseRegisterStudentService: CourseRegisterStudentService) {}

    @Post()
    @UseGuards(AuthGuardLaravel)
    async create(@Body() token: tokenInput): Promise<void> {
        return this.courseRegisterStudentService.execute(token);
    }
}

@Module({
    imports: [GuardModule],
    providers: [CourseRegisterStudentService],
    controllers: [CourseRegisterStudentController],
})
export class CourseRegisterStudentModule{}