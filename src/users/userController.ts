import { Hono } from "hono";
import { type Context } from "hono";

import {
  createUserService,
  getUserService,
  usersService,
  updateUserService,
  deleteUserService,
} from "./userServices";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
  { id: 3, name: "Allison", email: "allison@gmail.com" },
  { id: 4, name: "neddy mwaniki", email: "kennedymwaniki@hotmail.com" },
  { id: 5, name: "ivy kimani", email: "ivykimani@example.com" },
];

// get all users
export const listUsers = async (c: Context) => {
  const data = await usersService();
  return c.json(data);
};

//get one user
export const getUser = (c: Context) => {
  const id = c.req.param("id");
  console.log(id);
  const user = users.find((user) => user.id === parseInt(id, 10));
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }
  return c.json(user, 200);
};

// create a new user
export const createUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    console.log(user);
    const createdUser = await createUserService(user);
    if (!createdUser) {
      return c.text("no user created");
    }
    return c.json({ msg: createdUser }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateUser = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const user = await c.req.json();
  try {
    // search for the user
    const searchedUser = await getUserService(id);
    if (searchedUser == undefined) return c.text("User not found", 404);
    // get the data and update it
    const res = await updateUserService(id, user);
    // return a success message
    if (!res) return c.text("User not updated", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

//delete user
export const deleteUser = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  try {
    //search for the user
    const user = await getUserService(id);
    if (user == undefined) return c.text("User not found", 404);
    //deleting the user
    const res = await deleteUserService(id);
    if (!res) return c.text("User not deleted", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};