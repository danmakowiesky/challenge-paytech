import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: UserDTO): Promise<any> {
    try {
      const user = await this.userRepository.create(createUserDto);
      return user;
    } catch (error) {
      this.logger.error(`Erro ao criar usuário`, error.stack);
      throw new InternalServerErrorException('Erro ao criar usuário');
    }
  }

  async getAllUsers(): Promise<UserDTO[]> {
    try {
      const users = await this.userRepository.getAll();
      return users;
    } catch (error) {
      this.logger.error('Erro ao buscar todos os usuários', { error });
      throw new InternalServerErrorException('Erro ao buscar usuários');
    }
  }
}
