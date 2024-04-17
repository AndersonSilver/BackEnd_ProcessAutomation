import axios from "axios";
import path from "path";
import fs from "fs";

interface Tab {
  id: string;
}

export class WorkflowGetTabulacaoServices {
  async execute() {
    const tokensPath = path.resolve(__dirname, "../../authToken/tokens.json");
    const tokens = require(tokensPath);

    let page = 1;
    let hasMoreData = true;
    let response;

    while (hasMoreData) {
      response = await axios.get(
        `https://api-clients.tech4h.com.br/tab?filter=name&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${tokens.tokens.Authorization}`,
          },
        }
      );

      if (response.data.length > 0) {
        console.log(response.data);
        page++;
      } else {
        hasMoreData = false;
      }
    }

    const tabs = response.data.data.responseTabs.map((tab: Tab) => tab.id);

    const dirPath = path.resolve(__dirname, "../../logs/VerificaExistenciaTabulacao");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const date = new Date();
    const timestamp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    const filename = `Tabs_${timestamp}.json`;

    fs.writeFileSync(path.join(dirPath, filename), JSON.stringify(tabs));

    return tabs;
  }
}