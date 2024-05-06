import axios from "axios";
import path from "path";
import fs from "fs";

interface Tab {
  id: string;
}
interface FunctionTokenServices {
  token: string;
}

export class WorkflowGetTabulacaoServices {
  async execute(token: FunctionTokenServices) {

    let page = 1;
    let hasMoreData = true;
    let response;

    while (hasMoreData) {
      response = await axios.get(
        `https://api-clients.tech4h.com.br/tab?filter=name&page=${page}`,
        {
          headers: {
            Authorization: `${token.token}`,
          },
        }
      );

      if (response.data.length > 0) {
        page++;
      } else {
        hasMoreData = false;
      }
    }

    const tabs = response.data.data.responseTabs.map((tab: Tab) => tab.id);
    return tabs;
  }
}