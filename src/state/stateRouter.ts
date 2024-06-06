import { Hono } from "hono";
import { listState } from "./stateController";


export const stateRouter = new Hono();

// get users route
stateRouter.get("/state", listState);