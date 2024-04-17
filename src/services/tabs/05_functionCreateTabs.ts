const axios = require("axios");
require("dotenv").config();
import { FunctionGetTabCreated } from "./06_functionGetTabCreated";

interface Tokens {
  Authorization?: string;
  AuthorizationRA?: string;
  AuthorizationRCB?: string;
}
interface TabsRequest {
  tabJson: string[];
  jsonName: string;
  tokens: {
    tokenDev: Tokens;
    tokenHml: Tokens;
    tokenProd: Tokens;
  };
  deployFrom: string;
  to: string;
}

export class FunctionCreateTabs {
  async execute({
    tabJson,
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

    const response = await axios.post(
      `https://api-clients.tech4h.com.br/tab`,
      tabJson,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    if (!response.data) {
      throw new Error("Error function create tabs.");
    }

    const tabId = response.data.data;

    const functionGetTabCreated = new FunctionGetTabCreated();
    const result = await functionGetTabCreated.execute({
      tabId,
      jsonName,
      deployFrom,
      tokens,
      to,
    });

    if (!result) {
      throw new Error("Error create tabs.");
    }

    return result;
  }
}
