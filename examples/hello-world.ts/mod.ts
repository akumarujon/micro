import { Micro } from "../../src/mod.ts";
import { MicroResponse, MicroRequest } from "../../src/types.ts";

const app = new Micro();

app.get("/", (_req: MicroRequest, _res: MicroResponse) => {
    const response = {"message":"hello"}
    
    return _res.jsonify(response);
})

app.post('/', (_req: MicroRequest ,_res: MicroResponse) => {
    return _res.send("POST.")
})

app.post('/post',async(_req: MicroRequest, _res: MicroResponse) => {
    const body = await _req.json()
    return _res.jsonify(body)
})

app.run(3000)