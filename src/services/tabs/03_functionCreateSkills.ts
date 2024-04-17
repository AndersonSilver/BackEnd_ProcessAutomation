const axios = require("axios");
require("dotenv").config();
const slaDefault = require("./sla.json");
import { FunctionJsonTabs } from "./04_functionCreateJsonTabs";

interface Tokens {
  Authorization?: string;
  AuthorizationRA?: string;
  AuthorizationRCB?: string;
}
interface SkillsRequest {
  tabJson: string[];
  skillNames: string[];
  tokens: {
    tokenDev: Tokens;
    tokenHml: Tokens;
    tokenProd: Tokens;
  };
  deployFrom: string;
  to: string;
  jsonName: string;
}

export class FunctionCreateSkills {
  async execute({
    tabJson,
    skillNames,
    deployFrom,
    tokens,
    to,
    jsonName
  }: SkillsRequest) {
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

    const createSkills = async (names) => {
      const response = await axios.post(
        `https://api-clients.tech4h.com.br/skill`,
        {
          name: names,
          inactivity_time: 35996400,
          weight_active: 3,
          weight_inactive: 1,
          sla: slaDefault,
          waiting_time: 0,
          balancer: false,
        },
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );
      return response.data;
    };

    // const createSkillPromises = skillNames.map((names) => createSkills(names));
    // const response = await Promise.all(createSkillPromises);
    // const skills_ids = response.map((skill) => skill.data.id);

    // if (!response) {
    //   throw new Error("Error function creating skills.");
    // }

    const skills_ids = ["f70b6ee1-6514-445a-816f-170adf54efb9"];

    if (!skills_ids) {
      throw new Error("Error get create skills.");
    }

    const functionJsonTabs = new FunctionJsonTabs();
    const result = await functionJsonTabs.execute({
      tabJson,
      skills_ids,
      tokens,
      deployFrom,
      to,
      jsonName
    });
    return result;
  }
}
