
class Micro {
  route(url: string, event: any) {
    Deno.serve((req) => {
      const path = new URL(req.url);
      
      if(path.pathname == url) return new Response(event())

      else return new Response("Route not found.")
    });
  }
}

export { Micro };
