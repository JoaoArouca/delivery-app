import { IUser } from '../interfaces/index';
import { sign } from "jsonwebtoken";
import fs from 'fs';

const generateToken = (payload: IUser) => {
  const secret = fs.readFileSync('jwt.key', 'utf8');
  

  const token = sign(payload, secret, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

  return token
}

export default generateToken;