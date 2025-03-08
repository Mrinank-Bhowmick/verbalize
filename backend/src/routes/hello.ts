import { Hono } from "hono";

const helloRoutes = new Hono();

helloRoutes.get("/", (c) => {
  return c.text("Hello Hono!");
});

helloRoutes.post("/", (c) => {
  return c.text("Hello Hono!");
});

export default helloRoutes;
