// import User from '../database/model/UserModel'
import generateToken from '../tools/TokenGenerator';
import prisma from '../database.prisma';
import { IUser } from '../interfaces/index';

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

    const newUser = await prisma.userModel.create({
      data: { email, name, password: payload.password }
    });

    const token = generateToken({ name, email } as IUser);
    const { password, ...userInfo } = newUser;
    return { ...userInfo, token };
  }
}

export default UserService;