import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Team } from './team.entity';

@Injectable()
export class TeamRepository extends Repository<Team> {
  constructor(private readonly dataSource: DataSource) {
    super(Team, dataSource.createEntityManager());
  }

  async createTeam(name: string): Promise<Team> {
    const team = this.create({ name });
    return await this.save(team);
  }

  async getAllTeams(): Promise<Team[]> {
    return await this.find();
  }

  async findById(id: string): Promise<Team> {
    return await this.findOne({ where: { id } });
  }

  async deleteTeam(team: Team): Promise<unknown> {
    return await this.delete(team.id);
  }
}
