const axios = require("axios");
require("dotenv").config();
import path from "path";

interface MyVariable {
  client: string;
  client_services: string;
  token: string;
}

export class GetWorkflowServices {
  async execute({ client, client_services, token }: MyVariable) {

    console.log(client, client_services, token);

    const response = await axios({
      method: "get",
      url: `https://webapp-qa-api.hml-tech4h.com.br/${client}/${client_services}/techforms/workflow`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      
    });

    return response.data
  }
}
