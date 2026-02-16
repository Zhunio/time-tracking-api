import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = (request as Request & { user?: { isAdmin?: boolean } }).user;

    if (!user?.isAdmin) {
      throw new ForbiddenException('Only admin users can access this endpoint');
    }

    return true;
  }
}
