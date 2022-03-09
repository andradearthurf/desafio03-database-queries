import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Esse ":title" significa que pode-se buscar títulos com nomes incompletos
    return this.repository
      .createQueryBuilder("games")
      .where("LOWER(games.title) LIKE LOWER(:title)", {title: `%${param}%`})
      .getMany();
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`
      SELECT COUNT(*) FROM games
    `); // Complete usando raw query
  }

  // id de um game
  async findUsersByGameId(id: string): Promise<User[]> {
    // Retornar os usuários que possuem o id desse game
    return this.repository
      .createQueryBuilder("games")
      .relation(Game, "users") // Na relação Game na tabela users. Game é do tipo array
      .of(id)
      .loadMany(); // Vou trazer vários usuários que possuem aquele game
  }
}
