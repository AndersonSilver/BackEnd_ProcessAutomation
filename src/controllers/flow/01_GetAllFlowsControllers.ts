import { Request, Response } from "express";
import { FunctionGetAllFlowsServices } from "../../services/flow/01_functionGetAllFlows";

export class GetAllFlowsControllers {
  async handle(req: Request, res: Response) {
    try {

      const functionGetAllFlows = new FunctionGetAllFlowsServices();
      const result = await functionGetAllFlows.execute();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
