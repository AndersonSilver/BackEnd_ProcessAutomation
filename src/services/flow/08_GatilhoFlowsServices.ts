import axios from "axios";
import path from "path";
import fs from 'fs';

interface FunctionTriggerFlowsServices {
  trigger: any;
}

export class FunctionGatilhoFlowsServices {
  async execute() {
    const tokensPath = path.resolve(__dirname, "../../authToken/tokens.json");
    const tokens = require(tokensPath);
    const dirPath = path.join(__dirname, '../../logs/before/flow/flow');

    const files = fs.readdirSync(dirPath);

    let latestFile;
    let latestTime = 0;
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isFile() && stat.mtimeMs > latestTime) {
            latestFile = file;
            latestTime = stat.mtimeMs;
        }
    }

    if (!latestFile) {
        throw new Error('No files found in the directory');
    }

    const trigger = fs.readFileSync(path.join(dirPath, latestFile), 'utf8');

    const triggerJson = JSON.parse(trigger);

    const dirPathHabs = path.join(__dirname, '../../logs/habs');
    const dirPathTabs = path.join(__dirname, '../../logs/tabs');

    const latestFileHabs = this.getLatestFile(dirPathHabs);
    const latestFileTabs = this.getLatestFile(dirPathTabs);

    const dataHabs = JSON.parse(fs.readFileSync(latestFileHabs, 'utf8'));
    const dataTabs = JSON.parse(fs.readFileSync(latestFileTabs, 'utf8'));

    const skills = dataHabs;
    const tabs = dataTabs;

    const newTriggers = skills.flatMap((skillId) =>
      tabs.map((tabId) => ({
        skillId: skillId,
        tabId: tabId,
      }))
    );

    const result = {
      id: triggerJson.id,
      name: triggerJson.name,
      automationFlowBlocks: triggerJson.automationFlowBlocks,
      automationFlowTriggers: [...newTriggers],
    };

    const saveFlow = async () => {
      try {
        const {
          data: {
            automationFlow: { id },
          },
        } = await axios.put(`https://forceflow.tech4h.com.br/flows`, result, {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "Content-Type": "application/json",
            Origin: "https://flowautomation.tech4h.com.br",
            Referer: "https://flowautomation.tech4h.com.br",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
            "X-Legacy-Support": "false",
            Authorization: `Bearer ${tokens.tokens.AuthorizationRA}`,
          },
        });
        return id;
      } catch (error: any) {
        throw new Error(JSON.stringify(error.response.data));
      }
    };
    const id = await saveFlow();
    const idsTriggersPath = path.join(__dirname, '../../logs/idsTriggers');

    if (!fs.existsSync(idsTriggersPath)) {
      fs.mkdirSync(idsTriggersPath, { recursive: true });
    }

    fs.writeFileSync(path.join(idsTriggersPath, `${id}.json`), JSON.stringify({id}));

    return {id};
  }

  getLatestFile(dirPath: string) {
    const files = fs.readdirSync(dirPath);

    files.sort((a, b) => fs.statSync(path.join(dirPath, b)).mtime.getTime() - fs.statSync(path.join(dirPath, a)).mtime.getTime());

    return path.join(dirPath, files[0]);
  }
}