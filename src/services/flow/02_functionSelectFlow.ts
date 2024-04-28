import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { FunctionSaveFlow } from "./03_functionSaveJsonFlow";
import { FunctionGetBlockScript } from "./04_functionGetBlockScript";
import { FunctionGetBlockEmail } from "./05_functionGetBlockEmail"

dotenv.config();


interface FlowsRequest {
  flowId: any;
  token: string;
}

export class FunctionSelectFlow {
  async execute({flowId}: { flowId: any }, token: FlowsRequest) {

      const { data } = await axios.get(
        `https://forceflow.tech4h.com.br/flows/${flowId}?expansions%5B0%5D=automationFlowBlocks&expansions%5B1%5D=automationFlowTriggers`,
        {
          headers: {
            Authorization: `${token.token}`,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );
      console.log(data);

      // const logsDirectory = path.resolve(__dirname, "../../logs/before/flow/flow");
      // const now = new Date();
      // const formattedDate = `${now.getFullYear()}A${now.getMonth()+1}M${now.getDate()}D`;
      // const formattedTime = `${now.getHours()}H${now.getMinutes()}M${now.getSeconds()}S`;
      // const fileName = path.resolve(logsDirectory, `before_flow_${formattedDate}_${formattedTime}.json`);

      // if (!fs.existsSync(logsDirectory)) {
      //   fs.mkdirSync(logsDirectory, { recursive: true });
      // }
  
      // fs.writeFileSync(fileName, JSON.stringify(data, null, 2));

      const functionSaveFlow = new FunctionSaveFlow();
      const {All, Blocks } = await functionSaveFlow.execute({flow: data});

      const functionGetBlocks = new FunctionGetBlockScript();
      const resultfunctionGetBlocks = await functionGetBlocks.execute({flow: Blocks});

      const functionGetEmails = new FunctionGetBlockEmail();
      const resultfunctionGetEmails = await functionGetEmails.execute({flow: Blocks});

      return {
        flowAntes: data,
        flowDepois: All,
        scripts: resultfunctionGetBlocks,
        emails: resultfunctionGetEmails
      };

  }
}
