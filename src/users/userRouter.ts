import { getUser, listUsers, createUser, updateUser,deleteUser } from "./userController";
import { Hono } from "hono";

export const userRouter = new Hono();

// get users route
userRouter.get("/users", listUsers);
userRouter.post("/users", createUser);


userRouter.get("/users/:id", getUser)
 
// create a user

 
//update a user
userRouter.put("/users/:id", updateUser)
// delete user
userRouter.delete("/users/:id", deleteUser)

//delete user
userRouter.post("/users", deleteUser);
// userRouter.put("/users/:id", updateUser);