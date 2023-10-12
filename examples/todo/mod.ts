import { Micro } from "../../mod.ts";
import { MicroRequest, MicroResponse } from "../../src/types.ts";

const app = new Micro();

app.get('/:id/', (req: MicroRequest, res: MicroResponse) => {
    const [ key, value ] = req.params[0]
    return res.jsonify({id: value})
})

app.post('/', async() => {})

app.run(3000);