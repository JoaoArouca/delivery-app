import { IUser } from './../interfaces/index';
import Joi from "joi";

export default class Validator {
  isValidRegister (payload: IUser): void {
    const joi = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      name: Joi.string().required(),
    }).validate(payload);

    if (joi.error) { throw new Error(joi.error.message) }
  }
}