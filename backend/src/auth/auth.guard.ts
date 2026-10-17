import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // 1. Get the HTTP request object
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        // 2. Check if the Authorization header is present
        if (!authHeader?.startsWith('Bearer ')) {
            throw new UnauthorizedException('Authorization header missing');
        }

        // 3. Split "Bearer <token>" into two parts: type and token
        const [type, token] = authHeader.split(7);

        if (type !== 'Bearer' || !token.trim()) {
            throw new UnauthorizedException('Invalid token format');
        }

        // 4. Verify token and attach user data to the request
        try {
            const payload = await this.jwtService.verifyAsync(token);
            request.user = payload; // Now controllers can access request.user
            return true;
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

}