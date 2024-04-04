import * as dotenv from "dotenv";
dotenv.config();

//NOTE: If you are running the project in an instance, you should store these secret keys in its configuration settings.
// This type of storing secret information is only experimental and for the purpose of local running.

const { PORT } = process.env;

export const envVariable = {
  PORT: PORT || 3000,
  PREFIX: "/api",
};
