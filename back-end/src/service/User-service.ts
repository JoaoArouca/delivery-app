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
    const { email } = payload;

    if (!email || !payload.password) {
      throw new Error('Some fields are missing');
    }

    const hash = Md5.init(payload.password);

    const user = await prisma.userModel.findFirst({ where: { email, password: hash } });
    const { password, ...userInfo } = user as IUser;
    const token = generateToken(userInfo  as IUser);

    if (!user) {
      throw new Error('Invalid fields');
    }
    return {...userInfo, token};
  }
}

export default UserService;