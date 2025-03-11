import { Hono } from "hono";
import { serve } from "@hono/node-server"; // Required for running in Node.js
import helloRoutes from "./routes/hello";
import testChatbotRoutes from "./routes/testchatbot";
import getagentdetails from "./routes/getagentdetails";

const app = new Hono();

app.route("/hello", helloRoutes);
app.route("/testchatbot", testChatbotRoutes);
app.route("/getagentdetails", getagentdetails);

serve(app, (info) => {
  console.log(`🚀 Server running at http://localhost:${info.port}`);
});
