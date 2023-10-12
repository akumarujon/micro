class MicroRequest extends Request {
    public params = {}
}

class MicroResponse extends Response {
    jsonify(response): Response {
        return new Response(JSON.stringify(response));
    }

    send(response: string): Response {
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