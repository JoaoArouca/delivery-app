// import User from '../database/model/UserModel'
import generateToken from '../tools/TokenGenerator';
import prisma from '../database.prisma';
import { IUser } from '../interfaces/index';
import { Md5 } from 'md5-typescript';
class UserService {

  constructor (private validator: any) {
    this.validator = validator;
  }

  async register (payload: IUser) {
    
    this.validator.isValidRegister(payload);
    const { name, email } = payload;

    const isValidEmail = await prisma.userModel.findFirst({ where: { email } });
    if (isValidEmail) {
      throw new Error('User already exists');
    }

    const hash = Md5.init(payload.password);    

    const newUser = await prisma.userModel.create({
      data: { email, name, password: hash }
    });

    const token = generateToken({ name, email } as IUser);
    const { password, ...userInfo } = newUser;
    return { ...userInfo, token };
  }

  async login (payload: IUser) {
    const { email, password } = payload;

    if (!email || !password) {
      throw new Error('Some fields are missing');
    }

    const hash = Md5.init(password);

    const user = await prisma.userModel.findFirst({ where: { email, password: hash } });

    if (!user) {
      throw new Error('Invalid fields');
    }

    console.log(user);
  }
}

export default UserService;