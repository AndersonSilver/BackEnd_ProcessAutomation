import { Request, Response } from "express";
import { FunctionSaveTriggersServices } from "../../services/flow/11_FunctionSaveTriggersServices";
import fs from 'fs';
import path from 'path';

export class FunctionSaveTriggersControllers {
  async handle(req: Request, res: Response) {
    try {

        const functionSaveTriggersFlows = new FunctionSaveTriggersServices();
        const result = await functionSaveTriggersFlows.execute();

        return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}