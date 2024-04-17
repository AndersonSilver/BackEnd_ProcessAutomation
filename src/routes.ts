import { Router } from "express";
import { CreateTabController } from "./controllers/tabs/01_CreateTabController";
import { GetAllFlowsControllers } from "./controllers/flow/01_GetAllFlowsControllers";
import { SelectFlowControllers } from "./controllers/flow/02_SelectFlowControllers";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { getAllTabController } from "./controllers/tabs/00_getAllTabController";
import { PutEmailControllers } from "./controllers/flow/03_PutEmailControllers";
import { GetEmailControllers } from "./controllers/flow/04_GetEmailControllers";
import { FunctionTriggerFlowsControllers } from "./controllers/flow/05_FunctionTriggerFlowsControllers";
import { FunctionHabsControllers } from "./controllers/flow/06_FunctionHabsControllers";
import { FunctionTabsControllers } from "./controllers/flow/07_FunctionTabsControllers";
import { FunctionSaveTriggersControllers } from "./controllers/flow/08_FunctionSaveTriggersControllers";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { WorkflowGetHabilidadesControllers } from "./controllers/flow/09_Workflow_Get_Habilidades_Controllers";
import { WorkflowGetTabulacaoControllers } from "./controllers/flow/10_Workflow_Get_Tabulacao_Controllers";

const router = Router();
  
// - ROTAS PARA USUÁRIOS
router.post("/auth-user", new AuthUserController().handle);

// - ROTAS PARA TABS
router.post("/search-tab", isAuthenticated, new CreateTabController().handle);
router.get("/search-all-tabs", isAuthenticated, new getAllTabController().handle);

// - ROTAS PARA FLOWS
router.get("/search-all-flows",isAuthenticated,  new GetAllFlowsControllers().handle);
router.get("/search-flow",isAuthenticated,  new SelectFlowControllers().handle);

// - ROTAS PARA EMAILS
router.put("/put-email", isAuthenticated, new PutEmailControllers().handle);
router.get("/get-email", isAuthenticated, new GetEmailControllers().handle);

// - ROTAS GATILHOS
router.get("/search-trigger", isAuthenticated, new FunctionTriggerFlowsControllers().handle);
router.get("/search-habs", isAuthenticated, new FunctionHabsControllers().handle);
router.get("/search-tabs", isAuthenticated, new FunctionTabsControllers().handle);
router.put("/save-trigger", isAuthenticated, new FunctionSaveTriggersControllers().handle);

// - ROTAS VERIFICA HABILIDADES

router.get("/get-habs", isAuthenticated, new WorkflowGetHabilidadesControllers().handle);
router.get("/get-tabs", isAuthenticated, new WorkflowGetTabulacaoControllers().handle);

export { router };
