const axios = require("axios");
require("dotenv").config();
import fs from "fs";
import path from "path";

interface FlowsRequest {
  deployFrom: string;
  to: string;
  jsonName: string;
}

export class FunctionGetEmail {
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

      let page = 1;
      const allNames = {};
      let hasMorePages = true;
      let index = 0;

      while (hasMorePages) {
        let response = await axios.get(
          `https://forceflow.tech4h.com.br/email-templates?search=&order=last&take=10&page=${page}`,
          {
            maxBodyLength: Infinity,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + access_token,
            },
          }
        );

        const names = response.data.emailTemplates.map((name) => {
          return name.name;
        });

        names.forEach((name) => {
          allNames[`Email - ${index}`] = name;
          index++;
        });

        hasMorePages = names.length > 0;
        page++;
      }

      return allNames;
    }
  }
}
