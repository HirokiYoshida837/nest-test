import { Injectable, NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }



  async create(createUserDto: CreateUserDto): Promise<User> {

    return this.userRepository
      .save(createUserDto)
      .catch(e => {
        throw new InternalServerErrorException(`[${e.message}]：ユーザーの登録に失敗しました。`);
      });
  }

  async findAll(): Promise<User[]> {

    return this.userRepository
      .find()
      .catch(e => {
        throw new InternalServerErrorException(`[${e.message}]：ユーザーの取得に失敗しました。`);
      });

  }

  findOne(id: number) {
    return this.userRepository
      .findOne({ where: { id: id } })
      .then(res => {
        if (!res) {
          throw new NotFoundException();
        }
        return res;
      })
    // .catch(e => {
    //   throw new InternalServerErrorException(`[${e.message}]：ユーザーの取得に失敗しました。`);
    // });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException();
    }

    user.name = updateUserDto.name;
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<DeleteResult> {

    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException();
    }

    return await this.userRepository.delete(user);
  }
}
