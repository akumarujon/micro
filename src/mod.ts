import { Routes } from "./types/route.ts";

let routes: Routes = { "post": [], "get": [] };

class Micro {
  get(path: string, event: any) {
    routes.get.push({
      path,
      event,
    });
  }

  handle(req: Request) {
    const path = new URL(req.url).pathname;
    console.log(routes);
    for (const route of routes.get) {
      console.log("PATH: ", path);
      console.log("PATH: ", route.path);
      if (path == route.path) {
        return route.event(req);
      }
    }

    return new Response("404", { status: 404 });
  }

  run(port: number | string) {
    Deno.serve({ port }, this.handle);
  }
}

export { Micro };
