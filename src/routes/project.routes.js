import projectController from "../controllers/project.controller.js";

export default async function routes(fastify, options) {
//   fastify.get("/", projectController.getAllUsers);
//   fastify.get("/:id", userController.getUserById);
  fastify.post("/", projectController);
//   fastify.put("/:id", userController.updateUser);
//   fastify.delete("/:id", userController.deleteUser);
}
