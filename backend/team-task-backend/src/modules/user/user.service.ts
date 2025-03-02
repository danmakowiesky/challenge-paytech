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
}
