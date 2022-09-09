import { Request, Response } from "express";

export default class UserController {

  constructor(private service: any) {
    this.service = service
  }

  register = async (req: Request, res: Response) => {
    try {
      const newUser = await this.service.register(req.body)
      
      return res.status(201).json(newUser);
    } catch (error) {
      const handleError = error as Error;
      return res.status(400).json(handleError.message)
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const user = await this.service.login(req.body);

      return res.status(201).json(user);
    } catch (error) {
      const handleError = error as Error;
      return res.status(400).json(handleError.message)
    }
  }
}