// const axios = require("axios");
// require("dotenv").config();
// import path from "path";
// import fs from "fs";
// import { isAuthenticated } from "../middlewares/isAuthenticated";

// interface UserCredentials {
//   email: string;
//   password: string;
//   slug: string;
// }

// interface TokenRequest {
//   client: string;
// }

// export class FunctionGetTokens {
//   async execute({ client }: TokenRequest) {
//     const tokens: any = {};
//     const environments = ["dev", "hml", "prod"];

//     const getUserCredentials = (environment: string, client: string): UserCredentials => {
//       return {
//         email: process.env.EMAIL,
//         password: process.env.PASSWORD,
//         slug: process.env[`SLUG_${client.toUpperCase()}_${environment.toUpperCase()}`],
//       };
//     };

//     const loginUserAndGetToken = async (credentials: UserCredentials) => {
//       const user = JSON.stringify(credentials);

//       const {data: { data },} = await axios.post(
//         `https://api-clients.tech4h.com.br/security/user/login`,
//         user,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           maxBodyLength: Infinity,
//         }
//       );

//       return {
//         Authorization: data.Authorization.split('Bearer ')[1],
//         AuthorizationRA: data.AuthorizationRA.split('Bearer ')[1],
//         AuthorizationRCB: data.AuthorizationRCB.split('Bearer ')[1],
//       };
//     };

//     for (const environment of environments) {
//       const userCredentials = getUserCredentials(environment, client);

//       if (!userCredentials) {
//         throw new Error(
//           `Error getting user credentials for environment ${environment}.`
//         );
//       }

//       const token = await loginUserAndGetToken(userCredentials);

//       tokens[
//         `token${environment.charAt(0).toUpperCase() + environment.slice(1)}`
//       ] = token;
//     }

//     const fileName = path.resolve(__dirname, `./tokens.json`);

//     if (fs.existsSync(fileName)) {
//       fs.unlinkSync(fileName);
//     }

//     fs.writeFileSync(fileName, JSON.stringify(tokens, null, 2));

//     isAuthenticated();
//     return tokens;
//   }
// }
