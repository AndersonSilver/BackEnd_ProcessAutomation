import { Request, Response } from "express";
import { FunctionTabsServices } from "../../services/flow/10_FunctionTabsServices";
import fs from 'fs';
import path from 'path';

export class FunctionTabsControllers {
  async handle(req: Request, res: Response) {
    try {

      const tabs = req.query.tabs as string;


        const functionhabsFlows = new FunctionTabsServices();
        const result = await functionhabsFlows.execute({tabs});

        return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}