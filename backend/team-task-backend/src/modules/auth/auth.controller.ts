import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import type { AuthResponseDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<AuthResponseDTO> {
    return this.authService.signIn(email, password);
  }
}
