// deno-lint-ignore-file no-explicit-any
// Importing the MicroRequest and MicroResponse classes from the types.ts file
import { MicroRequest, MicroResponse } from "./types.ts";

// Creating a class named Micro
class Micro {
  /**
   * Declaring a read-only property routes as a Map
   */
  readonly routes: Map<string, [any, string]>;

  /**
   * Constructor for the Micro class
   */
  constructor() {
    // Initializing the routes property as a new Map
    this.routes = new Map();
  }

  /**
   * Method to add a GET route to the routes Map
   * @param path - The path for the route
   * @param event - The event handler for the route
   */
  get(path: string, event: any) {
    this.routes.set(path, [event, "GET"]);
  }

  /**
   * Method to add a POST route to the routes Map
   * @param path - The path for the route
   * @param event - The event handler for the route
   */
  post(path: string, event: any) {
    this.routes.set(path, [event, "POST"]);
  }

  /**
   * Method to handle incoming requests
   * @param request - The incoming request
   * @returns A Response object
   */
  handle(request: Request) {
    // Extracting the pathname from the request URL
    let path = new URL(request.url).pathname;

    // Creating a new MicroResponse instance
    const res = new MicroResponse();

    // Creating a new MicroRequest instance with the request URL
    const req = new MicroRequest(request.url);

    // Iterating through the routes Map
    for (const route of this.routes) {
      // Checking and modifying the route path if necessary
      if (!route[0].endsWith("/")) route[0] = `${route[0]}/`;

      // Checking if the route path includes a parameter
      if (route[0].includes(":")) {
        // Splitting the route and incoming path into parts
        const parts = route[0].split("/");
        const coming_path = path.split("/");

        // Finding the index of the parameter in the route
        const part = parts.indexOf(
          parts.filter((part) => part.includes(":"))[0],
        );

        // Extracting the parameter key and value
        const key: string = parts[part].split(":")[1];
        const value = coming_path[part];

        // Replacing the parameter in the route path and adding to request params
        route[0] = route[0].replace(`:${key}`, value);
        req.params[key] = value;
      }

      // Ensuring both the route and incoming path end with a "/"
      if (!route[0].endsWith("/")) route[0] = `${route[0]}/`;
      if (!path.endsWith("/")) path = `${path}/`;

      // Checking if the path and method match a route in the Map
      if (path == route[0] && request.method == route[1][1]) {
        // Executing the matched route with the request and response
        return route[1][0](req as MicroRequest, res);
      }
    }

    // Returning a 404 response if no matching route is found
    return new Response("404", { status: 404 });
  }

  /**
   * Method to start the server and listen on the specified port
   * @param port - The port number to listen on
   */
  run(port: number) {
    // Using Deno to serve the handle method on the specified port
    Deno.serve({ port }, (request) => this.handle(request));
  }
}

// Exporting the Micro class
export { Micro };
