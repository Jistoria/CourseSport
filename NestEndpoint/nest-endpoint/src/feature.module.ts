import { Get, Module } from '@nestjs/common';
import { CreateUserModule } from './Users/CreateUser';
import { GetUserModule } from './Users/GetUser';
import { CreateRoleModule } from './Roles/CreateRoles';
import { RegisterStudentModule } from './Students/RegisterStudent';
import { LoginStudentModule } from './Students/LoginStudent';
import { GuardModule } from './Client/Guards/guards.module';
import { GetSessionStudentModule } from './Students/GetSessionStudent';
import { GetCoursesModule } from './Students/GetCourses';
import { CourseRegisterStudentModule } from './Students/CourseRegisterStudent';
import { CourseUnregisterStudentModule } from './Students/CourseUnresgisterStudent';
import { GetMyCoursesModule } from './Students/GetMyCourses';

@Module({
    imports: [
        GuardModule,
        CreateUserModule,
        GetUserModule,
        CreateRoleModule,
        RegisterStudentModule,
        LoginStudentModule,
        GetSessionStudentModule,
        GetCoursesModule,
        CourseRegisterStudentModule,
        CourseUnregisterStudentModule,
        GetMyCoursesModule
    ],
    exports: [
        CreateUserModule,
        GetUserModule,
        CreateRoleModule,
        RegisterStudentModule,
        LoginStudentModule,
        GetSessionStudentModule,
        GetCoursesModule,
        CourseRegisterStudentModule,
        CourseUnregisterStudentModule,
        GetMyCoursesModule
    ],
    
})
export class FeaturesModule {}
