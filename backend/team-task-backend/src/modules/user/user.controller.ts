import {
  Body,
  Controller,
  Post,
  BadRequestException,
  Get,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { z } from 'zod';
import { UserDTO } from './user.dto';

const CreateUserDtoSchema = z.object({
  email: z
    .string()
    .email('O email deve ser válido')
    .nonempty('Email é obrigatório'),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .nonempty('Senha é obrigatória'),
});

@Controller('user')
export class UserController {
  logger: any;
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userDto: unknown) {
    try {
      const parsedUserDto = CreateUserDtoSchema.parse(userDto);
      return await this.userService.createUser(parsedUserDto as UserDTO);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(error.errors);
      }
      throw new BadRequestException('Erro ao processar a requisição.');
    }
  }

  @Get()
  async getAllUsers(): Promise<UserDTO[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      this.logger.error(`Erro ao tentar listar todos os usuários`, error.stack);
      throw new InternalServerErrorException('Erro ao buscar usuários');
    }
  }
}
