import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/users';
import authConfig from '../config/auth';

interface RequestAuthenticateUserDTO {
  email: string;
  password: string;
}

interface UserWithoutPassword {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  password?: string;
}

interface ResponseAuthenticateUserDTO {
  user: UserWithoutPassword;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: RequestAuthenticateUserDTO): Promise<ResponseAuthenticateUserDTO> {
    const user = await getRepository(User)
      .createQueryBuilder()
      .where({ email })
      .select(['id', 'name', 'email', 'password', 'created_at', 'updated_at'])
      .getRawOne();

    const loginErrorMessage = 'Invalid email/password combination';

    if (!user) {
      throw new Error(loginErrorMessage);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error(loginErrorMessage);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const userWithoutPassword: UserWithoutPassword = {
      ...user,
    };

    delete userWithoutPassword.password;

    return {
      user: userWithoutPassword,
      token,
    };
  }
}
