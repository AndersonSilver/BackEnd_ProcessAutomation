const axios = require("axios");
require("dotenv").config();

export class FunctionPutEmail {
  async execute() {
    return "Email enviado com sucesso!";
  }
}


