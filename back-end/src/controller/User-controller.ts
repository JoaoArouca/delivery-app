import { Request, Response } from "express";

export default class UserController {

  constructor(private service: any) {
    this.service = service
  }

  register = async (req: Request, res: Response) => {
    try {
      const newUser = await this.service.register(req.body)
      
      return res.status(201).json({ token: newUser });
    } catch (error) {
      const handleError = error as Error;
      return res.status(400).json(handleError.message)
    }
  }
}