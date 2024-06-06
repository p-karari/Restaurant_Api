import { Hono } from "hono";
import { type Context } from "hono";
import { cityService } from "./cityService";

// get all users
export const listCities = async (c: Context) => {
  const data = await cityService();
  return c.json(data);
};