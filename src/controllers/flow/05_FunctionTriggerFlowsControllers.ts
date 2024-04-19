import { Request, Response } from "express";
import { FunctionGatilhoFlowsServices } from "../../services/flow/08_GatilhoFlowsServices";
import fs from 'fs';
import path from 'path';

export class FunctionTriggerFlowsControllers {
  async handle(req: Request, res: Response) {
    try {

      const token = req.headers.authorization as string;
      
      const dirPath = path.join(__dirname, '../../logs/before/flow/flow');

      const files = fs.readdirSync(dirPath);

      let latestFile;
      let latestTime = 0;
      for (const file of files) {
          const filePath = path.join(dirPath, file);
          const stat = fs.statSync(filePath);
          if (stat.isFile() && stat.mtimeMs > latestTime) {
              latestFile = file;
              latestTime = stat.mtimeMs;
          }
      }

      if (!latestFile) {
          throw new Error('No files found in the directory');
      }
      
        const functionGatilhoFlows = new FunctionGatilhoFlowsServices();
        const result = await functionGatilhoFlows.execute({token});

        return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}