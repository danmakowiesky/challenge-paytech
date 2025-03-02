import {
  Body,
  Controller,
  Post,
  BadRequestException,
  UseGuards,
  Get,
  Param,
  Delete,
  NotFoundException,
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

export const idSchema = z
  .string()
  .uuid({ message: 'O id informado não é um UUID válido.' });

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

  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    try {
      return await this.teamService.getAllTeams();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException({
          message: 'Erro ao processar a requisição.',
          details: error.getResponse(),
        });
      }
    }
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    const parsed = idSchema.safeParse(id);
    if (!parsed.success) {
      throw new BadRequestException({
        message: 'Erro de validação',
        details: parsed.error.format(),
      });
    }
    try {
      const deleted = await this.teamService.deleteTeamById(id);
      if (!deleted) {
        throw new NotFoundException('Time não encontrado.');
      }
      return { message: 'Time deletado com sucesso.' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException({
          message: 'Erro ao processar a requisição.',
          details: error.getResponse(),
        });
      }
      throw error;
    }
  }
}
