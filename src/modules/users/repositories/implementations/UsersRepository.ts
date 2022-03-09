import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = this.repository.findOneOrFail({id: user_id}, {relations: ['games']})
    // Para eu buscar, também, a tabela games, devo usar o findOneOrFail, já
    // que games tem uma relação de muito pra muitos com user.

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(
      `SELECT * 
      FROM users 
      ORDER BY first_name ASC`
    ); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Tenho que retornar tudo do usuário buscado pelo nome.
    return this.repository.query(
      `SELECT *
      FROM users 
      WHERE LOWER(first_name) = LOWER($1) 
      AND LOWER(last_name) = LOWER($2)
      `, [first_name, last_name] 
    ); // Complete usando raw query
  }
}
