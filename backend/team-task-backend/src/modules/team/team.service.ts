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

  async getAllTeams(): Promise<Team[]> {
    try {
      return await this.teamRepository.getAllTeams();
    } catch (error) {
      this.logger.error('Erro ao buscar todos os times', { error });
      throw new InternalServerErrorException('Erro ao buscar times');
    }
  }

  async deleteTeamById(id: string): Promise<unknown> {
    try {
      const team = await this.teamRepository.findById(id);
      if (!team) {
        throw new InternalServerErrorException('Id não encontrado');
      }
      return await this.teamRepository.deleteTeam(team);
    } catch (error) {
      this.logger.error('Erro ao deletar time', { error });
      throw new InternalServerErrorException('Erro ao deletar time');
    }
  }
}
