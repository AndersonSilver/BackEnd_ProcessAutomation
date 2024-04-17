const axios = require("axios");
require("dotenv").config();
import path from "path";

interface TabsRequest {
  deployFrom: string;
  jsonName: string;
}

export class FunctionGetAllTabs {
  async execute({ deployFrom, jsonName}: TabsRequest) {
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

    let allTabs = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const {
        data: {
          data: { responseTabs },
        },
      } = await axios.get(
        `https://api-clients.tech4h.com.br/tab?page=${page}&qtd=7&isInformationTab=false`,
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      const getTabs = responseTabs
        .filter((tab) => !tab.default)
        .map((tab) => {
          return {
            id: tab.id,
            name: tab.name,
            skill_id: tab.skill_id,
          };
        });
      const getIdsAndNamesTabs = await Promise.all(getTabs);

      if (!getIdsAndNamesTabs) {
        throw new Error("Error Get tabs.");
      }

      if (getIdsAndNamesTabs.length > 0) {
        allTabs = [...allTabs, ...getIdsAndNamesTabs];
        page++;
      } else {
        hasMorePages = false;
      }
    }
    return allTabs;
  }
}
