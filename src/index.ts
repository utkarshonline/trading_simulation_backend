import "dotenv/config";
import "module-alias/register";
import validateEnv from "./utils/validateEnv";
import App from "./app";
import PostController from "./resources/post/post.controller";
import OrderController from "./resources/order/order.controller";
import UsersController from "./resources/profile/users.controller";
const { PORT, MONGODB_URL } = require("./config/config");

validateEnv();
const app = new App(
  [new PostController(), new OrderController(), new UsersController()],
  Number(PORT),
  MONGODB_URL
);
app.listen();
