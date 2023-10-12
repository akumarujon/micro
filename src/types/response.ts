class MicroResponse extends Response {
    jsonify(response): Response {
        return new Response(JSON.stringify(response));
    }

    send(response: string): Response {
      return new Response(response);
    }
}

export { MicroResponse };