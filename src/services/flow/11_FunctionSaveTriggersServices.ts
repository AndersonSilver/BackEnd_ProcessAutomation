import axios from "axios";
import path from "path";
import fs from 'fs';
import os from 'os';

interface FunctionTokenServices {
  token: string;
}

export class FunctionSaveTriggersServices {
  async execute(token : FunctionTokenServices) {
    const idsTriggersPath = path.resolve(__dirname, "../../logs/idsTriggers");

    const files = fs.readdirSync(idsTriggersPath);
    files.sort((a, b) => fs.statSync(path.join(idsTriggersPath, b)).mtime.getTime() - fs.statSync(path.join(idsTriggersPath, a)).mtime.getTime());
    const latestFile = files[0];

    const fileContent = fs.readFileSync(path.join(idsTriggersPath, latestFile), 'utf8').trim();
    const uuid = JSON.parse(fileContent).id;

    const publishFlow = async () => {
      try {
        const {
          data: { id: idPublishedFlow },
        } = await axios.post(
          `https://forceflow.tech4h.com.br/flows/${uuid}/publish`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token.token}`,
            },
          }
        );
        return idPublishedFlow;
      } catch (error: any) {
        return error.response.data;
      }
    };
    const result = await publishFlow();

    return {result};
  }
}