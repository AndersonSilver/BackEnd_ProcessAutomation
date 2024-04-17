const axios = require("axios");
require("dotenv").config();
import path from "path";
import fs from "fs";
import { FunctionIdsAndNames } from "./07_functionIdsAndNames";

interface Tokens {
  Authorization?: string;
  AuthorizationRA?: string;
  AuthorizationRCB?: string;
}

interface TabsRequest {
  tabId: string;
  jsonName: string;
  tokens: {
    tokenDev: Tokens;
    tokenHml: Tokens;
    tokenProd: Tokens;
  };
  deployFrom: string;
  to: string;
}

export class FunctionGetTabCreated {
  async execute({
    tabId,
    deployFrom,
    tokens,
    to,
    jsonName,
  }: TabsRequest) {
    const getAuthorization = async () => {
      if (to === "dev") {
        const access_token = tokens.tokenDev.Authorization;
        return access_token;
      }

      if (to === "hml") {
        const access_token = tokens.tokenHml.Authorization;
        return access_token;
      }

      if (to === "prod") {
        const access_token = tokens.tokenProd.Authorization;
        return access_token;
      }
    };
    const access_token = await getAuthorization();

    const {
      data: { data },
    } = await axios.get(
      `https://api-clients.tech4h.com.br/tab?id=${tabId}&form=true`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    if (!data) {
      throw new Error("Error function get tabs created.");
    }

    const tabJson = data;

    const logsDirectory = path.resolve(__dirname, "../../logs/after/tree_tabs_skills/");
    const fileName = path.resolve(logsDirectory, `${jsonName}`);

    if (!fs.existsSync(logsDirectory)) {
      fs.mkdirSync(logsDirectory, { recursive: true });
    }

    fs.writeFileSync(fileName, JSON.stringify(tabJson, null, 2));

    const functionIdsAndNames = new FunctionIdsAndNames();
    const result = await functionIdsAndNames.execute({
      tabJson,
      jsonName,
    });

    if (!result) {
      throw new Error("Error get tabs.");
    }

    return result;
  }
}
