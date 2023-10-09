import { Micro } from "../../src/mod.ts"; // Replace with the correct import path

const app = new Micro();

app.get("/", (_req: Request) => {
    return new Response("Hello")
})

app.get("/hello", (_req: Request) => {
    return new Response("No Hello.")
})

app.run(3000)