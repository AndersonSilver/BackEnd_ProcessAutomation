import { Router } from "express";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { GetWorkflowControllers } from "./controllers/webApp/02_GetWorkflowControllers";

const router = Router();
  
// - ROTAS PARA USUÁRIOS
router.post("/auth-user", new AuthUserController().handle);

// - ROTAS PARA USUÁRIOS WEBAPP
router.get("/search-workflow-webapp", new GetWorkflowControllers().handle);


export { router };
