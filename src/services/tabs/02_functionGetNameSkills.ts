const axios = require("axios");
require("dotenv").config();
import { FunctionCreateSkills } from "./03_functionCreateSkills";

interface Tokens {
  Authorization?: string;
  AuthorizationRA?: string;
  AuthorizationRCB?: string;
}

interface SkillsRequest {
  tabJson: string[];
  skillsIds: string[];
  tokens: {
    tokenDev: Tokens;
    tokenHml: Tokens;
    tokenProd: Tokens;
  };
  deployFrom: string;
  to: string;
  jsonName: string;
}

export class FunctionGetNameSkills {
  async execute({
    tabJson,
    skillsIds,
    deployFrom,
    to,
    tokens,
    jsonName
  }: SkillsRequest) {
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

    const fetchSkillData = async (skillId) => {
      const response = await axios.get(
        `https://api-clients.tech4h.com.br/skill?id=${skillId}&form=true`,
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );
      return response.data.data.skill.name;
    };

    const skillPromises = skillsIds.map((skillId) => fetchSkillData(skillId));
    const skillNames = await Promise.all(skillPromises);

    if (!skillNames) {
      throw new Error("Error function get name skills.");
    }

    const functionCreateSkills = new FunctionCreateSkills();
    const result = await functionCreateSkills.execute({
      tabJson,
      skillNames,
      tokens,
      deployFrom,
      to,
      jsonName
    });
    return result;
  }
}
