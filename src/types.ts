// deno-lint-ignore-file no-explicit-any
class MicroRequest extends Request {
    public params: any = {}
}

class MicroResponse extends Response {
    jsonify(response: any): Response {
        return new Response(JSON.stringify(response));
    }

    send(response: any): Response {
      return new Response(response);
    }
}

export interface Route{
    path: string,
    event: any, 
}

export interface Routes {
    get: Route[],
    post: Route[],
}

export { MicroRequest, MicroResponse };