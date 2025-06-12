import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const apiKeyHeader = req.headers['x-api-key'];

    if (apiKeyHeader === 'alagrandelepusecuca123') return true;
    throw new UnauthorizedException('Invalid Api Key');
  }
}
