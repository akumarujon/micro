import { Micro } from "../../mod.ts";
import { MicroRequest, MicroResponse } from "../../src/types.ts";

import { create, get, getAll } from "./kv.ts";

const app = new Micro();

app.post("/create/", async (_req: MicroRequest, _res: MicroResponse) => {
  const body = await _req.json();
  await create(body.body);
  console.log(await getAll());
  return _res.jsonify({ "message": "OK" });
});

app.get("/", async (_req: MicroRequest, _res: MicroResponse) => {
  return _res.jsonify(await getAll());
});

app.get("/:id/", async (_req: MicroRequest, _res: MicroResponse) => {
  const id = _req.params["id"];
  return _res.jsonify(await get(id));
});

app.run(3000);
