import { Router } from "express";
// import UserController from "../../controller/user-controller";
// import UserService from "../../service/user-service";
// import Validator from "../../tools/validator";

const userRouter = Router();

// const validator = new Validator()
// const userService = new UserService(validator)
// const user = new UserController(userService);

userRouter.post('/login');
userRouter.post('/register');

export default userRouter;