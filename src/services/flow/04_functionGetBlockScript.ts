const axios = require("axios");
require("dotenv").config();
import * as fs from "fs";
import path from "path";
import { FunctionGetBlockEmail } from "./05_functionGetBlockEmail";

interface FlowsRequest {
  flow: any[];
}

export class FunctionGetBlockScript {
  async execute({flow}: FlowsRequest) {
    const scripts = flow.map((item) => {
        if (
          item.automationBlockType === "script" &&
          item.configuration &&
          item.configuration.script
        ) {const scripts = {
            name: item.configuration.script.name,
            content: item.configuration.script.content,
          };

          return scripts;
        } else {
          return null;
        }
      }).filter((script) => script !== null);

      const logsDirectory = path.resolve(__dirname, "../../logs/before/flow/scripts");
      const now = new Date();
      const formattedDate = `${now.getFullYear()}A${now.getMonth()+1}M${now.getDate()}D`;
      const formattedTime = `${now.getHours()}H${now.getMinutes()}M${now.getSeconds()}S`;
      const fileName = path.resolve(logsDirectory, `before_scripts_${formattedDate}_${formattedTime}.json`);

      if (!fs.existsSync(logsDirectory)) {
        fs.mkdirSync(logsDirectory, { recursive: true });
      }
  
      fs.writeFileSync(fileName, JSON.stringify(scripts, null, 2));

    if (!scripts) {
      throw new Error("Error Get Scripts Flow");
    }

    if (!scripts || scripts.length === 0) {
      return "scripts not found in flow";
    }


    return scripts;
  }
}
