import { Hono } from "hono";
import helloRoutes from "./routes/hello";
import testChatbotRoutes from "./routes/testChatbot";
import { cors } from "hono/cors";

const app = new Hono();

app.route("/hello", helloRoutes);

app.route("/testchatbot", testChatbotRoutes);

export default app;
