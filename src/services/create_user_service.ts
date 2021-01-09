import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/users';
import UserRepository from '../repositories/user_repository';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    const repo = getCustomRepository(UserRepository);

    const checkIfEmailExists = await repo.findOne({
      where: {
        email,
      },
    });
    if (checkIfEmailExists) {
      throw new Error('Email has already been taken');
    }

    const hashedPassword = await hash(password, 8);

    const user: User = repo.create({ name, email, password: hashedPassword });
    const createdUser = await repo.save(user);

    return createdUser;
  }
}
