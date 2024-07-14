import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GuestGuardLaravel implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (token) {
            try {
                // Verifica el token, si es válido significa que el usuario ya está autenticado
                this.jwtService.verify(token);

                throw new UnauthorizedException('You are already logged in.');
            } catch (e) {
                if (e.name !== 'UnauthorizedException') {
                    return true;
                }
                throw e;
            }
        }
        
        return true;
    }
}
