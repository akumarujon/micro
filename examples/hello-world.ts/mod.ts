import { Micro } from "../../src/mod.ts"; // Replace with the correct import path
import { readerFromStreamReader } from "https://deno.land/std/io/mod.ts";

const app = new Micro();

app.get("/", (_req: Request) => {
    return new Response("Hello")
})

app.get("/hello", (_req: Request) => {
    return new Response("No Hello.")
})

app.post('/', (_req: Request) => {
    return new Response("POST.")
})

app.post('/post',(_req: Request) => {
    console.log(_req.jsonBody)
    return new Response("POST ROUTE")
})

app.run(3000)