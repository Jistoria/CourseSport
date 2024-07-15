import { Module, Injectable, Controller, Post, Body, Inject, HttpStatus, UseGuards, Get } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { AxiosInstance } from 'axios';
import { CustomHttpException } from '../Client/HttpException.client';
import { GuardModule } from '../Client/Guards/guards.module';
import { AuthGuardLaravel } from 'src/Client/Guards/auth-laravel.guard';
import { Course } from './entities/course.entity';

class tokenInput {
    @IsNotEmpty()
    token_laravel: string;
}

@Injectable()
class GetCoursesService {
    constructor(
        @Inject('LARAVEL_API') private readonly laravelApi: AxiosInstance,
    ) {}

    async execute(token: tokenInput): Promise<Course[]> {
        try {
            const response = await this.laravelApi.get('/dashboard_student/courses',{
                headers: {
                    Authorization: `Bearer ${token.token_laravel}`,
                },
            } );
            return response.data.courses;
        } catch (e) {
            throw new CustomHttpException(
                e.response?.data || 'An error occurred',
                e.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}

@Controller('get-courses')
class GetCoursesController {
    constructor(private getCoursesService: GetCoursesService) {}

    @Get()
    @UseGuards(AuthGuardLaravel)
    async create(@Body() token: tokenInput): Promise<Course[]> {
        return this.getCoursesService.execute(token);
    }
}
@Resolver(() => Course)
export class GetCoursesResolver {
    constructor(private getCoursesService: GetCoursesService) {}

    @Query(() => [Course])
    async getCourses(@Args('token_laravel') token_laravel: string): Promise<Course[]> {
        return this.getCoursesService.execute({ token_laravel });
    }
}
@Module({
    imports: [GuardModule],
    providers: [GetCoursesService, GetCoursesResolver],
    controllers: [ GetCoursesController],
})
export class GetCoursesModule{}
