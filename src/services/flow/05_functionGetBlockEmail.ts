const axios = require("axios");
require("dotenv").config();
import * as fs from "fs";
import path from "path";

interface FlowsRequest {
  flow: any[];
}

export class FunctionGetBlockEmail {
  async execute({flow}: FlowsRequest) {
    const emails = flow.map((item) => {
        if (
          item.automationBlockType === "email" &&
          item.configuration &&
          item.configuration.template
        ) {
          const emails = {
            name: item.configuration.template.name,
            content: item.configuration.template.content,
          };

          return emails;
        } else {
          return null;
        }
      })
      .filter((script) => script !== null);

    // if (!emails) {
    //   throw new Error("Error Get emails Flow");
    // }

    // const logsDirectory = path.resolve(__dirname, "../../logs/before/flow/emails");
    // const now = new Date();
    // const formattedDate = `${now.getFullYear()}A${now.getMonth()+1}M${now.getDate()}D`;
    // const formattedTime = `${now.getHours()}H${now.getMinutes()}M${now.getSeconds()}S`;
    // const fileName = path.resolve(logsDirectory, `before_email_${formattedDate}_${formattedTime}.json`);

    // if (!fs.existsSync(logsDirectory)) {
    //   fs.mkdirSync(logsDirectory, { recursive: true });
    // }

    // fs.writeFileSync(fileName, JSON.stringify(emails, null, 2));

    // if (!emails || emails.length === 0) {
    //   return "Emails not found in flow";
    // }


    return emails;
  }
}
