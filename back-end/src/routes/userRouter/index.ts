import { Router } from "express";
import UserController from "../../controller/User-controller";
import UserService from "../../service/User-service";
import Validator from '../../tools/Validator';

const userRouter = Router();

const validator = new Validator();
const userService = new UserService(validator);
const user = new UserController(userService);

userRouter.post('/login');
userRouter.post('/register', user.register);

export default userRouter;