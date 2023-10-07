import { Micro } from "../../src/mod.ts";

const app = new Micro();

app.route("/hello/", () => "Hello World")