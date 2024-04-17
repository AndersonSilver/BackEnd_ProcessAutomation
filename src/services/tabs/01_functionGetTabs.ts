const axios = require("axios");
require("dotenv").config();
import path from "path";
import { FunctionGetNameSkills } from "./02_functionGetNameSkills";

interface TabsRequest {
  tabId: string;
  deployFrom: string;
  to: string;
  jsonName: string;
}

export class FunctionGetTabs {
  async execute({
    tabId,
    deployFrom,
    to,
    jsonName
  }: TabsRequest) {

    const tokensPath = path.resolve(__dirname, "../../authToken/tokens.json");

    const tokens = require(tokensPath);
    const getAuthorization = async () => {
      if (deployFrom === "dev") {
        const access_token = tokens.tokenDev.Authorization;
        return access_token;
      }

      if (deployFrom === "hml") {
        const access_token = tokens.tokenHml.Authorization;
        return access_token;
      }

      if (deployFrom === "prod") {
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
      throw new Error("Error function get tabs.");
    }

    const tabJson = data;
    const skillsIds = data.skill_id;

    const functionGetNameSkills = new FunctionGetNameSkills();
    const result = await functionGetNameSkills.execute({
      tabJson,
      skillsIds,
      deployFrom,
      to,
      tokens,
      jsonName
    });
    return result;
  }
}
