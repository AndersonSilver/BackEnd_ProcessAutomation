import { Request, Response } from "express";
import { FunctionHabsServices } from "../../services/flow/09_FunctionHabsServices";
import fs from 'fs';
import path from 'path';

export class FunctionHabsControllers {
  async handle(req: Request, res: Response) {
    try {

      const habs = req.query.habs as string;


        const functionhabsFlows = new FunctionHabsServices();
        const result = await functionhabsFlows.execute({habs});

        return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}