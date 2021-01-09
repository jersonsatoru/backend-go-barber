import { EntityRepository, Repository } from 'typeorm';
import User from '../models/users';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {}
