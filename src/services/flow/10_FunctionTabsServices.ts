import axios from "axios";
import path from "path";
import fs from 'fs';
import os from 'os';

interface TabsServices {
  tabs: any;
}
export class FunctionTabsServices {
  async execute({tabs}: TabsServices) {
    
    const dirPath = path.join(__dirname, '../../logs/Tabs');
    const filePath = path.join(dirPath, `Tabs${Date.now()}.json`);

    fs.mkdirSync(dirPath, { recursive: true });

    const formattedTabs = JSON.parse(tabs.replace(/\\r\\n/g, ''));

    fs.writeFileSync(filePath, JSON.stringify(formattedTabs, null, 2));

    return { message: `Data has been written to ${filePath}` };

  }
}