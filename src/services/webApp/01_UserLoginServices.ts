const axios = require("axios");
require("dotenv").config();
import path from "path";

interface MyVariable {
  client: string;
  client_services: string;
  email: string;
  password: string;
}

export class UserLoginServices {
  async execute({ client, client_services, email, password }: MyVariable) {

    console.log(client, client_services, email, password);
    const data = JSON.stringify({
      login: email,
      password: password,
    });

    const response = await axios({
      method: "post",
      url: `https://webapp-qa-api.hml-tech4h.com.br/${client}/${client_services}/authentication/access-session/password`,
      headers: {
        "Content-Type": "application/json",
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      data: data,
    });

    const token = response.data.access_token;

    return {
      acess_token: token,
    }
  }
}
