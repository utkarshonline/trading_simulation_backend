import "dotenv/config";
import "module-alias/register";
import validateEnv from "./utils/validateEnv";
import App from "./app";
import PostController from "./resources/post/post.controller";
import OrderController from "./resources/order/order.controller";
import DashboardController from "./resources/dashboard/dashboard.controller";
const { PORT, MONGODB_URL } = require("./config/config");

validateEnv();
const app = new App(
  [new PostController(), new OrderController(), new DashboardController()],
  Number(PORT),
  MONGODB_URL
);
app.listen();
