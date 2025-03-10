import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: UserDTO): Promise<any> {
    const user = this.userRepository.create({
      email: data.email,
      password: data.password,
    });

    return await this.userRepository.save(user);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByUserName(email: string): Promise<any> {
    console.log('respository', email);
    return await this.userRepository.findOne({ where: { email } });
  }
}
