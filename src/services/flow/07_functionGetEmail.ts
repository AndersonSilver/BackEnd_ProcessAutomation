const axios = require("axios");
require("dotenv").config();
import fs from "fs";
import path from "path";

export class FunctionGetEmail {
  async execute() {
    return "Foi enviado um email com sucesso!";
  }
}
