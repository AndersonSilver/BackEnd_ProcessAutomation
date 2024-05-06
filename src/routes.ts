import { Router } from "express";
import { GetAllFlowsControllers } from "./controllers/flow/01_GetAllFlowsControllers";
import { SelectFlowControllers } from "./controllers/flow/02_SelectFlowControllers";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { PutEmailControllers } from "./controllers/flow/03_PutEmailControllers";
import { GetEmailControllers } from "./controllers/flow/04_GetEmailControllers";
import { FunctionTriggerFlowsControllers } from "./controllers/flow/05_FunctionTriggerFlowsControllers";
import { FunctionHabsControllers } from "./controllers/flow/06_FunctionHabsControllers";
import { FunctionTabsControllers } from "./controllers/flow/07_FunctionTabsControllers";
import { FunctionSaveTriggersControllers } from "./controllers/flow/08_FunctionSaveTriggersControllers";
import { WorkflowGetHabilidadesControllers } from "./controllers/flow/09_Workflow_Get_Habilidades_Controllers";
import { WorkflowGetTabulacaoControllers } from "./controllers/flow/10_Workflow_Get_Tabulacao_Controllers";
import { UserLoginControllers } from "./controllers/webApp/01_UserLoginControllers";
import { GetWorkflowControllers } from "./controllers/webApp/02_GetWorkflowControllers";

const router = Router();
  
// - ROTAS PARA USUÁRIOS
router.post("/auth-user", new AuthUserController().handle);

// - ROTAS PARA FLOWS
router.get("/search-all-flows", new GetAllFlowsControllers().handle);
router.get("/search-flow", new SelectFlowControllers().handle);

// - ROTAS PARA EMAILS
router.put("/put-email", new PutEmailControllers().handle);
router.get("/get-email", new GetEmailControllers().handle);

// - ROTAS GATILHOS
router.get("/search-trigger", new FunctionTriggerFlowsControllers().handle);
router.get("/search-habs", new FunctionHabsControllers().handle);
router.get("/search-tabs", new FunctionTabsControllers().handle);
router.put("/save-trigger", new FunctionSaveTriggersControllers().handle);

// - ROTAS VERIFICA HABILIDADES

router.get("/get-habs", new WorkflowGetHabilidadesControllers().handle);
router.get("/get-tabs", new WorkflowGetTabulacaoControllers().handle);

// - ROTAS PARA USUÁRIOS WEBAPP
router.post("/auth-user-webapp", new UserLoginControllers().handle);
router.get("/search-workflow-webapp", new GetWorkflowControllers().handle);


export { router };
