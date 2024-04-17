import { Request, Response } from 'express';
import { WorkflowGetTabulacaoServices } from "../../services/flow/12_Workflow_Get_Tabulacao_Services";


export class WorkflowGetTabulacaoControllers {
    async handle(req: Request, res: Response) {
        try {

            const workflowGetTabulacao = new WorkflowGetTabulacaoServices();
            const result = await workflowGetTabulacao.execute();
    
            return res.status(200).json(result);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
    }
}