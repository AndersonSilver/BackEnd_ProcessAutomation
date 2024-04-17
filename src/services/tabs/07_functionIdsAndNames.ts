const axios = require("axios");
require("dotenv").config();
import path from "path";
import fs from "fs";

interface TabsRequest {
  tabJson: string[];
  jsonName: string;
}

export class FunctionIdsAndNames {
  async execute({ tabJson, jsonName }: TabsRequest) {
    function extractIdsAndNames(obj) {
      const idsAndNames = {};

      function traverse(node) {
        if (node.id) {
          idsAndNames[node.name] = node.id;
        }
        if (node.children && node.children.length > 0) {
          node.children.forEach((child) => {
            traverse(child);
          });
        }
      }
      traverse(obj);
      return idsAndNames;
    }
    const idsAndNames = extractIdsAndNames(tabJson);

    if (!idsAndNames) {
      throw new Error("Error function get ids and names.");
    }

    const logsDirectory = path.resolve(__dirname, "../../logs/idsAndNames/");
    const fileName = path.resolve(logsDirectory, `${jsonName}`);

    if (!fs.existsSync(logsDirectory)) {
      fs.mkdirSync(logsDirectory, { recursive: true });
    }

    fs.writeFileSync(fileName, JSON.stringify(idsAndNames, null, 2));

    return "Deploy tabs and skills successfully completed!";
  }
}
