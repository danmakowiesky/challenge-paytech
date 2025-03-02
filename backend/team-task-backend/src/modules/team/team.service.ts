import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamRepository } from './team.repository';
import { TeamDTO } from './team.dto';
import type { Team } from './team.entity';

@Injectable()
export class TeamService {
  private readonly logger = new Logger(TeamService.name);

  constructor(
    @InjectRepository(TeamRepository)
    private teamRepository: TeamRepository,
  ) {}

  async createTeam(createTeamDto: TeamDTO): Promise<Team> {
    try {
      const { name } = createTeamDto;
      return await this.teamRepository.createTeam(name);
    } catch (error) {
      this.logger.error(`Erro ao criar time`, error.stack);
      throw new InternalServerErrorException('Erro ao criar time');
    }
  }
}
