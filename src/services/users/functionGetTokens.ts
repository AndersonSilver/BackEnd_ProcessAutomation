import axios from "axios";
import fs from 'fs';
import path from 'path';

interface UserRequest {
  slug: string;
  email: string;
  password: string;
}

export class FunctionGetTokens {
  async execute({ slug, email, password }: UserRequest) {
    const { data } = await axios.post(
      "https://api-clients.tech4h.com.br/security/user/login",
      {
        slug,
        email,
        password,
      }
    );

    const tokens = {
      tokens: {
        Authorization: data.data.Authorization.slice(7),
        AuthorizationRA: data.data.AuthorizationRA.slice(7),
        AuthorizationRCB: data.data.AuthorizationRCB.slice(7),
      },
      user: {
        id: data.data.user.id,
        name: data.data.user.name,
        email: data.data.user.email,
      },
      company: {
        id: data.data.company.id,
        name: data.data.company.name,
      },
    };

    // const dirPath = path.resolve(__dirname, "../../authtoken");
    
    // if (!fs.existsSync(dirPath)) {
    //   fs.mkdirSync(dirPath, { recursive: true });
    // }

    // fs.writeFileSync(path.join(dirPath, "tokens.json"), JSON.stringify(tokens));

    return tokens;
  }
}