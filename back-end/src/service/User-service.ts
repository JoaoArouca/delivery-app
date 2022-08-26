import User from '../database/model/UserModel'
// import generateToken from '../tools/tokenGenerator';
import { IUser } from '../interfaces/index';

class UserService {

  constructor (private validator: any) {
    this.validator = validator;
  }

  async register (payload: IUser) {
    // console.log(payload);
    
    this.validator.isValidRegister(payload);
    // const { name, email } = payload;

    const validEmail = await User.findOne({ where: { email: payload.email } });
    if (validEmail) {
      throw new Error('User already exists');
    }
    const newUser = User.create({payload});
    console.log(newUser);
    

    // const token = generateToken({ name, email } as IUser)
    // return token;   
  }
}

export default UserService;