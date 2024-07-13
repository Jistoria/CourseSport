import { Module } from '@nestjs/common';
import { CreateUserModule } from './Users/CreateUser';
import { GetUserModule } from './Users/GetUser';
import { CreateRoleModule } from './Roles/CreateRoles';
import { RegisterStudentModule } from './Students/RegisterStudent';
import { LoginStudentModule } from './Students/LoginStudent';
import { GuardModule } from './Client/Guards/guards.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        GuardModule,
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
