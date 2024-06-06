import { Hono } from "hono";
import { listCities } from "./cityController";
// import { getUser, listUsers, createUser, updateUsers } from "./userController";

export const cityRouter = new Hono();

cityRouter.get("/cities", listCities);