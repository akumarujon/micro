// deno-lint-ignore-file no-explicit-any
import { Routes } from "./types/route.ts";
import { MicroResponse } from "./types/response.ts";
import { MicroRequest } from "./types/request.ts";

// deno-lint-ignore prefer-const
let routes: Routes = { "post": [], "get": [] };

class Micro {
  get(path: string, event: any) {
    routes.get.push({ path, event });
  }

  post(path: string, event: any) {
    routes.post.push({ path, event });
  }

  handle(req: Request) {
    const path = new URL(req.url).pathname;
    const res = new MicroResponse();

    if (req.method == "GET") {
      for (const route of routes.get) {
        if (path == route.path) {
          return route.event(req as MicroRequest, res);
        }
      }
    }

    if (req.method == "POST") {
      for (const route of routes.post) {
        if (path == route.path) {
          return route.event(req as MicroRequest, res);
        }
      }
    }

    return new Response("404", { status: 404 });
  }

  run(port: number) {
    Deno.serve({ port }, this.handle);
  }
}

export { Micro };
