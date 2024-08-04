# micro

micro is a lightweight, high-performance web framework for Deno, designed to
simplify the process of building web applications and APIs.

## Features

- 🦕 Built for Deno
- 🚀 Lightning-fast performance
- 🛣️ Simple and intuitive routing
- 🔌 Pluggable architecture for custom handlers
- 🎨 Clean and minimalist API design

## Usage

Here's a simple example to get you started with micro:

```typescript
import { Micro } from "https://deno.land/x/micro/mod.ts";
import { MicroRequest, MicroResponse } from "https://deno.land/x/micro/mod.ts";

const app = new Micro();

app.get("/", (req: MicroRequest, res: MicroResponse) => {
    res.json("Hello, World!");
});

app.listen(3000);
```

## API

### Basic Routing

```typescript
app.get("/", handler);
app.post("/users", createUser);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);
```

## Performance

micro is designed with performance in mind, utilizing Deno's modern features and
efficient routing algorithms to ensure your web applications run at peak
performance.

## Contributing

Contributions to micro are welcome! Feel free to submit pull requests, create
issues, or suggest new features.

## License

This project is not licensed yet.

## Acknowledgments

- Inspired by Express.js and other popular web frameworks
- Built with Deno 🦕 for the modern web
