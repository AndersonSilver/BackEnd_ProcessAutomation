import { Request, Response } from "express";
import { FunctionGetTokens } from "../../services/users/functionGetTokens";

export class AuthUserController {
  async handle(req: Request, res: Response) {
    const { slug, email, password } = req.body;
    const functionGetTokens = new FunctionGetTokens();

    const auth = await functionGetTokens.execute({
      slug,
      email,
      password,
    });

    return res.json(auth);
  }
}
