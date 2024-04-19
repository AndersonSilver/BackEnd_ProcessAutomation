import { Request, Response } from "express";
import { FunctionSelectFlow } from "../../services/flow/02_functionSelectFlow";

export class SelectFlowControllers {
  async handle(req: Request, res: Response) {

      const flowId  = req.query.flowId;
      const token = req.headers.authorization as string;
      
      const functionGetFlow = new FunctionSelectFlow();
      const result = await functionGetFlow.execute({
        flowId,
        token
      });

      return res.status(200).json(result);

  }
}