const axios = require("axios");
require("dotenv").config();
import fs from "fs";
import path from "path";

interface FlowsRequest {
  deployFrom: string;
  to: string;
  jsonName: string;
}

export class FunctionPutEmail {
  async execute({ deployFrom, to, jsonName }: FlowsRequest) {
    const tokensPath = path.resolve(__dirname, "../../authToken/tokens.json");

    if (fs.existsSync(tokensPath)) {
      const tokens = require(tokensPath);
      const getAuthorization = async () => {
        if (to === "dev") {
          const access_token = tokens.tokenDev.AuthorizationRA;
          return access_token;
        }

        if (to === "hml") {
          const access_token = tokens.tokenHml.AuthorizationRA;
          return access_token;
        }

        if (to === "prod") {
          const access_token = tokens.tokenProd.AuthorizationRA;
          return access_token;
        }
      };
      const access_token = await getAuthorization();

      function readJSONFiles(directoryPath: string): any {
        const resolvedPath = path.resolve(__dirname, directoryPath);
        const files = fs.readdirSync(resolvedPath);
        return files
          .filter((file) => path.extname(file) === ".json")
          .flatMap((file) => {
            const rawData = fs.readFileSync(
              path.join(resolvedPath, file),
              "utf-8"
            );
            return JSON.parse(rawData);
          });
      }

      const logsDirectory = path.resolve(__dirname, "../../logs/before/flow/emails");
      const fileName = path.resolve(logsDirectory, `${jsonName}`);
      const fileContent = JSON.parse(fs.readFileSync(fileName, 'utf-8'));

      const createFlow = async (data): Promise<any> => {

        let response = await axios.put("https://forceflow.tech4h.com.br/email-templates",data,
          {
            maxBodyLength: Infinity,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        return response.data;
      };
      
      const createFlowNames = await Promise.all(fileContent.map((data) => createFlow(data)));
      
      return createFlowNames;
    }
  }
}


