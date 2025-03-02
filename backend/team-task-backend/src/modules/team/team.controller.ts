import {
  Body,
  Controller,
  Post,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { z } from 'zod';
import { TeamDTO } from './team.dto';
import { AuthGuard } from '../auth/auth.guard';

const CreateTeamDtoSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome do time deve ter no mínimo 3 caracteres')
    .max(255, 'O nome do time não pode ter mais de 255 caracteres')
    .nonempty('O nome do time é obrigatório'),
});

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createTeam(@Body() team: TeamDTO) {
    try {
      const parsedTeamDto = CreateTeamDtoSchema.parse(team);
      return await this.teamService.createTeam(parsedTeamDto as TeamDTO);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(error.errors);
      }
      throw new BadRequestException('Erro ao processar a requisição.');
    }
  }
}
