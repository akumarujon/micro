import { Micro } from "../../src/mod.ts";
import { MicroResponse, MicroRequest } from "../../src/types/mod.ts";

const app = new Micro();

app.get("/", (_req: MicroRequest, res: MicroResponse) => {
    const response = {"message":"hello"}
    
    return res.jsonify(response);
})

app.post('/', (_req: MicroRequest ,res: MicroResponse) => {
    return res.send("POST.")
})

app.post('/post',async(req: MicroRequest, res: MicroResponse) => {
    const body = await req.json()
    return res.jsonify(body)
})

app.run(3000)