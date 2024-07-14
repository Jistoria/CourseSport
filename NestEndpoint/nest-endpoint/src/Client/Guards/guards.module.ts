import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { GuestGuardLaravel } from './guest-laravel.guard';
import { AuthGuardLaravel } from './auth-laravel.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            
            signOptions: { expiresIn: '5m' },
        })
    ],
    providers: [JwtStrategy, AuthGuardLaravel, GuestGuardLaravel],
    exports: [AuthGuardLaravel, GuestGuardLaravel],
})
export class GuardModule {constructor(private jwtService: JwtService) {
    console.log('GuardModule');
    console.log(this.jwtService);
}}
