import { Request, Response } from "express";
import { FunctionGetAllTabs } from "../../services/tabs/00_functionGetAllTabs";

export class getAllTabController {
  async handle(req: Request, res: Response) {
    try {
      const deployFrom = req.deployFrom as string;
      const projectName = req.projectName as string;
      const jsonName = req.jsonName as string;

      if (!deployFrom) {
        return res.status(400).json({ error: "Missing mandatory data" });
      }

      const functionGetAllTabs = new FunctionGetAllTabs();
      const result = await functionGetAllTabs.execute({
        deployFrom,
        jsonName
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
