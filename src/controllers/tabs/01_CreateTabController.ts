import { Request, Response } from "express";
import { FunctionGetTabs } from "../../services/tabs/01_functionGetTabs";

class CreateTabController {
  async handle(req: Request, res: Response) {
    try {
      const tabId = req.query.tabId as string;
      const projectName = req.projectName as string;
      const deployFrom = req.deployFrom as string;
      const to = req.to as string;
      const formatDate = req.formatDate;
      const formateTime = req.formateTime;
      const jsonName = req.jsonName;

      if (!tabId || !deployFrom || !to) {
        return res.status(400).json({ error: "Missing mandatory data" });
      }

      const functionGetTokens = new FunctionGetTabs();
      const result = await functionGetTokens.execute({
        tabId,
        deployFrom,
        to,
        jsonName,
      });

      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export { CreateTabController };
