import { Hono } from "hono";
import { type Context } from "hono";
import { stateService } from "./stateService";

// get all users
export const listState = async (c: Context) => {
  const data = await stateService();
  return c.json(data);
};