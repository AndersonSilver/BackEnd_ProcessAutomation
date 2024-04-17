import axios from "axios";
import path from "path";
import fs from 'fs';
import os from 'os';

export class FunctionSaveTriggersServices {
  async execute() {
    const idsTriggersPath = path.resolve(__dirname, "../../logs/idsTriggers");
    const tokensPath = path.resolve(__dirname, "../../authToken/tokens.json");
    const tokens = require(tokensPath);

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
              Authorization: `Bearer ${tokens.tokens.AuthorizationRA}`,
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