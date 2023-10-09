import { Routes } from "./types/route.ts";

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
    console.log(routes);

    console.log(req.method)

    if (req.method == "GET") {
      for (const route of routes.get) {
        console.log("PATH: ", path);
        console.log("PATH: ", route.path);
        if (path == route.path) {
          return route.event(req);
        }
      }
    }

    if (req.method == "POST") {
      for (const route of routes.post) {
        console.log("PATH: ", path);
        console.log("PATH: ", route.path);
        if (path == route.path) {
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
