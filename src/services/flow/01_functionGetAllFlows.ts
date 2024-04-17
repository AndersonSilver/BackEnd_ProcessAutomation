const axios = require("axios");
require("dotenv").config();
import path from "path";

interface FlowsRequest {
  deployFrom: string;
  to: string;
  jsonName: string;
}

export class FunctionGetAllFlowsServices {
  async execute() {

    const tokensPath = path.resolve(__dirname, "../../authToken/tokens.json");

    const tokens = require(tokensPath);

    let allFlows = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const { data } = await axios.get(
        `https://forceflow.tech4h.com.br/flows?search=&order=last&take=17&page=${page}`,
        {
          headers: {
            Authorization: "Bearer " + tokens.tokens.AuthorizationRA,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      const getflows = data.flows.map((flow) => {
        return {
          id: flow.id,
          name: flow.name,
        };
      });
      const getIdsAndNamesFlow = await Promise.all(getflows);

      if (!getIdsAndNamesFlow) {
        throw new Error("Error getting flows.");
      }

      if (getIdsAndNamesFlow.length > 0) {
        allFlows = [...allFlows, ...getIdsAndNamesFlow];
        page++;
      } else {
        hasMorePages = false;
      }
    }
    return allFlows;
  }
}
