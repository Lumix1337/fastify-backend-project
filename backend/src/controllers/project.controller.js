import Project from "../models/project.model.js";
import User from "../models/user.model.js";

async function createProject(req, reply) {
  try {
    const projectManager = await User.findById(req.body.projectManager);

    const allowedRoles = ["admin", "project manager"];
    const userRole = projectManager.role
      ? projectManager.role.toLowerCase()
      : "";

    if (!projectManager || !allowedRoles.includes(userRole)) {
      return reply
        .status(400)
        .send({ message: "Invalid project manager or insufficient role" });
    }

    for (let memberId of req.body.teamMembers) {
      const teamMember = await User.findById(memberId);
      if (!teamMember) {
        return reply
          .status(400)
          .send({ message: `Invalid team member: ${memberId}` });
      }
    }

    const project = new Project(req.body);
    await project.save();
    reply.code(201).send(project);
  } catch (error) {
    reply.status(400).send(error);
  }
}

export default createProject;