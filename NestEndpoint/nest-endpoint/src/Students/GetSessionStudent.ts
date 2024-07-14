import { Module, Injectable, Controller, Post, Body, Inject, HttpStatus, UseGuards, Get } from '@nestjs/common';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Student } from './entities/student.entity';
import { AxiosInstance } from 'axios';
import { CustomHttpException } from '../Client/HttpException.client';
import { GuardModule } from '../Client/Guards/guards.module';
import { AuthGuardLaravel } from 'src/Client/Guards/auth-laravel.guard';

class tokenInput {
    @IsNotEmpty()
    token_laravel: string;
}

@Injectable()
class GetSessionStudentService {
    constructor(
        @Inject('LARAVEL_API') private readonly laravelApi: AxiosInstance,
    ) {}

    async execute(token: tokenInput): Promise<Student> {
        try {
            const response = await this.laravelApi.get('/get-session',{
                headers: {
                    Authorization: `Bearer ${token.token_laravel}`,
                },
            } );
            return response.data;
        } catch (e) {
            throw new CustomHttpException(
                e.response?.data || 'An error occurred',
                e.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}

@Controller('get_session')
class GetSessionStudentController {
    constructor(private getSessionStudentService: GetSessionStudentService) {}

    
    @Get()
    @UseGuards(AuthGuardLaravel)
    async create(@Body() token: tokenInput): Promise<Student> {
        return this.getSessionStudentService.execute(token);
    }
}


@Module({
    imports: [GuardModule],
    providers: [GetSessionStudentService],
    controllers: [ GetSessionStudentController],
})
export class GetSessionStudentModule{}
