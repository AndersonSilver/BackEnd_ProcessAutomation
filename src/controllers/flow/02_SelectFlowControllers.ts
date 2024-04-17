import { Request, Response } from "express";
import { FunctionSelectFlow } from "../../services/flow/02_functionSelectFlow";

export class SelectFlowControllers {
  async handle(req: Request, res: Response) {

      const flowId  = req.query.flowId;
      
      const functionGetFlow = new FunctionSelectFlow();
      const result = await functionGetFlow.execute({
        flowId,
      });

      return res.status(200).json(result);

  }
}