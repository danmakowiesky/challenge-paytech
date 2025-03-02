import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private userRepository: UserRepository) {}

  async createUser(createUserDto: UserDTO): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const userData = {
        ...createUserDto,
        password: hashedPassword,
      };
      const user = await this.userRepository.create(userData);

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

  async findByUserName(email: string): Promise<UserDTO | null> {
    try {
      const user = await this.userRepository.findByUserName(email);
      console.log(email);
      return user;
    } catch (error) {
      this.logger.error('Erro ao buscar usuário', { error });
      throw new InternalServerErrorException('Erro ao buscar usuário');
    }
  }
}
