const axios = require("axios");
require("dotenv").config();
import * as fs from "fs";
import path from "path";
import { FunctionGetBlockScript } from "./04_functionGetBlockScript";

interface FlowsRequest {
  flow: string[];
}

export class FunctionSaveFlow {
  async execute({flow}: FlowsRequest) {

    const keysToRemove = [
      "createdAt",
      "updatedAt",
      "deletedAt",
      "versionName",
      "status",
      "publishedAt",
      "",
    ];
    const cleanedData = removeKeys(flow, keysToRemove);

    function removeKeys(obj: any, keysToRemove: string[]): any {
      if (Array.isArray(obj)) {
        return obj.map((item) => removeKeys(item, keysToRemove));
      } else if (typeof obj === "object" && obj !== null) {
        return Object.keys(obj).reduce((newObj, key) => {
          if (!keysToRemove.includes(key)) {
            newObj[key] = removeKeys(obj[key], keysToRemove);
          }
          return newObj;
        }, {});
      }
      return obj;
    }

    // const logsDirectory = path.resolve(__dirname, "../../logs/after/flow/flow");
    // const now = new Date();
    // const formattedDate = `${now.getFullYear()}A${now.getMonth()+1}M${now.getDate()}D`;
    // const formattedTime = `${now.getHours()}H${now.getMinutes()}M${now.getSeconds()}S`;
    // const fileName = path.resolve(logsDirectory, `after_flow_${formattedDate}_${formattedTime}.json`);

    // if (!fs.existsSync(logsDirectory)) {
    //   fs.mkdirSync(logsDirectory, { recursive: true });
    // }

    // fs.writeFileSync(fileName, JSON.stringify(cleanedData, null, 2));

    
    return {
      All:cleanedData,
      Blocks: cleanedData.automationFlowBlocks,
    }
  }
}
