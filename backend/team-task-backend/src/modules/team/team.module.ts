import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRepository } from './team.repository';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TeamRepository])],
  controllers: [TeamController],
  exports: [TeamService],

  providers: [TeamService, TeamRepository],
})
export class TeamModule {}
