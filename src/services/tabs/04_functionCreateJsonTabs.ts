import path from "path";
import fs from "fs";
import { FunctionCreateTabs } from "./05_functionCreateTabs";

interface Tokens {
  Authorization?: string;
  AuthorizationRA?: string;
  AuthorizationRCB?: string;
}

interface TabsRequest {
  tabJson: string[];
  skills_ids: string[];
  tokens: {
    tokenDev: Tokens;
    tokenHml: Tokens;
    tokenProd: Tokens;
  };
  deployFrom: string;
  to: string;
  jsonName: string;
}

export class FunctionJsonTabs {
  async execute({
    tabJson,
    skills_ids,
    deployFrom,
    tokens,
    to,
    jsonName
  }: TabsRequest) {
    function removeIdsAndDefault(obj) {
      for (let fields in obj) {
        if (fields === "id" || fields === "default") {
          delete obj[fields];
        } else if (fields === "skill_id") {
          obj[fields] = [];
          obj[fields] = obj[fields].concat(skills_ids);
        } else if (fields === "children" && obj[fields] === null) {
          obj[fields] = [];
        } else if (fields === "friendlyName" && obj[fields] === null) {
          obj[fields] = "";
        } else if (typeof obj[fields] === "object") {
          removeIdsAndDefault(obj[fields]);
        }
      }
    }
    removeIdsAndDefault(tabJson);

    const logsDirectory = path.resolve(__dirname, "../../logs/before/tree_tabs_skills/");
    const fileName = path.resolve(logsDirectory, `${jsonName}`);

    if (!fs.existsSync(logsDirectory)) {
      fs.mkdirSync(logsDirectory, { recursive: true });
    }

    fs.writeFileSync(fileName, JSON.stringify(tabJson, null, 2));

    const functionCreateTabs = new FunctionCreateTabs();
    const result = await functionCreateTabs.execute({
      tabJson,
      jsonName,
      tokens,
      deployFrom,
      to,
    });

    if (!result) {
      throw new Error("Error function create json tabs.");
    }

    return result;
  }
}
