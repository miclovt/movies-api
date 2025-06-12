import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  async GetUser(
    userName: string,
    userPass: string,
  ): Promise<UserEntity | null> {
    return await this._userRepository.findOne({
      where: { name: userName, pass: userPass },
    });
  }

  async AddUser(entity: Omit<UserEntity, 'id'>): Promise<string> {
    const result = await this._userRepository
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([{ ...entity }])
      .returning('id')
      .execute();

    return Promise.resolve(result.raw.id);
  }
}
