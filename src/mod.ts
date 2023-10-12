// deno-lint-ignore-file no-explicit-any
import { MicroRequest, MicroResponse, Params, Routes } from "./types.ts";

// deno-lint-ignore prefer-const
let routes: Routes = { "post": [], "get": [] };

class Micro {
  get(path: string, event: any) {
    routes.get.push({ path, event });
  }

  post(path: string, event: any) {
    routes.post.push({ path, event });
  }

  handle(request: Request) {
    const path = new URL(request.url).pathname;
    const res = new MicroResponse();

    let req = new MicroRequest(request.url)
    if (req.method == "GET") {
      for (const route of routes.get) {
        if (route.path.includes(":")) {
          const parts = route.path.split("/");
          const coming_path = path.split("/");

          const part = parts.indexOf(
            parts.filter((part) => part.includes(":"))[0],
          );

          const key = parts[part].split(":")[1]
          const value = coming_path[part];
          
          route.path = route.path.replace(`:${key}`, value);

          req.params.push(
            [key, value],
          );
        }

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
