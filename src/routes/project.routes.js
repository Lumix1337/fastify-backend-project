import projectController from "../controllers/project.controller.js";

export default async function routes(fastify, options) {  
  fastify.post("/", projectController);
  fastify.get("/", projectController.getAllProjects);
//   fastify.get("/:id", userController.getUserById);
//   fastify.put("/:id", userController.updateUser);
//   fastify.delete("/:id", userController.deleteUser);
};
