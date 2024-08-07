import { Micro } from "../../src/mod.ts";
import { MicroRequest, MicroResponse } from "../../src/types.ts";

const app = new Micro();

app.get("/", (_req: MicroRequest, _res: MicroResponse) => {
  return _res.json("OK");
});

app.get("/:user", (_req: MicroRequest, _res: MicroResponse) => {
  console.log(_req.params);

  return _res.json("OK");
});

app.post("/post", async (_req: MicroRequest, _res: MicroResponse) => {
  const body = await _req.json();
  return _res.json(body);
});

app.run(3000);
