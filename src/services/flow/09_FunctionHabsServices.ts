import axios from "axios";
import path from "path";
import fs from 'fs';
import os from 'os';

interface habsServices {
  habs: any;
}

export class FunctionHabsServices {
  async execute({ habs }: habsServices) {

    const dirPath = path.join(__dirname, '../../logs/habs');
    const filePath = path.join(dirPath, `habs_${Date.now()}.json`);

    fs.mkdirSync(dirPath, { recursive: true });

    const formattedHabs = JSON.parse(habs.replace(/\\r\\n/g, ''));

    fs.writeFileSync(filePath, JSON.stringify(formattedHabs, null, 2));

    return { message: `Data has been written to ${filePath}` };
  }
}