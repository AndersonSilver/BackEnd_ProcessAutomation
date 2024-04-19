import { Request, Response } from "express";
import { FunctionPutEmail } from "../../services/flow/06_functionPutEmail";

export class PutEmailControllers {
  async handle(req: Request, res: Response) {
    try {

      const functionPutEmail = new FunctionPutEmail();
      const result = await functionPutEmail.execute();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
