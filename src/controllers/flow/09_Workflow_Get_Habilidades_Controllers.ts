import { Request, Response } from 'express';
import { WorkflowGetHabilidadesServices } from "../../services/flow/13_Workflow_Get_Habilidades_Services";


export class WorkflowGetHabilidadesControllers {
    async handle(req: Request, res: Response) {
        try {

            const token = req.headers.authorization as string;

            const workflowGetHabilidades = new WorkflowGetHabilidadesServices();
            const result = await workflowGetHabilidades.execute({token});
    
            return res.status(200).json(result);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
    }
}