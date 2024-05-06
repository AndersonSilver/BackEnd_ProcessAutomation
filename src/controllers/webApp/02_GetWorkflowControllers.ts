import { Request, Response } from "express";
import { GetWorkflowServices } from "../../services/webApp/02_GetWorkflowServices";

export class GetWorkflowControllers {
  async handle(req: Request, res: Response) {
    try {
      const client = req.query.client as string;
      const client_services = req.query.client_services as string;
      const token = req.headers.authorization as string;

      const functionGetWorkflow = new GetWorkflowServices();
      const result = await functionGetWorkflow.execute({client, client_services, token});

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
