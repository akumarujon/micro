import { Routes } from "./types/route.ts";

let routes: Routes = { "post": [], "get": [] };

class Micro {
  get(path: string, event: any) {
    routes.get.push({ path, event });
  }

  post(path: string, event: any) {
    routes.post.push({ path, event });
  }

  async handle(req: Request) {
    const path = new URL(req.url).pathname;

    if (req.method == "GET") {
      for (const route of routes.get) {
        if (path == route.path) {
          return route.event(req);
        }
      }
    }

    if (req.method == "POST") {
      for (const route of routes.post) {
        if (path == route.path) {
          req.jsonBody = new TextDecoder().decode((await req.body?.getReader().read())?.value)
          return route.event(req);
        }
      }
    }

    return new Response("404", { status: 404 });
  }

  run(port: number | string) {
    Deno.serve({ port }, this.handle);
  }
}

export { Micro };
