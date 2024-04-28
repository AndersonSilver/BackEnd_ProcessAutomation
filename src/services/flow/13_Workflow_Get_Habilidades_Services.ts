import axios from "axios";
import path from "path";
import fs from "fs";

interface Habs {
  id: string;
}

interface FunctionTokenServices {
  token: string;
}

export class WorkflowGetHabilidadesServices {
  async execute(token: FunctionTokenServices) {
    let page = 1;
    let hasMoreData = true;
    let response;

    while (hasMoreData) {
      response = await axios.get(
        `https://api-clients.tech4h.com.br/skill?filter=name&page=${page}`,
        {
          headers: {
            Authorization: `${token.token}`,
          },
        }
      );

      if (response.data.length > 0) {
        console.log(response.data);
        page++;
      } else {
        hasMoreData = false;
      }
    }

    const habs = response.data.data.skill.map((skill: Habs) => skill.id);

    return habs
  }
}
