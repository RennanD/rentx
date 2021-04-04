import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

export interface IUsersRepository {
  create(userData: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
}
