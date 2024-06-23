import { Handler, MicroRequest, MicroResponse, Route } from "./types.ts";

export class Micro {
  private routes: Route[] = [];

  get(path: string, handler: Handler) {
    this.routes.push({ method: "GET", path, handler });
  }

  post(path: string, handler: Handler) {
    this.routes.push({ method: "POST", path, handler });
  }

  private findRoute(method: string, url: string) {
    return this.routes.find((route) =>
      route.method === method && route.path === url
    );
  }

  async handleRequest(req: Request): Promise<Response> {
    const { method, url } = req;
    const route = this.findRoute(method, new URL(url).pathname);

    if (route) {
      const microReq = new MicroRequest(req);
      const microRes = new MicroResponse();
      await route.handler(microReq, microRes);
      return microRes.toResponse();
    }

    return new Response("Not Found", { status: 404 });
  }

  async run(port: number) {
    console.log(`Server running on port ${port}`);
    await Deno.serve({ port }, (req) => this.handleRequest(req));
  }
}
