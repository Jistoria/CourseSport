import { Module } from '@nestjs/common';
import { CreateUserModule } from './Users/CreateUser';
import { GetUserModule } from './Users/GetUser';
import { CreateRoleModule } from './Roles/CreateRoles';
import { RegisterStudentModule } from './Students/RegisterStudent';
import { LoginStudentModule } from './Students/LoginStudent';

@Module({
    imports: [
        CreateUserModule,
        GetUserModule,
        CreateRoleModule,
        RegisterStudentModule,
        LoginStudentModule,
    ],
    exports: [
        CreateUserModule,
        GetUserModule,
        CreateRoleModule,
        RegisterStudentModule,
        LoginStudentModule,
    ],
})
export class FeaturesModule {}
