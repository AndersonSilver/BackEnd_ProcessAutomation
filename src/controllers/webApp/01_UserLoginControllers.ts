import { Request, Response } from "express";
import { UserLoginServices } from "../../services/webApp/01_UserLoginServices";

export class UserLoginControllers {
  async handle(req: Request, res: Response) {
    try {
      const client = req.query.client as string;
      const client_services = req.query.client_services as string;
      const password = req.query.password as string;
      const email = req.query.email as string;

      const functionUserLogin = new UserLoginServices();
      const result = await functionUserLogin.execute({client, client_services, password, email});

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
