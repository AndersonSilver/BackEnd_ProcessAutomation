// import { Request, Response } from "express";
// import { FunctionPutEmail } from "../../services/flow/06_functionPutEmail";

// export class PutEmailControllers {
//   async handle(req: Request, res: Response) {
//     try {
//       const deployFrom = req.deployFrom as string;
//       const to = req.to as string;
//       const projectName = req.projectName as string;
//       const formatDate = req.formatDate;
//       const formateTime = req.formateTime;
//       const jsonName = req.jsonName;

//       if (!deployFrom || !to) {
//         return res.status(400).json({ error: "Missing mandatory data" });
//       }

//       const functionPutEmail = new FunctionPutEmail();
//       const result = await functionPutEmail.execute({
//         deployFrom,
//         to,
//         jsonName,
//       });

//       return res.status(200).json(result);
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   }
// }
