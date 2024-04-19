import { Request, Response } from "express";
import { FunctionGetEmail } from "../../services/flow/07_functionGetEmail";

export class GetEmailControllers {
  async handle(req: Request, res: Response) {
    try {

      const functionGetEmail = new FunctionGetEmail();
      const result = await functionGetEmail.execute();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
