import { AuthService } from './service/auth.service';

export const services: { [key: string]: { provide: any, deps: any[], useClass?: any } } = {
  'authService': {
    provide: AuthService,
    deps: []
  }
}
