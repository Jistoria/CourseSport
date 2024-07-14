import { Module, Injectable, Controller, Post, Body, Inject, HttpStatus, UseGuards, Get } from '@nestjs/common';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { AxiosInstance } from 'axios';
import { CustomHttpException } from '../Client/HttpException.client';
import { GuardModule } from '../Client/Guards/guards.module';
import { AuthGuardLaravel } from 'src/Client/Guards/auth-laravel.guard';
import { Course } from './entities/course.entity';
import { Resolver, Query, Args } from '@nestjs/graphql';

class tokenInput {
    @IsNotEmpty()
    token_laravel: string;
}

@Injectable()
class GetMyCoursesService {
    constructor(
        @Inject('LARAVEL_API') private readonly laravelApi: AxiosInstance,
    ) {}

    async execute(token: tokenInput): Promise<Course[]> {
        try {
            const response = await this.laravelApi.get('/my_courses', {
                headers: { Authorization: `Bearer ${token.token_laravel ?? ''}` },
            });
            return response.data.courses;
        } catch (e) {
            throw new CustomHttpException(
                e.response?.data || 'An error occurred',
                e.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}

@Controller('my-courses')
class GetMyCoursesController {
    constructor(private getMyCoursesService: GetMyCoursesService) {}

    @Get()
    @UseGuards(AuthGuardLaravel)
    async create(@Body() token: tokenInput): Promise<Course[]> {
        return this.getMyCoursesService.execute(token);
    }
}


@Resolver(() => Course)
export class GetMyCoursesResolver {
    constructor(private getMyCoursesService: GetMyCoursesService) {}

    @Query(() => [Course])
    @UseGuards(AuthGuardLaravel)
    async getMyCourses(@Args('token_laravel') token_laravel: string): Promise<Course[]> {
        return this.getMyCoursesService.execute({ token_laravel });
    }
}

@Module({
    imports: [GuardModule],
    providers: [GetMyCoursesService, GetMyCoursesResolver],
    controllers: [GetMyCoursesController],
})
export class GetMyCoursesModule{}