// login-student.module.ts
import { Module, Injectable, Controller, Post, Body, Inject, HttpStatus, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Student } from './student.entity';
import { AxiosInstance } from 'axios';
import { CustomHttpException } from '../Client/HttpException.client';
import { GuestGuardLaravel } from 'src/Client/Guards/guest-laravel.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GuardModule } from '../Client/Guards/guards.module';


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
        private jwtService: JwtService,
    ) {
        console.log('LoginStudentService');
        console.log(this.jwtService); // Verifica la configuración aquí
    }

    async execute(credentials: CredentialsInput): Promise<{ user: Student, token: string, token_laravel:string }> {
        try {
            const response = await this.laravelApi.post('/login', credentials);
            
            const { data: userData, token } = response.data.user;
            
            // Genera un token JWT con la información del usuario
            const jwtToken = this.jwtService.sign({ userId: userData.cdl_user }, );

            return { user: userData, token: jwtToken, token_laravel: token};
        } catch (e) {
            throw new CustomHttpException(
                e.response?.data || 'An error occurred',
                e.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}

@Controller('login_student')
class LoginStudentController {
    constructor(private loginStudentService: LoginStudentService) {}

    @Post()
    @UseGuards(GuestGuardLaravel)
    async create(@Body() student: CredentialsInput): Promise<{ user: Student, token: string, token_laravel:string }> {
        return this.loginStudentService.execute(student);
    }
}


@Module({
    imports: [
        GuardModule
    ],
    providers: [LoginStudentService, GuestGuardLaravel],
    controllers: [LoginStudentController],
})
export class LoginStudentModule {}
